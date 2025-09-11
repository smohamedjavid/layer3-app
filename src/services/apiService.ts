// Local imports
import { API_CONFIG, API_ENDPOINTS } from '../constants/config';
import { SUPPORTED_CHAINS } from '../constants/chains';
import { AlchemyNFTResponse } from '../types/providers/Alchemy';
import {
  CovalentAPIResponse,
  CovalentAPITokenBalance,
  CovalentRecentTransaction,
  CovalentTokenItem,
} from '../types/providers/Covalent';
import { Token, Collectible, Transaction, MultichainBalance } from '../types/UserData';
import { User } from '../types/User';

// API Service functions for React Query
export const apiService = {
  // Fetch tokens for a specific address
  async fetchTokens(address: string): Promise<Token[]> {
    const chains = SUPPORTED_CHAINS;
    const allTokens: Token[] = [];
    const chainBalances: Array<{
      name: string;
      logo: string;
      value: number;
    }> = [];

    for (const chain of chains) {
      try {
        const response = await fetch(
          `${API_CONFIG.COVALENT_BASE_URL}/${chain.id}/address/${address}/balances_v2/?key=${API_CONFIG.COVALENT_API_KEY}&no-spam=true`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch ${chain.name} tokens: ${response.status}`);
        }

        const data: CovalentAPIResponse<CovalentAPITokenBalance> = await response.json();

        if (data.data && data.data.items && data.data.items.length > 0) {
          // Filter tokens with balance (balance !== "0" and quote !== 0)
          const filteredTokens = data.data.items.filter(
            (item: CovalentTokenItem) => item.balance !== '0' && item.quote !== 0
          );

          // Convert to our Token interface and add chain info
          const chainTokens: Token[] = filteredTokens.map((item: CovalentTokenItem) => ({
            ...item,
            chain_name: chain.name,
            chain_id: chain.id,
            chain_logo_url: chain.logo_url,
          }));

          allTokens.push(...chainTokens);

          // Calculate chain balance for multichain display
          const chainValue = filteredTokens.reduce((sum, token) => sum + token.quote, 0);

          if (chainValue > 0) {
            chainBalances.push({
              name: chain.name,
              logo: chain.logo_url,
              value: chainValue,
            });
          }
        }
      } catch (error) {
        console.warn(`Error fetching ${chain.name} tokens:`, error);
        // Continue with other chains even if one fails
      }
    }

    // Sort tokens by USD value (highest first)
    allTokens.sort((a, b) => b.quote - a.quote);

    return allTokens;
  },

  // Fetch collectibles for a specific address
  async fetchCollectibles(address: string): Promise<Collectible[]> {
    const allCollectibles: Collectible[] = [];

    // Process each supported chain
    for (const chain of SUPPORTED_CHAINS) {
      try {
        let baseUrl = '';
        let shouldSkip = false;

        // Determine the base URL for each chain
        if (chain.alchemy_base_url) {
          baseUrl = chain.alchemy_base_url;
        } else {
          console.log(`Skipping ${chain.name} NFTs - no Alchemy API support`);
          shouldSkip = true;
        }

        if (shouldSkip) {
          continue;
        }

        // Fetch NFTs using the determined base URL
        const response = await fetch(
          `${baseUrl}/nft/v3/${API_CONFIG.ALCHEMY_API_KEY}/getNFTsForOwner?owner=${address}&withMetadata=true&pageSize=20`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch ${chain.name} NFTs: ${response.status}`);
        }

        const data: AlchemyNFTResponse = await response.json();

        if (data.ownedNfts) {
          const chainCollectibles = data.ownedNfts.slice(0, 20);

          // Process collectibles for this chain
          if (chainCollectibles.length > 0) {
            const processedCollectibles = chainCollectibles
              .map((nft) => ({
                name: nft.name || nft.title || `NFT #${nft.tokenId}`,
                image: nft.image?.thumbnailUrl || nft.image?.cachedUrl || nft.image?.originalUrl,
                tokenId: nft.tokenId,
                uniqueId: `${chain.id}-${nft.contract.address}-${nft.tokenId}`,
                chain_name: chain.name,
                chain_id: chain.id,
                chain_logo_url: chain.logo_url,
              }))
              .filter((nft: Collectible) => nft.image);

            allCollectibles.push(...processedCollectibles);
          }
        }
      } catch (error) {
        console.warn(`Error fetching ${chain.name} NFTs:`, error);
        // Continue with other chains even if one fails
      }
    }

    // Sort collectibles by chain name, then by name
    allCollectibles.sort((a, b) => {
      if (a.chain_name !== b.chain_name) {
        return a.chain_name.localeCompare(b.chain_name);
      }
      return (a.name || '').localeCompare(b.name || '');
    });

    return allCollectibles;
  },

  // Fetch transactions for a specific address
  async fetchTransactions(address: string): Promise<Transaction[]> {
    const chains = SUPPORTED_CHAINS;
    const allTransactions: Transaction[] = [];

    for (const chain of chains) {
      try {
        const response = await fetch(
          `${API_CONFIG.COVALENT_BASE_URL}/${chain.id}/address/${address}/transactions_v3/?key=${API_CONFIG.COVALENT_API_KEY}&page-size=10&no-logs=true`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch ${chain.name} transactions: ${response.status}`);
        }

        const data: CovalentAPIResponse<CovalentRecentTransaction> = await response.json();

        if (data.data && data.data.items && data.data.items.length > 0) {
          // Map Covalent transactions to our Transaction interface
          const chainTransactions: Transaction[] = data.data.items.map((tx) => ({
            hash: tx.tx_hash,
            timestamp: tx.block_signed_at,
            from: tx.from_address,
            to: tx.to_address || '', // Some transactions might not have a to_address
            value: tx.value ? (parseFloat(tx.value) / Math.pow(10, 18)).toFixed(6) : '0',
            type: tx.from_address.toLowerCase() === address.toLowerCase() ? 'sent' : 'received',
            chain_name: chain.name,
            chain_id: chain.id,
            chain_logo_url: chain.logo_url,
            chain_explorer: tx.explorers[0],
          }));

          allTransactions.push(...chainTransactions);
        }
      } catch (error) {
        console.warn(`Error fetching ${chain.name} transactions:`, error);
        // Continue with other chains even if one fails
      }
    }

    // Sort transactions by timestamp (most recent first)
    allTransactions.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Limit to 50 most recent transactions
    const limitedTransactions = allTransactions.slice(0, 50);

    return limitedTransactions;
  },

  // Calculate multichain balance from tokens
  calculateMultichainBalance(tokens: Token[]): MultichainBalance {
    const chainBalances: Array<{
      name: string;
      logo: string;
      value: number;
    }> = [];

    let totalValue = 0;
    let totalValue24h = 0;

    // Group tokens by chain
    const chainGroups = tokens.reduce((groups, token) => {
      const chainName = token.chain_name;
      if (!groups[chainName]) {
        groups[chainName] = [];
      }
      groups[chainName].push(token);
      return groups;
    }, {} as Record<string, Token[]>);

    // Calculate balance for each chain
    Object.entries(chainGroups).forEach(([chainName, chainTokens]) => {
      const chainValue = chainTokens.reduce((sum, token) => sum + token.quote, 0);
      const chainValue24h = chainTokens.reduce((sum, token) => sum + (token.quote_24h || 0), 0);

      if (chainValue > 0) {
        const chain = SUPPORTED_CHAINS.find((c) => c.name === chainName);
        if (chain) {
          chainBalances.push({
            name: chain.name,
            logo: chain.logo_url,
            value: chainValue,
          });
        }
      }

      totalValue += chainValue;
      totalValue24h += chainValue24h;
    });

    // Calculate 24h change percentage
    const changePercent =
      totalValue24h > 0 ? ((totalValue - totalValue24h) / totalValue24h) * 100 : 0;

    return {
      totalValue,
      changePercent,
      chains: chainBalances,
    };
  },

  // Fetch users list
  async fetchUsers(): Promise<User[]> {
    const response = await fetch(API_ENDPOINTS.USERS);

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }

    const result = await response.json();
    return result.users.sort((a: User, b: User) => a.rank - b.rank);
  },
};
