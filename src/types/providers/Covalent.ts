export interface CovalentAPIResponse<T> {
  data: T;
  error: boolean;
  error_message: string | null;
  error_code: number | null;
}

export interface CovalentTokenItem {
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  contract_address: string;
  contract_display_name: string;
  supports_erc: Array<string>;
  logo_url: string;
  logo_urls: {
    token_logo_url: string;
    protocol_logo_url: string;
    chain_logo_url: string;
  };
  last_transferred_at: string;
  block_height: number;
  native_token: boolean;
  type: string;
  is_spam: boolean;
  balance: string;
  balance_24h: string;
  quote_rate: number;
  quote_rate_24h: number;
  quote: number;
  quote_24h: number;
  pretty_quote: string;
  pretty_quote_24h: string;
  protocol_metadata: {
    protocol_name: string;
  };
}

export interface CovalentAPITokenBalance {
  address: string;
  chain_id: number;
  chain_name: string;
  chain_tip_height: number;
  chain_tip_signed_at: string;
  quote_currency: string;
  updated_at: string;
  items: Array<CovalentTokenItem>;
}

export interface ChainExplorerItem {
  label: string;
  url: string;
}
export interface CovalentRecentTransactionItem {
  block_signed_at: string;
  block_height: number;
  block_hash: string;
  tx_hash: string;
  tx_offset: number;
  successful: boolean;
  from_address: string;
  miner_address: string;
  from_address_label: string;
  to_address: string;
  to_address_label: string;
  value: string;
  value_quote: number;
  pretty_value_quote: string;
  gas_metadata: {
    contract_decimals: number;
    contract_name: string;
    contract_ticker_symbol: string;
    contract_address: string;
    supports_erc: [string];
    logo_url: string;
  };
  gas_offered: number;
  gas_spent: number;
  gas_price: number;
  fees_paid: string;
  gas_quote: number;
  pretty_gas_quote: string;
  gas_quote_rate: number;
  explorers: Array<ChainExplorerItem>;
  log_events: {
    block_signed_at: string;
    block_height: number;
    tx_offset: number;
    log_offset: number;
    tx_hash: string;
    raw_log_topics: [string];
    sender_contract_decimals: number;
    sender_name: string;
    sender_contract_ticker_symbol: string;
    sender_address: string;
    sender_address_label: string;
    sender_logo_url: string;
    supports_erc: [string];
    sender_factory_address: string;
    raw_log_data: string;
    decoded: {
      name: string;
      signature: string;
      params: [
        {
          name: string;
          type: string;
          indexed: boolean;
          decoded: boolean;
          value: string;
        }
      ];
    };
  }[];
}
export interface CovalentRecentTransaction {
  address: string;
  updated_at: string;
  quote_currency: string;
  chain_id: number;
  chain_name: string;
  chain_tip_height: number;
  chain_tip_signed_at: string;
  current_page: number;
  links: {
    prev: string;
    next: string;
  };
  items: Array<CovalentRecentTransactionItem>;
}
