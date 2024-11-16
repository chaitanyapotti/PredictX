// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Market} from "../src/Market.sol";
import {SimpleToken} from "../src/SimpleToken.sol";

contract MarketScript is Script {
    Market public market;
    SimpleToken public simpleToken;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        simpleToken = new SimpleToken();
        market = new Market(address(simpleToken));

        vm.stopBroadcast();
    }
}
