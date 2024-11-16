// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@uma/core/contracts/common/implementation/ExpandedERC20.sol";

// This contract allows to initialize prediction markets each having a pair of binary outcome tokens. Anyone can mint
// and burn the same amount of paired outcome tokens for the default payout currency. Trading of outcome tokens is
// outside the scope of this contract. Anyone can assert 3 possible outcomes (outcome 1, outcome 2 or split) that is
// verified through Optimistic Oracle V3. If the assertion is resolved true then holders of outcome tokens can settle
// them for the payout currency based on resolved market outcome.
contract PredictXOwner {
    using SafeERC20 for IERC20;

    struct Market {
        bool resolved; // True if the market has been resolved and payouts can be settled.
        bytes32 assertedOutcomeId; // Hash of asserted outcome (outcome1, outcome2 or unresolvable).
        ExpandedIERC20 outcome1Token; // ERC20 token representing the value of the first outcome.
        ExpandedIERC20 outcome2Token; // ERC20 token representing the value of the second outcome.
        bytes outcome1; // Short name of the first outcome.
        bytes outcome2; // Short name of the second outcome.
        bytes description; // Description of the market.
    }

    struct AssertedMarket {
        address asserter; // Address of the asserter used for payout.
        bytes32 marketId; // Identifier for markets mapping.
    }

    mapping(bytes32 => Market) public markets; // Maps marketId to Market struct.

    mapping(bytes32 => AssertedMarket) public assertedMarkets; // Maps assertionId to AssertedMarket.

    IERC20 public immutable currency; // Currency used for all prediction markets.
    uint64 public constant assertionLiveness = 7200; // 2 hours.
    bytes32 public immutable defaultIdentifier; // Identifier used for all prediction markets.
    bytes public constant unresolvable = "Unresolvable"; // Name of the unresolvable outcome where payouts are split.

    event MarketInitialized(
        bytes32 indexed marketId,
        string outcome1,
        string outcome2,
        string description,
        address outcome1Token,
        address outcome2Token
    );
    event MarketAsserted(bytes32 indexed marketId, string assertedOutcome, bytes32 indexed assertionId);
    event MarketResolved(bytes32 indexed marketId);
    event TokensCreated(bytes32 indexed marketId, address indexed account, uint256 tokensCreated);
    event TokensRedeemed(bytes32 indexed marketId, address indexed account, uint256 tokensRedeemed);
    event TokensSettled(
        bytes32 indexed marketId,
        address indexed account,
        uint256 payout,
        uint256 outcome1Tokens,
        uint256 outcome2Tokens
    );

    event TokensBought(bytes32 indexed marketId, address indexed account, uint256 currencyAmount, uint256 outcomeTokensBought);
    event TokensSold(bytes32 indexed marketId, address indexed account, uint256 currencyAmount, uint256 outcomeTokensSold);

    constructor(
        address _currency
    ) {
        currency = IERC20(_currency);
    }

    function getMarket(bytes32 marketId) public view returns (Market memory, uint256 outcome1Balance, uint256 outcome2Balance) {
        return (markets[marketId], markets[marketId].outcome1Token.balanceOf(address(this)), markets[marketId].outcome2Token.balanceOf(address(this)));
    }

    function initializeMarket(
        string memory outcome1, // Short name of the first outcome.
        string memory outcome2, // Short name of the second outcome.
        string memory description, // Description of the market.
        bytes32 marketId
    ) public {
        require(bytes(outcome1).length > 0, "Empty first outcome");
        require(bytes(outcome2).length > 0, "Empty second outcome");
        require(keccak256(bytes(outcome1)) != keccak256(bytes(outcome2)), "Outcomes are the same");
        require(bytes(description).length > 0, "Empty description");
        require(markets[marketId].outcome1Token == ExpandedIERC20(address(0)), "Market already exists");

        // Create position tokens with this contract having minter and burner roles.
        ExpandedIERC20 outcome1Token = new ExpandedERC20(string(abi.encodePacked(outcome1, " Token")), "O1T", 18);
        ExpandedIERC20 outcome2Token = new ExpandedERC20(string(abi.encodePacked(outcome2, " Token")), "O2T", 18);
        outcome1Token.addMinter(address(this));
        outcome2Token.addMinter(address(this));
        outcome1Token.addBurner(address(this));
        outcome2Token.addBurner(address(this));

        markets[marketId] = Market({
            resolved: false,
            assertedOutcomeId: bytes32(0),
            outcome1Token: outcome1Token,
            outcome2Token: outcome2Token,
            outcome1: bytes(outcome1),
            outcome2: bytes(outcome2),
            description: bytes(description)
        });

        emit MarketInitialized(
            marketId,
            outcome1,
            outcome2,
            description,
            address(outcome1Token),
            address(outcome2Token)
        );
    }

    // Assert the market with any of 3 possible outcomes: names of outcome1, outcome2 or unresolvable.
    // Only one concurrent assertion per market is allowed.
    function assertMarket(bytes32 marketId, string memory assertedOutcome) public returns (bytes32 assertionId) {
        Market storage market = markets[marketId];
        require(market.outcome1Token != ExpandedIERC20(address(0)), "Market does not exist");
        bytes32 assertedOutcomeId = keccak256(bytes(assertedOutcome));
        require(market.assertedOutcomeId == bytes32(0), "Assertion active or resolved");
        require(
            assertedOutcomeId == keccak256(market.outcome1) ||
                assertedOutcomeId == keccak256(market.outcome2) ||
                assertedOutcomeId == keccak256(unresolvable),
            "Invalid asserted outcome"
        );

        market.assertedOutcomeId = assertedOutcomeId;
        assertionId = assertedOutcomeId;
        // Store the asserter and marketId for the assertionResolvedCallback.
        assertedMarkets[assertedOutcomeId] = AssertedMarket({ asserter: msg.sender, marketId: marketId });

        emit MarketAsserted(marketId, assertedOutcome, assertedOutcomeId);
    }

    // Callback from settled assertion.
    // If the assertion was resolved true, the market is marked as resolved.
    // Otherwise, assertedOutcomeId is reset and the market can be asserted again.
    function assertionResolvedCallback(bytes32 assertionId, bool assertedTruthfully) public {
        Market storage market = markets[assertedMarkets[assertionId].marketId];

        if (assertedTruthfully) {
            market.resolved = true;
            emit MarketResolved(assertedMarkets[assertionId].marketId);
        } else market.assertedOutcomeId = bytes32(0);
        delete assertedMarkets[assertionId];
    }

    // Dispute callback does nothing.
    function assertionDisputedCallback(bytes32 assertionId) public {}

    // Mints pair of tokens representing the value of outcome1 and outcome2. Trading of outcome tokens is outside of the
    // scope of this contract. The caller must approve this contract to spend the currency tokens.
    function createOutcomeTokens(bytes32 marketId, uint256 tokensToCreate) external {
        Market storage market = markets[marketId];
        require(market.outcome1Token != ExpandedIERC20(address(0)), "Market does not exist");

        currency.transferFrom(msg.sender, address(this), tokensToCreate);

        market.outcome1Token.mint(msg.sender, tokensToCreate);
        market.outcome2Token.mint(msg.sender, tokensToCreate);

        emit TokensCreated(marketId, msg.sender, tokensToCreate);
    }

    function initializeMarketAndCreateOutcomeTokens(
        string memory outcome1, // Short name of the first outcome.
        string memory outcome2, // Short name of the second outcome.
        string memory description, // Description of the market.
        bytes32 marketId,
        uint256 tokensToCreate) external {
        this.initializeMarket(outcome1, outcome2, description, marketId);
        Market storage market = markets[marketId];
        require(market.outcome1Token != ExpandedIERC20(address(0)), "Market does not exist");

        currency.transferFrom(msg.sender, address(this), tokensToCreate);

        market.outcome1Token.mint(msg.sender, tokensToCreate);
        market.outcome2Token.mint(msg.sender, tokensToCreate);

        emit TokensCreated(marketId, msg.sender, tokensToCreate);
    }

    // Burns equal amount of outcome1 and outcome2 tokens returning settlement currency tokens.
    function redeemOutcomeTokens(bytes32 marketId, uint256 tokensToRedeem) public {
        Market storage market = markets[marketId];
        require(market.outcome1Token != ExpandedIERC20(address(0)), "Market does not exist");

        market.outcome1Token.burnFrom(msg.sender, tokensToRedeem);
        market.outcome2Token.burnFrom(msg.sender, tokensToRedeem);

        currency.safeTransfer(msg.sender, tokensToRedeem);

        emit TokensRedeemed(marketId, msg.sender, tokensToRedeem);
    }

    // If the market is resolved, then all of caller's outcome tokens are burned and currency payout is made depending
    // on the resolved market outcome and the amount of outcome tokens burned. If the market was resolved to the first
    // outcome, then the payout equals balance of outcome1Token while outcome2Token provides nothing. If the market was
    // resolved to the second outcome, then the payout equals balance of outcome2Token while outcome1Token provides
    // nothing. If the market was resolved to the split outcome, then both outcome tokens provides half of their balance
    // as currency payout.
    function settleOutcomeTokens(bytes32 marketId) public returns (uint256 payout) {
        Market storage market = markets[marketId];
        require(market.resolved, "Market not resolved");

        uint256 outcome1Balance = market.outcome1Token.balanceOf(msg.sender);
        uint256 outcome2Balance = market.outcome2Token.balanceOf(msg.sender);

        if (market.assertedOutcomeId == keccak256(market.outcome1)) payout = outcome1Balance;
        else if (market.assertedOutcomeId == keccak256(market.outcome2)) payout = outcome2Balance;
        else payout = (outcome1Balance + outcome2Balance) / 2;

        market.outcome1Token.burnFrom(msg.sender, outcome1Balance);
        market.outcome2Token.burnFrom(msg.sender, outcome2Balance);
        currency.safeTransfer(msg.sender, payout);

        emit TokensSettled(marketId, msg.sender, payout, outcome1Balance, outcome2Balance);
    }

    function buy(bytes32 marketId, address outcomeToken, uint256 currencyAmount) public {
        // use fixed product market maker strategy to buy tokens
        Market storage market = markets[marketId];
        ExpandedIERC20 buyingToken = address(market.outcome1Token) == outcomeToken ? market.outcome1Token : market.outcome2Token; // 10 yes
        ExpandedIERC20 sellingToken = address(market.outcome1Token) == outcomeToken ? market.outcome2Token : market.outcome1Token; // 10 no
        uint invariant = market.outcome1Token.balanceOf(address(this)) * market.outcome2Token.balanceOf(address(this)); // 100 (currency amount = 10)
        market.outcome1Token.mint(address(this), currencyAmount); // 20
        market.outcome2Token.mint(address(this), currencyAmount); // 20
        uint outcomeTokensToBuy = buyingToken.balanceOf(address(this)) - (invariant / sellingToken.balanceOf(address(this))); // 20 - (100 / 20) = 15
        require(outcomeTokensToBuy > 0, "no tokens to buy");
        require(currency.transferFrom(msg.sender, address(this), currencyAmount), "cost transfer failed");
        // require(currency.approve(address(this), currencyAmount), "approval for splits failed");
        buyingToken.transferFrom(address(this), msg.sender, outcomeTokensToBuy); // 5 left of buyToken, 20 left of sellToken (got 15 buy token)
        require(invariant == market.outcome1Token.balanceOf(address(this)) * market.outcome2Token.balanceOf(address(this)), "invariant violated");
        emit TokensBought(marketId, msg.sender, currencyAmount, outcomeTokensToBuy);
    }

    function sell(bytes32 marketId, address outcomeToken, uint256 currencyAmount) public {
        // use fixed product market maker strategy to buy tokens
        Market storage market = markets[marketId];
        ExpandedIERC20 sellingToken = address(market.outcome1Token) == outcomeToken ? market.outcome1Token : market.outcome2Token; // 5
        ExpandedIERC20 buyingToken = address(market.outcome1Token) == outcomeToken ? market.outcome2Token : market.outcome1Token; // 20
        uint invariant = market.outcome1Token.balanceOf(address(this)) * market.outcome2Token.balanceOf(address(this)); // 100
        uint outcomeTokensToSell = currencyAmount + invariant/ (buyingToken.balanceOf(address(this)) - currencyAmount) - sellingToken.balanceOf(address(this)); // 10 + (100 / (20 - 10)) - 5 = 10 + 10 - 5 = 15
        require(outcomeTokensToSell > 0, "no tokens to sell");
        require(sellingToken.transferFrom(msg.sender, address(this), outcomeTokensToSell), "cost transfer failed"); // 15, 20
        buyingToken.burnFrom(address(this), currencyAmount); // 20-10 = 10
        sellingToken.burnFrom(address(this), currencyAmount); // 20-10 = 10
        require(currency.transfer(msg.sender, currencyAmount), "currency transfer failed");
        require(invariant == market.outcome1Token.balanceOf(address(this)) * market.outcome2Token.balanceOf(address(this)), "invariant violated");
        emit TokensSold(marketId, msg.sender, currencyAmount, outcomeTokensToSell);
    }
}
