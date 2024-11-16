export const PREDICTX_ADDRESS = '0x...'; // Add your deployed contract address

export const PREDICTX_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_finder', type: 'address' },
      {
        internalType: 'address',
        name: '_currency',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_optimisticOracleV3',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    type: 'error',
    name: 'SafeERC20FailedOperation',
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
      {
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'requiredBond',
        type: 'uint256',
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
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'finder',
    outputs: [
      {
        internalType: 'contract FinderInterface',
        name: '',
        type: 'address',
      },
    ],
  },
  {
    inputs: [{ internalType: 'bytes32', name: 'marketId', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
    name: 'getMarket',
    outputs: [
      {
        internalType: 'struct PredictionMarket.Market',
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
            internalType: 'uint256',
            name: 'reward',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'requiredBond',
            type: 'uint256',
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
      { internalType: 'uint256', name: 'reward', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'requiredBond',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'initializeMarket',
    outputs: [{ internalType: 'bytes32', name: 'marketId', type: 'bytes32' }],
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
      { internalType: 'uint256', name: 'reward', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'requiredBond',
        type: 'uint256',
      },
      { internalType: 'bytes', name: 'outcome1', type: 'bytes' },
      { internalType: 'bytes', name: 'outcome2', type: 'bytes' },
      { internalType: 'bytes', name: 'description', type: 'bytes' },
    ],
  },
  {
    inputs: [],
    stateMutability: 'view',
    type: 'function',
    name: 'oo',
    outputs: [
      {
        internalType: 'contract OptimisticOracleV3Interface',
        name: '',
        type: 'address',
      },
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
        name: 'tokenAmount',
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
] as const;
