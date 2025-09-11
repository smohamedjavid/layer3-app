import {
  formatAddress,
  formatBalance,
  formatCurrency,
  formatPercent,
  formatTimestamp,
} from '../../src/utils/formatters';

describe('formatters', () => {
  describe('formatAddress', () => {
    it('should format a long address correctly', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      const result = formatAddress(address);
      expect(result).toBe('0x12...678');
    });

    it('should return the address as-is if too short', () => {
      const address = '0x123';
      const result = formatAddress(address);
      expect(result).toBe('0x123');
    });

    it('should handle custom prefix and suffix lengths', () => {
      const address = '0x1234567890abcdef1234567890abcdef12345678';
      const result = formatAddress(address, 6, 4);
      expect(result).toBe('0x1234...5678');
    });
  });

  describe('formatBalance', () => {
    it('should format large numbers with M suffix', () => {
      const result = formatBalance('1000000000000000000000000', 18); // 1000000 tokens
      expect(result).toBe('1.00M');
    });

    it('should format medium numbers with K suffix', () => {
      const result = formatBalance('5000000000000000000000', 18); // 5000 tokens
      expect(result).toBe('5.00K');
    });

    it('should format small numbers with 4 decimal places', () => {
      const result = formatBalance('1000000000000000000', 18); // 1 token
      expect(result).toBe('1.0000');
    });

    it('should format very small numbers with 6 decimal places', () => {
      const result = formatBalance('500000000000000', 18); // 0.0005 tokens
      expect(result).toBe('0.000500');
    });
  });

  describe('formatCurrency', () => {
    it('should format USD currency correctly', () => {
      const result = formatCurrency(1234.56);
      expect(result).toBe('$1,234.56');
    });

    it('should handle zero values', () => {
      const result = formatCurrency(0);
      expect(result).toBe('$0.00');
    });

    it('should handle null/undefined values', () => {
      const result = formatCurrency(null as any);
      expect(result).toBe('$0.00');
    });
  });

  describe('formatPercent', () => {
    it('should format positive percentages with plus sign', () => {
      const result = formatPercent(5.25);
      expect(result).toBe('+5.25%');
    });

    it('should format negative percentages', () => {
      const result = formatPercent(-2.5);
      expect(result).toBe('-2.50%');
    });

    it('should handle zero', () => {
      const result = formatPercent(0);
      expect(result).toBe('+0.00%');
    });
  });

  describe('formatTimestamp', () => {
    it('should format timestamp to readable time', () => {
      const timestamp = '2024-01-15T14:30:00Z';
      const result = formatTimestamp(timestamp);
      // The exact format may vary by timezone, but should contain time components
      expect(result).toMatch(/\d{1,2}:\d{2} (AM|PM)/);
    });
  });
});
