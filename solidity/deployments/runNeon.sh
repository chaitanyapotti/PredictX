#!/bin/bash
export MNEMONIC="modify green conduct since art allow invest young pause mercy wreck burst aunt cushion siege"
export ETH_RPC_URL="https://neon-evm-devnet.drpc.org"
export ETHERSCAN_API_KEY="QATW7YQCHJFWJR4A3TRYSS81UGYJ68FPXE"
forge script \
--broadcast \
--slow \
--rpc-url $ETH_RPC_URL \
--mnemonics "$MNEMONIC" \
--sender $(cast wallet address --mnemonic "$MNEMONIC") \
--legacy \
--skip-simulation \
--chain-id 245022926 \
script/PredictXOwner.s.sol

# erc20: 0x61127b1e63E282041ac286c3eFa3151Db0bfCa5e
# prediction: 0xD579aC5595f2B6763239aaee73A055CAE03f5883