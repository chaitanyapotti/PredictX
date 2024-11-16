#!/bin/bash
export MNEMONIC="modify green conduct since art allow invest young pause mercy wreck burst aunt cushion siege"
export ETH_RPC_URL="https://rpc-testnet.bitkubchain.io"
export ETHERSCAN_API_KEY="QATW7YQCHJFWJR4A3TRYSS81UGYJ68FPXE"
forge script \
--broadcast \
--slow \
--rpc-url $ETH_RPC_URL \
--mnemonics "$MNEMONIC" \
--legacy \
--sender $(cast wallet address --mnemonic "$MNEMONIC") \
--chain-id 25925 \
script/PredictXOwner.s.sol

# erc20: 0x7616497a8989dD88CF0C1d99A6438A093E0C05af
# prediction: 0x61127b1e63E282041ac286c3eFa3151Db0bfCa5e