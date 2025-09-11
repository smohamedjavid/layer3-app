export interface Chain {
  id: number;
  name: string;
  logo_url: string;
  alchemy_base_url?: string | null;
}

// Chain ID constants
export const CHAIN_ID = {
  ETHEREUM: 1,
  OPTIMISM: 10,
  BASE: 8453,
  BNB_SMART_CHAIN: 56,
  ARBITRUM: 42161,
} as const;

export const SUPPORTED_CHAINS: Chain[] = [
  {
    id: CHAIN_ID.ETHEREUM,
    name: 'Ethereum',
    logo_url: 'https://assets.coingecko.com/coins/images/279/standard/ethereum.png',
    alchemy_base_url: 'https://eth-mainnet.g.alchemy.com',
  },
  {
    id: CHAIN_ID.OPTIMISM,
    name: 'Optimism',
    logo_url: 'https://assets.coingecko.com/coins/images/25244/standard/Optimism.png',
    alchemy_base_url: 'https://opt-mainnet.g.alchemy.com',
  },
  {
    id: CHAIN_ID.BASE,
    name: 'Base',
    logo_url: 'https://assets.coingecko.com/nft_contracts/images/2989/small_2x/base-introduced.png',
    alchemy_base_url: 'https://base-mainnet.g.alchemy.com',
  },
  {
    id: CHAIN_ID.BNB_SMART_CHAIN,
    name: 'BNB Smart Chain',
    logo_url: 'https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png',
    alchemy_base_url: null, // No Alchemy support
  },
  {
    id: CHAIN_ID.ARBITRUM,
    name: 'Arbitrum',
    logo_url: 'https://assets.coingecko.com/coins/images/16547/standard/arb.jpg',
    alchemy_base_url: 'https://arb-mainnet.g.alchemy.com',
  },
];
