#!/bin/bash
export MNEMONIC="modify green conduct since art allow invest young pause mercy wreck burst aunt cushion siege"
export ETH_RPC_URL="https://sepolia.infura.io/v3/84afdf720535440ca2457d5e38875563"
export ETHERSCAN_API_KEY="QATW7YQCHJFWJR4A3TRYSS81UGYJ68FPXE"
forge script \
--broadcast \
--slow \
--rpc-url $ETH_RPC_URL \
--mnemonics "$MNEMONIC" \
--sender $(cast wallet address --mnemonic "$MNEMONIC") \
--verify -vv \
--etherscan-api-key $ETHERSCAN_API_KEY \
--chain sepolia \
script/PredictXOwner.s.sol

# erc20: 0xB252f5258b4617A4d245b6f229ce8A4206232eB9
# prediction: 0x6CD50CDf6645FebDdf9bc6a2E76e67C85869076b