// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Market} from "../src/Market.sol";
import {SimpleToken} from "../src/SimpleToken.sol";
contract CounterTest is Test {
    Market public market;

    function setUp() public {
        SimpleToken simpleToken = new SimpleToken();
        market = new Market(address(simpleToken));
    }
}
