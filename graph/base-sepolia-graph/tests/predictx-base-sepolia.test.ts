import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { MarketAsserted } from "../generated/schema"
import { MarketAsserted as MarketAssertedEvent } from "../generated/predictx-base-sepolia/predictx-base-sepolia"
import { handleMarketAsserted } from "../src/predictx-base-sepolia"
import { createMarketAssertedEvent } from "./predictx-base-sepolia-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let marketId = Bytes.fromI32(1234567890)
    let assertedOutcome = "Example string value"
    let assertionId = Bytes.fromI32(1234567890)
    let newMarketAssertedEvent = createMarketAssertedEvent(
      marketId,
      assertedOutcome,
      assertionId
    )
    handleMarketAsserted(newMarketAssertedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("MarketAsserted created and stored", () => {
    assert.entityCount("MarketAsserted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "MarketAsserted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "marketId",
      "1234567890"
    )
    assert.fieldEquals(
      "MarketAsserted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "assertedOutcome",
      "Example string value"
    )
    assert.fieldEquals(
      "MarketAsserted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "assertionId",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
