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

# erc20: 0x4a65Cbe1accf8D8BB24986993102EDb76E50ef55
# prediction: 0x4C66096862bD49929DCd2888bc5F7A22aEe84460