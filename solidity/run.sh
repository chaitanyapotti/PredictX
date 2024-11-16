#!/bin/bash
export MNEMONIC="test test test test test test test test test test test junk"
export ETH_RPC_URL="127.0.0.1:8545"
forge script \
--broadcast \
--fork-url $ETH_RPC_URL \
--mnemonics "$MNEMONIC" \
--sender $(cast wallet address --mnemonic "$MNEMONIC") \
--verify \
script/PredictXOwner.s.sol