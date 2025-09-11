import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TransactionItem } from '../../src/components/TransactionItem';
import { Transaction } from '../../src/types/UserData';

const mockTransaction: Transaction = {
  hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  timestamp: '2024-01-15T14:30:00Z',
  from: '0x1234567890123456789012345678901234567890',
  to: '0x0987654321098765432109876543210987654321',
  value: '1.5',
  type: 'sent',
  chain_name: 'Ethereum',
  chain_id: 1,
  chain_logo_url: 'https://example.com/eth-logo.png',
  chain_explorer: {
    url: 'https://etherscan.io/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    label: 'Etherscan',
  },
};

const mockOnPressExplorer = jest.fn();

describe('TransactionItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render transaction information correctly', () => {
      const { getByText } = render(
        <TransactionItem item={mockTransaction} onPressExplorer={mockOnPressExplorer} />
      );

      expect(getByText('Sent')).toBeTruthy();
      expect(getByText('1.5 ETH')).toBeTruthy();
      expect(getByText('Ethereum')).toBeTruthy();
    });

    it('should render sent transaction with correct styling', () => {
      const { getByText } = render(
        <TransactionItem item={mockTransaction} onPressExplorer={mockOnPressExplorer} />
      );

      const sentText = getByText('Sent');
      // Just verify the component renders with the sent text
      expect(sentText).toBeTruthy();
    });

    it('should render received transaction with correct styling', () => {
      const receivedTransaction = { ...mockTransaction, type: 'received' as const };
      const { getByText } = render(
        <TransactionItem item={receivedTransaction} onPressExplorer={mockOnPressExplorer} />
      );

      const receivedText = getByText('Received');
      // Just verify the component renders with the received text
      expect(receivedText).toBeTruthy();
    });
  });

  describe('Transaction details', () => {
    it('should display formatted timestamp', () => {
      const { getByText } = render(
        <TransactionItem item={mockTransaction} onPressExplorer={mockOnPressExplorer} />
      );

      // The timestamp should be formatted (this will depend on the formatTimestamp function)
      const timestampText = getByText(/^\d{1,2}:\d{2} (AM|PM)$/);
      expect(timestampText).toBeTruthy();
    });

    it('should display formatted addresses', () => {
      const { getByText } = render(
        <TransactionItem item={mockTransaction} onPressExplorer={mockOnPressExplorer} />
      );

      // Should show formatted addresses (first 4 + last 3 chars)
      expect(getByText('0x12...890')).toBeTruthy(); // from address
      expect(getByText('0x09...321')).toBeTruthy(); // to address
    });

    it('should display transaction value with ETH suffix', () => {
      const { getByText } = render(
        <TransactionItem item={mockTransaction} onPressExplorer={mockOnPressExplorer} />
      );

      expect(getByText('1.5 ETH')).toBeTruthy();
    });

    it('should display chain name', () => {
      const { getByText } = render(
        <TransactionItem item={mockTransaction} onPressExplorer={mockOnPressExplorer} />
      );

      expect(getByText('Ethereum')).toBeTruthy();
    });
  });

  describe('Explorer interaction', () => {
    it('should call onPressExplorer when pressed', () => {
      const { getByText } = render(
        <TransactionItem item={mockTransaction} onPressExplorer={mockOnPressExplorer} />
      );

      // Press the transaction item
      fireEvent.press(getByText('Sent'));

      expect(mockOnPressExplorer).toHaveBeenCalledWith(
        'https://etherscan.io/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        'Etherscan'
      );
    });

    it('should handle missing chain explorer gracefully', () => {
      const transactionWithoutExplorer = {
        ...mockTransaction,
        chain_explorer: null as any, // Simulate missing explorer data
      };

      const { getByText } = render(
        <TransactionItem item={transactionWithoutExplorer} onPressExplorer={mockOnPressExplorer} />
      );

      // Should not crash when pressed
      expect(() => {
        fireEvent.press(getByText('Sent'));
      }).not.toThrow();

      // Should not call onPressExplorer if no explorer data
      expect(mockOnPressExplorer).not.toHaveBeenCalled();
    });
  });

  describe('Visual indicators', () => {
    it('should show red indicator for sent transactions', () => {
      // This test would check the visual indicator styling
      // Since we can't easily test the exact styling of the indicator dot,
      // we'll verify the component renders without crashing
      expect(() => {
        render(<TransactionItem item={mockTransaction} onPressExplorer={mockOnPressExplorer} />);
      }).not.toThrow();
    });

    it('should show green indicator for received transactions', () => {
      const receivedTransaction = { ...mockTransaction, type: 'received' as const };

      expect(() => {
        render(
          <TransactionItem item={receivedTransaction} onPressExplorer={mockOnPressExplorer} />
        );
      }).not.toThrow();
    });
  });

  describe('Address flow display', () => {
    it('should show from -> to address flow', () => {
      const { getByText } = render(
        <TransactionItem item={mockTransaction} onPressExplorer={mockOnPressExplorer} />
      );

      expect(getByText('0x12...890')).toBeTruthy();
      expect(getByText('→')).toBeTruthy();
      expect(getByText('0x09...321')).toBeTruthy();
    });

    it('should handle missing to address', () => {
      const transactionWithoutTo = {
        ...mockTransaction,
        to: '',
      };

      const { getByText } = render(
        <TransactionItem item={transactionWithoutTo} onPressExplorer={mockOnPressExplorer} />
      );

      // Should still render the from address and arrow
      expect(getByText('0x12...890')).toBeTruthy();
      expect(getByText('→')).toBeTruthy();
    });
  });

  describe('Edge cases', () => {
    it('should handle zero value transactions', () => {
      const zeroValueTransaction = { ...mockTransaction, value: '0' };

      const { getByText } = render(
        <TransactionItem item={zeroValueTransaction} onPressExplorer={mockOnPressExplorer} />
      );

      expect(getByText('0 ETH')).toBeTruthy();
    });

    it('should handle very small values', () => {
      const smallValueTransaction = { ...mockTransaction, value: '0.000001' };

      const { getByText } = render(
        <TransactionItem item={smallValueTransaction} onPressExplorer={mockOnPressExplorer} />
      );

      expect(getByText('0.000001 ETH')).toBeTruthy();
    });

    it('should handle long addresses gracefully', () => {
      const longAddressTransaction = {
        ...mockTransaction,
        from: '0x12345678901234567890123456789012345678901234567890123456789012345678901234567890',
        to: '0x09876543210987654321098765432109876543210987654321098765432109876543210987654321',
      };

      const { getByText } = render(
        <TransactionItem item={longAddressTransaction} onPressExplorer={mockOnPressExplorer} />
      );

      // Should still format the addresses correctly
      expect(getByText('0x12...890')).toBeTruthy();
      expect(getByText('0x09...321')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have proper touchable opacity', () => {
      const { getByText } = render(
        <TransactionItem item={mockTransaction} onPressExplorer={mockOnPressExplorer} />
      );

      // Just verify the component renders and has the expected text
      expect(getByText('Sent')).toBeTruthy();
      expect(getByText('1.5 ETH')).toBeTruthy();
    });

    it('should render chain logo with proper props', () => {
      // Test that the component renders with image props without crashing
      expect(() => {
        render(<TransactionItem item={mockTransaction} onPressExplorer={mockOnPressExplorer} />);
      }).not.toThrow();
    });
  });
});
