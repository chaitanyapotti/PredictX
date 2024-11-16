import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  MarketAsserted,
  MarketInitialized,
  MarketResolved,
  TokensCreated,
  TokensRedeemed,
  TokensSettled
} from "../generated/PredictXOwner/PredictXOwner"

export function createMarketAssertedEvent(
  marketId: Bytes,
  assertedOutcome: string,
  assertionId: Bytes
): MarketAsserted {
  let marketAssertedEvent = changetype<MarketAsserted>(newMockEvent())

  marketAssertedEvent.parameters = new Array()

  marketAssertedEvent.parameters.push(
    new ethereum.EventParam("marketId", ethereum.Value.fromFixedBytes(marketId))
  )
  marketAssertedEvent.parameters.push(
    new ethereum.EventParam(
      "assertedOutcome",
      ethereum.Value.fromString(assertedOutcome)
    )
  )
  marketAssertedEvent.parameters.push(
    new ethereum.EventParam(
      "assertionId",
      ethereum.Value.fromFixedBytes(assertionId)
    )
  )

  return marketAssertedEvent
}

export function createMarketInitializedEvent(
  marketId: Bytes,
  outcome1: string,
  outcome2: string,
  description: string,
  outcome1Token: Address,
  outcome2Token: Address
): MarketInitialized {
  let marketInitializedEvent = changetype<MarketInitialized>(newMockEvent())

  marketInitializedEvent.parameters = new Array()

  marketInitializedEvent.parameters.push(
    new ethereum.EventParam("marketId", ethereum.Value.fromFixedBytes(marketId))
  )
  marketInitializedEvent.parameters.push(
    new ethereum.EventParam("outcome1", ethereum.Value.fromString(outcome1))
  )
  marketInitializedEvent.parameters.push(
    new ethereum.EventParam("outcome2", ethereum.Value.fromString(outcome2))
  )
  marketInitializedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  marketInitializedEvent.parameters.push(
    new ethereum.EventParam(
      "outcome1Token",
      ethereum.Value.fromAddress(outcome1Token)
    )
  )
  marketInitializedEvent.parameters.push(
    new ethereum.EventParam(
      "outcome2Token",
      ethereum.Value.fromAddress(outcome2Token)
    )
  )

  return marketInitializedEvent
}

export function createMarketResolvedEvent(marketId: Bytes): MarketResolved {
  let marketResolvedEvent = changetype<MarketResolved>(newMockEvent())

  marketResolvedEvent.parameters = new Array()

  marketResolvedEvent.parameters.push(
    new ethereum.EventParam("marketId", ethereum.Value.fromFixedBytes(marketId))
  )

  return marketResolvedEvent
}

export function createTokensCreatedEvent(
  marketId: Bytes,
  account: Address,
  tokensCreated: BigInt
): TokensCreated {
  let tokensCreatedEvent = changetype<TokensCreated>(newMockEvent())

  tokensCreatedEvent.parameters = new Array()

  tokensCreatedEvent.parameters.push(
    new ethereum.EventParam("marketId", ethereum.Value.fromFixedBytes(marketId))
  )
  tokensCreatedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  tokensCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokensCreated",
      ethereum.Value.fromUnsignedBigInt(tokensCreated)
    )
  )

  return tokensCreatedEvent
}

export function createTokensRedeemedEvent(
  marketId: Bytes,
  account: Address,
  tokensRedeemed: BigInt
): TokensRedeemed {
  let tokensRedeemedEvent = changetype<TokensRedeemed>(newMockEvent())

  tokensRedeemedEvent.parameters = new Array()

  tokensRedeemedEvent.parameters.push(
    new ethereum.EventParam("marketId", ethereum.Value.fromFixedBytes(marketId))
  )
  tokensRedeemedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  tokensRedeemedEvent.parameters.push(
    new ethereum.EventParam(
      "tokensRedeemed",
      ethereum.Value.fromUnsignedBigInt(tokensRedeemed)
    )
  )

  return tokensRedeemedEvent
}

export function createTokensSettledEvent(
  marketId: Bytes,
  account: Address,
  payout: BigInt,
  outcome1Tokens: BigInt,
  outcome2Tokens: BigInt
): TokensSettled {
  let tokensSettledEvent = changetype<TokensSettled>(newMockEvent())

  tokensSettledEvent.parameters = new Array()

  tokensSettledEvent.parameters.push(
    new ethereum.EventParam("marketId", ethereum.Value.fromFixedBytes(marketId))
  )
  tokensSettledEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  tokensSettledEvent.parameters.push(
    new ethereum.EventParam("payout", ethereum.Value.fromUnsignedBigInt(payout))
  )
  tokensSettledEvent.parameters.push(
    new ethereum.EventParam(
      "outcome1Tokens",
      ethereum.Value.fromUnsignedBigInt(outcome1Tokens)
    )
  )
  tokensSettledEvent.parameters.push(
    new ethereum.EventParam(
      "outcome2Tokens",
      ethereum.Value.fromUnsignedBigInt(outcome2Tokens)
    )
  )

  return tokensSettledEvent
}
