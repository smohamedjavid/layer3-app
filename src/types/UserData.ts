import { CovalentTokenItem, ChainExplorerItem } from './providers/Covalent';

export interface Token extends CovalentTokenItem {
  chain_name: string;
  chain_id: number;
  chain_logo_url: string;
}

export interface Collectible {
  name: string;
  image: string;
  tokenId: string;
  uniqueId: string;
  chain_name: string;
  chain_id: number;
  chain_logo_url: string;
}

export interface Transaction {
  hash: string;
  timestamp: string;
  from: string;
  to: string;
  value: string;
  type: 'sent' | 'received';
  chain_name: string;
  chain_id: number;
  chain_logo_url: string;
  chain_explorer: ChainExplorerItem;
}

export interface MultichainBalance {
  totalValue: number;
  changePercent: number;
  chains: Array<{
    name: string;
    logo: string;
    value: number;
  }>;
}
