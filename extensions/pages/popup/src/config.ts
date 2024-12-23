import { CHAIN_NAME, type ChainNameType } from "./constants";

const PredictX_CONTRACT_ADDRESS_CHAINS: Record<ChainNameType, string> = {
  [CHAIN_NAME.BASE_SEPOLIA]: '0xBa0e0c1212D3b9cD54a1ae90BA66ABab04Dd7A06',
  [CHAIN_NAME.SEPOLIA]: '0x6CD50CDf6645FebDdf9bc6a2E76e67C85869076b',
  [CHAIN_NAME.POLYGON_AMOY]: '0xD579aC5595f2B6763239aaee73A055CAE03f5883',
  [CHAIN_NAME.BITKUB_TESTNET]: '0x4C66096862bD49929DCd2888bc5F7A22aEe84460',
  [CHAIN_NAME.FLOW_TESTNET]: '0x61127b1e63E282041ac286c3eFa3151Db0bfCa5e',
  [CHAIN_NAME.MANTEL_SEPOLIA_TESTNET]: '0x61127b1e63E282041ac286c3eFa3151Db0bfCa5e',
  [CHAIN_NAME.LINEA_SEPOLIA]: '0x61127b1e63E282041ac286c3eFa3151Db0bfCa5e',
  [CHAIN_NAME.SCROLL_SEPOLIA]: '0x61127b1e63E282041ac286c3eFa3151Db0bfCa5e',
  [CHAIN_NAME.UNICHAIN_SEPOLIA]: '0x61127b1e63E282041ac286c3eFa3151Db0bfCa5e',
  [CHAIN_NAME.MORPH_HOLESKY]: '0x61127b1e63E282041ac286c3eFa3151Db0bfCa5e',
};

export const getContractAddress = (chainName: ChainNameType) => PredictX_CONTRACT_ADDRESS_CHAINS[chainName];

const USDC_CONTRACT_ADDRESS_CHAINS: Record<ChainNameType, string> = {
  [CHAIN_NAME.BASE_SEPOLIA]: '0x9BA3871bCb25a2CF5dA6c56425Ad77615d443c28',
  [CHAIN_NAME.SEPOLIA]: '0xB252f5258b4617A4d245b6f229ce8A4206232eB9',
  [CHAIN_NAME.POLYGON_AMOY]: '0x61127b1e63E282041ac286c3eFa3151Db0bfCa5e',
  [CHAIN_NAME.BITKUB_TESTNET]: '0x4a65Cbe1accf8D8BB24986993102EDb76E50ef55',
  [CHAIN_NAME.FLOW_TESTNET]: '0x7616497a8989dD88CF0C1d99A6438A093E0C05af',
  [CHAIN_NAME.MANTEL_SEPOLIA_TESTNET]: '0x7616497a8989dD88CF0C1d99A6438A093E0C05af',
  [CHAIN_NAME.LINEA_SEPOLIA]: '0x7616497a8989dD88CF0C1d99A6438A093E0C05af',
  [CHAIN_NAME.SCROLL_SEPOLIA]: '0x7616497a8989dD88CF0C1d99A6438A093E0C05af',
  [CHAIN_NAME.UNICHAIN_SEPOLIA]: '0x7616497a8989dD88CF0C1d99A6438A093E0C05af',
  [CHAIN_NAME.MORPH_HOLESKY]: '0x7616497a8989dD88CF0C1d99A6438A093E0C05af',
};

export const getUSDCContractAddress = (chainName: ChainNameType) => USDC_CONTRACT_ADDRESS_CHAINS[chainName];

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
        name: 'currencyAmount',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'outcomeTokensBought',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'TokensBought',
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
        name: 'currencyAmount',
        type: 'uint256',
        indexed: false,
      },
      {
        internalType: 'uint256',
        name: 'outcomeTokensSold',
        type: 'uint256',
        indexed: false,
      },
    ],
    type: 'event',
    name: 'TokensSold',
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

export const USDC_ABI = [
  {
    type: 'constructor',
    inputs: [
      { name: '_tokenName', type: 'string', internalType: 'string' },
      { name: '_tokenSymbol', type: 'string', internalType: 'string' },
      { name: '_tokenDecimals', type: 'uint8', internalType: 'uint8' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'addBurner',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'addMember',
    inputs: [
      { name: 'roleId', type: 'uint256', internalType: 'uint256' },
      { name: 'newMember', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'addMinter',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'allowance',
    inputs: [
      { name: 'owner', type: 'address', internalType: 'address' },
      { name: 'spender', type: 'address', internalType: 'address' },
    ],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      { name: 'spender', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'burn',
    inputs: [{ name: 'value', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'burnFrom',
    inputs: [
      { name: 'recipient', type: 'address', internalType: 'address' },
      { name: 'value', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'decimals',
    inputs: [],
    outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'decreaseAllowance',
    inputs: [
      { name: 'spender', type: 'address', internalType: 'address' },
      {
        name: 'subtractedValue',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getMember',
    inputs: [{ name: 'roleId', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'holdsRole',
    inputs: [
      { name: 'roleId', type: 'uint256', internalType: 'uint256' },
      {
        name: 'memberToCheck',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'increaseAllowance',
    inputs: [
      { name: 'spender', type: 'address', internalType: 'address' },
      { name: 'addedValue', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'mint',
    inputs: [
      { name: 'recipient', type: 'address', internalType: 'address' },
      { name: 'value', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'removeMember',
    inputs: [
      { name: 'roleId', type: 'uint256', internalType: 'uint256' },
      {
        name: 'memberToRemove',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'renounceMembership',
    inputs: [{ name: 'roleId', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'resetMember',
    inputs: [
      { name: 'roleId', type: 'uint256', internalType: 'uint256' },
      { name: 'newMember', type: 'address', internalType: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'resetOwner',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'symbol',
    inputs: [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalSupply',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transfer',
    inputs: [
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferFrom',
    inputs: [
      { name: 'from', type: 'address', internalType: 'address' },
      { name: 'to', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'AddedSharedMember',
    inputs: [
      {
        name: 'roleId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'newMember',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'manager',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'spender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RemovedSharedMember',
    inputs: [
      {
        name: 'roleId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'oldMember',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'manager',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ResetExclusiveMember',
    inputs: [
      {
        name: 'roleId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'newMember',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'manager',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
];
