export const PredictX_CONTRACT_ADDRESS = '0x9103b7E0BE0cFd703F08CCcC94E6a52E58B1935E';

export const USDC_CONTRACT_ADDRESS = '0x6Df56928beA35e3Dda29bCf9EB1d46127D3c0530';

export const PredictX_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_currency',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'marketId',
        type: 'bytes32',
        indexed: true,
      },
      {
        internalType: 'string',
        name: 'assertedOutcome',
        type: 'string',
        indexed: false,
      },
      {
        internalType: 'bytes32',
        name: 'assertionId',
        type: 'bytes32',
        indexed: true,
      },
    ],
    type: 'event',
    name: 'MarketAsserted',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'marketId',
        type: 'bytes32',
        indexed: true,
      },
      {
        internalType: 'string',
        name: 'outcome1',
        type: 'string',
        indexed: false,
      },
      {
        internalType: 'string',
        name: 'outcome2',
        type: 'string',
        indexed: false,
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
        indexed: false,
      },
      {
        internalType: 'address',
        name: 'outcome1Token',
        type: 'address',
        indexed: false,
      },
      {
        internalType: 'address',
        name: 'outcome2Token',
        type: 'address',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'MarketInitialized',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'marketId',
        type: 'bytes32',
        indexed: true,
      },
    ],
    type: 'event',
    name: 'MarketResolved',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'marketId',
        type: 'bytes32',
        indexed: true,
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'uint256',
        name: 'tokensCreated',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'TokensCreated',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'marketId',
        type: 'bytes32',
        indexed: true,
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'uint256',
        name: 'tokensRedeemed',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'TokensRedeemed',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'marketId',
        type: 'bytes32',
        indexed: true,
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
        indexed: true,
      },
      {
        internalType: 'uint256',
        name: 'payout',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'outcome1Tokens',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'outcome2Tokens',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'TokensSettled',
    anonymous: false,
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'marketId',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'assertedOutcome',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'assertMarket',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'assertionId',
        type: 'bytes32',
      },
    ],
  },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
    name: 'assertedMarkets',
    outputs: [
      {
        internalType: 'address',
        name: 'asserter',
        type: 'address',
      },
      { internalType: 'bytes32', name: 'marketId', type: 'bytes32' },
    ],
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'assertionId',
        type: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'assertionDisputedCallback',
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'assertionLiveness',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'assertionId',
        type: 'bytes32',
      },
      {
        internalType: 'bool',
        name: 'assertedTruthfully',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'assertionResolvedCallback',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'marketId',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'outcomeToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'currencyAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'buy',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'marketId',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'tokensToCreate',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'createOutcomeTokens',
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'currency',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'defaultIdentifier',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'marketId', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
    name: 'getMarket',
    outputs: [
      {
        internalType: 'struct PredictXOwner.Market',
        name: '',
        type: 'tuple',
        components: [
          { internalType: 'bool', name: 'resolved', type: 'bool' },
          {
            internalType: 'bytes32',
            name: 'assertedOutcomeId',
            type: 'bytes32',
          },
          {
            internalType: 'contract ExpandedIERC20',
            name: 'outcome1Token',
            type: 'address',
          },
          {
            internalType: 'contract ExpandedIERC20',
            name: 'outcome2Token',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'outcome1',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'outcome2',
            type: 'bytes',
          },
          {
            internalType: 'bytes',
            name: 'description',
            type: 'bytes',
          },
        ],
      },
      {
        internalType: 'uint256',
        name: 'outcome1Balance',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'outcome2Balance',
        type: 'uint256',
      },
    ],
  },
  {
    inputs: [
      { internalType: 'string', name: 'outcome1', type: 'string' },
      { internalType: 'string', name: 'outcome2', type: 'string' },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      { internalType: 'bytes32', name: 'marketId', type: 'bytes32' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'initializeMarket',
  },
  {
    inputs: [
      { internalType: 'string', name: 'outcome1', type: 'string' },
      { internalType: 'string', name: 'outcome2', type: 'string' },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        internalType: 'bytes32',
        name: 'marketId',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'tokensToCreate',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'initializeMarketAndCreateOutcomeTokens',
  },
  {
    inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
    name: 'markets',
    outputs: [
      { internalType: 'bool', name: 'resolved', type: 'bool' },
      {
        internalType: 'bytes32',
        name: 'assertedOutcomeId',
        type: 'bytes32',
      },
      {
        internalType: 'contract ExpandedIERC20',
        name: 'outcome1Token',
        type: 'address',
      },
      {
        internalType: 'contract ExpandedIERC20',
        name: 'outcome2Token',
        type: 'address',
      },
      { internalType: 'bytes', name: 'outcome1', type: 'bytes' },
      { internalType: 'bytes', name: 'outcome2', type: 'bytes' },
      { internalType: 'bytes', name: 'description', type: 'bytes' },
    ],
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'marketId',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'tokensToRedeem',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'redeemOutcomeTokens',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'marketId',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'outcomeToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'currencyAmount',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'sell',
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'marketId', type: 'bytes32' }],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'settleOutcomeTokens',
    outputs: [{ internalType: 'uint256', name: 'payout', type: 'uint256' }],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'unresolvable',
    outputs: [{ internalType: 'bytes', name: '', type: 'bytes' }],
  },
];
