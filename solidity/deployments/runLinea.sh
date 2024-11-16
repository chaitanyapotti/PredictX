#!/bin/bash
export MNEMONIC="modify green conduct since art allow invest young pause mercy wreck burst aunt cushion siege"
export ETH_RPC_URL="https://linea-sepolia.infura.io/v3/84afdf720535440ca2457d5e38875563"
export ETHERSCAN_API_KEY="QATW7YQCHJFWJR4A3TRYSS81UGYJ68FPXE"
forge script \
--broadcast \
--slow \
--rpc-url $ETH_RPC_URL \
--mnemonics "$MNEMONIC" \
--sender $(cast wallet address --mnemonic "$MNEMONIC") \
--verify -vv \
--etherscan-api-key $ETHERSCAN_API_KEY \
--chain linea-sepolia \
script/PredictXOwner.s.sol

# erc20: 0x7616497a8989dD88CF0C1d99A6438A093E0C05af
# prediction: 0x61127b1e63E282041ac286c3eFa3151Db0bfCa5e