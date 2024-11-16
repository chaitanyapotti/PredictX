// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.20;

import "forge-std/console2.sol";
import "forge-std/Script.sol";
import "@uma/core/contracts/common/implementation/ExpandedERC20.sol";
import "../src/PredictXOwner.sol";

contract PredictXOwnerScript is Script {
    // Deployment parameters are set as state variables to avoid stack too deep errors.
    address defaultCurrency; // If not set, a new TestnetERC20 will be deployed.
    string defaultCurrencyName; // Defaults to "Default Bond Token", only used if DEFAULT_CURRENCY is not set.
    string defaultCurrencySymbol; // Defaults to "DBT", only used if DEFAULT_CURRENCY is not set.
    uint8 defaultCurrencyDecimals; // Defaults to 18, only used if DEFAULT_CURRENCY is not set.

    function run() external {
        // Get deployment parameters from environment variables or use defaults.
        defaultCurrency = vm.envOr("DEFAULT_CURRENCY", address(0));
        defaultCurrencyName = vm.envOr("DEFAULT_CURRENCY_NAME", string("Default Bond Token"));
        defaultCurrencySymbol = vm.envOr("DEFAULT_CURRENCY_SYMBOL", string("DBT"));
        defaultCurrencyDecimals = uint8(vm.envOr("DEFAULT_CURRENCY_DECIMALS", uint8(18)));

        vm.startBroadcast();

        if (defaultCurrency == address(0)) {
            defaultCurrency = address(
                new ExpandedERC20(defaultCurrencyName, defaultCurrencySymbol, defaultCurrencyDecimals)
            );
            console.log("Deployed TestnetERC20 at %s", defaultCurrency);
        }
        ExpandedERC20 defaultCurrencyContract = ExpandedERC20(defaultCurrency);

        PredictXOwner predict = new PredictXOwner(defaultCurrency);
        address[] memory addresses = vm.getWallets();
        console.log("Addresses: %s", addresses[0]);
        console.log("Deployed Prediction Market at %s, %s, %s", address(predict), msg.sender, addresses[0]);
        defaultCurrencyContract.addMinter(msg.sender);
        defaultCurrencyContract.mint(msg.sender, 1e28);
        console.log("hello %s", "1");
        bytes32 marketId = keccak256(abi.encode(block.number, "will trump win us election?"));
        bytes32 marketId2 = keccak256(abi.encode(block.number, "will trump win us election 2?"));
        // require(defaultCurrencyContract.approve(msg.sender, 1e28), "no revert");
        require(defaultCurrencyContract.approve(address(predict), 1e28), "no revert");
        // bytes32 marketId = predict.initializeMarket("yes", "no", "will trump win us election?", marketId);
        predict.initializeMarketAndCreateOutcomeTokens("yes", "no", "will trump win us election?", marketId, 1e20);
        // console.log("hello %s", "2");
        // (,, ExpandedIERC20 outcome1Token, ExpandedIERC20 outcome2Token,,,) = predict.markets(marketId);
        // console.log("outcome1 token %s", address(outcome1Token));
        // console.log("outcome2 token %s", address(outcome2Token));
        // // outcome1Token.transfer(address(predict), 1e20);
        // // outcome2Token.transfer(address(predict), 1e20);
        // (, uint balance1, uint balance2) = predict.getMarket(marketId);
        // console.log("outcome1 token %s", balance1);
        // console.log("outcome2 token %s", balance2);
        // predict.buy(marketId, address(outcome1Token), 1e19);
        // console.log("hello %s", "2");
        // (, uint balance11, uint balance22) = predict.getMarket(marketId);
        // console.log("outcome1 token %s", balance11);
        // console.log("outcome2 token %s", balance22);

        // predict.initializeMarketAndCreateOutcomeTokens("yes", "no", "will trump win us election 2?", marketId2, 1e20);
        // console.log("hello %s", "3");
        // (,, ExpandedIERC20 outcome1Token2, ExpandedIERC20 outcome2Token2,,,) = predict.markets(marketId2);
        // console.log("outcome1 token %s", address(outcome1Token2));
        // console.log("outcome2 token %s", address(outcome2Token2));


        // (, uint balance12, uint balance222) = predict.getMarket(marketId2);
        // console.log("outcome1 token %s", balance12);
        // console.log("outcome2 token %s", balance222);
        // predict.buy(marketId2, address(outcome1Token2), 1e19);
        // console.log("hello %s", "4");
        // (, uint balance112, uint balance2222) = predict.getMarket(marketId2);
        // console.log("outcome1 token %s", balance112);
        // console.log("outcome2 token %s", balance2222);

        

        // outcome1Token.approve(address(predict), 1e21);
        // predict.sell(marketId, address(outcome1Token), 1e19);
        // console.log("hello %s", "3");
        // (, uint balance111, uint balance222) = predict.getMarket(marketId);
        // console.log("outcome1 token %s", balance111);
        // console.log("outcome2 token %s", balance222);
        // console.log("Initialized Prediction Market %s, %s", address(predict), marketId);
        // predict.createOutcomeTokens(marketId, 1e18);
        // console.log("Initialized Prediction Market %s, %s", address(predict), marketId);
        vm.stopBroadcast();
    }
}
