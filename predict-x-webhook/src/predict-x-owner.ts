import {
  MarketAsserted as MarketAssertedEvent,
  MarketInitialized as MarketInitializedEvent,
  MarketResolved as MarketResolvedEvent,
  TokensCreated as TokensCreatedEvent,
  TokensRedeemed as TokensRedeemedEvent,
  TokensSettled as TokensSettledEvent
} from "../generated/PredictXOwner/PredictXOwner"
import {
  MarketAsserted,
  MarketInitialized,
  MarketResolved,
  TokensCreated,
  TokensRedeemed,
  TokensSettled
} from "../generated/schema"

export function handleMarketAsserted(event: MarketAssertedEvent): void {
  let entity = new MarketAsserted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketId = event.params.marketId
  entity.assertedOutcome = event.params.assertedOutcome
  entity.assertionId = event.params.assertionId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMarketInitialized(event: MarketInitializedEvent): void {
  let entity = new MarketInitialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketId = event.params.marketId
  entity.outcome1 = event.params.outcome1
  entity.outcome2 = event.params.outcome2
  entity.description = event.params.description
  entity.outcome1Token = event.params.outcome1Token
  entity.outcome2Token = event.params.outcome2Token

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMarketResolved(event: MarketResolvedEvent): void {
  let entity = new MarketResolved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketId = event.params.marketId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokensCreated(event: TokensCreatedEvent): void {
  let entity = new TokensCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketId = event.params.marketId
  entity.account = event.params.account
  entity.tokensCreated = event.params.tokensCreated

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokensRedeemed(event: TokensRedeemedEvent): void {
  let entity = new TokensRedeemed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketId = event.params.marketId
  entity.account = event.params.account
  entity.tokensRedeemed = event.params.tokensRedeemed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokensSettled(event: TokensSettledEvent): void {
  let entity = new TokensSettled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketId = event.params.marketId
  entity.account = event.params.account
  entity.payout = event.params.payout
  entity.outcome1Tokens = event.params.outcome1Tokens
  entity.outcome2Tokens = event.params.outcome2Tokens

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}