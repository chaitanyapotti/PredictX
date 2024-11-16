export const PREDICTX_ADDRESS = '0x...'; // Add your deployed contract address

export const PREDICTX_ABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'outcome1',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'outcome2',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
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
    ],
    name: 'initializeMarket',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'marketId',
        type: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
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
    name: 'createOutcomeTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
