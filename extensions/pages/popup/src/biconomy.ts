import { privateKeyToAccount } from "viem/accounts";
import { createNexusClient } from "@biconomy/sdk";
import { sepolia } from "viem/chains"; 
import { http } from "viem"; 
 
const privateKey = "PRIVATE_KEY";
const account = privateKeyToAccount(`0x${privateKey}`)
const bundlerUrl = "https://bundler.biconomy.io/api/v3/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44"; 
 
export const getBiconomyClient = async () => {
  const nexusClient = await createNexusClient({ 
    signer: account, 
    chain: sepolia,
    transport: http(), 
    bundlerTransport: http(bundlerUrl), 
  });
    
  const smartAccountAddress = await nexusClient.account.address; 
  return { nexusClient, smartAccountAddress };
}