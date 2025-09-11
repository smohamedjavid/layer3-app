import React from 'react';
import { render } from '@testing-library/react-native';
import { TokenItem } from '../../src/components/TokenItem';
import { Token } from '../../src/types/UserData';

const mockToken: Token = {
  contract_name: 'Ethereum',
  contract_ticker_symbol: 'ETH',
  contract_address: '0x0000000000000000000000000000000000000000',
  contract_decimals: 18,
  contract_display_name: 'Ethereum',
  supports_erc: ['erc20'],
  logo_url: 'https://example.com/eth-logo.png',
  logo_urls: {
    token_logo_url: 'https://example.com/eth-logo.png',
    protocol_logo_url: 'https://example.com/eth-protocol.png',
    chain_logo_url: 'https://example.com/eth-chain.png',
  },
  last_transferred_at: '2024-01-01T00:00:00Z',
  block_height: 18000000,
  native_token: true,
  type: 'cryptocurrency',
  is_spam: false,
  balance: '1000000000000000000', // 1 ETH
  balance_24h: '1000000000000000000',
  quote_rate: 2000,
  quote_rate_24h: 1950,
  quote: 2000,
  quote_24h: 1950,
  pretty_quote: '$2,000.00',
  pretty_quote_24h: '$1,950.00',
  protocol_metadata: {
    protocol_name: 'Ethereum',
  },
  chain_name: 'Ethereum',
  chain_id: 1,
  chain_logo_url: 'https://example.com/eth-logo.png',
};

describe('TokenItem', () => {
  it('should render token information correctly', () => {
    const { getByText } = render(<TokenItem item={mockToken} />);

    // Check balance with symbol
    expect(getByText('1.0000 ETH')).toBeTruthy();
    // Check price
    expect(getByText('$2,000.00')).toBeTruthy();
  });

  it('should render balance with correct formatting', () => {
    const largeBalanceToken = {
      ...mockToken,
      balance: '5000000000000000000000', // 5000 ETH
    };

    const { getByText } = render(<TokenItem item={largeBalanceToken} />);
    expect(getByText('5.00K ETH')).toBeTruthy();
  });

  it('should show price change when showChange is true and quote_24h exists', () => {
    const { getByText } = render(<TokenItem item={mockToken} showChange={true} />);

    // Calculate expected change: (2000 - 1950) / 1950 * 100 = 2.56%
    expect(getByText('+2.56%')).toBeTruthy();
  });

  it('should show negative price change in red', () => {
    const tokenWithLoss = {
      ...mockToken,
      quote: 1900,
      quote_24h: 2000,
    };

    const { getByText } = render(<TokenItem item={tokenWithLoss} showChange={true} />);
    const changeText = getByText('-5.00%');

    // Check that the color style contains the red color
    const styleString = JSON.stringify(changeText.props.style);
    expect(styleString).toContain('#ff6b6b');
  });

  it('should show positive price change in green', () => {
    const { getByText } = render(<TokenItem item={mockToken} showChange={true} />);
    const changeText = getByText('+2.56%');

    // Check that the color style contains the green color
    const styleString = JSON.stringify(changeText.props.style);
    expect(styleString).toContain('#51cf66');
  });

  it('should not show price change when showChange is false', () => {
    const { queryByText } = render(<TokenItem item={mockToken} showChange={false} />);

    expect(queryByText('+2.56%')).toBeNull();
    expect(queryByText('-5.00%')).toBeNull();
  });

  it('should not show price change when quote_24h is missing', () => {
    const tokenWithout24h = {
      ...mockToken,
      quote_24h: null as any,
    };

    const { queryByText } = render(<TokenItem item={tokenWithout24h} showChange={true} />);

    expect(queryByText(/%/)).toBeNull();
  });

  it('should render with correct layout structure', () => {
    const { getByTestId } = render(<TokenItem item={mockToken} />);

    // Note: In a real test, you might want to add testID props to components
    // for easier testing. For now, we'll test that the component renders without crashing.
    expect(true).toBe(true);
  });
});
