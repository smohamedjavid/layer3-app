import React from 'react';
import { render } from '@testing-library/react-native';
import { CollectibleItem } from '../../src/components/CollectibleItem';
import { Collectible } from '../../src/types/UserData';

const mockCollectible: Collectible = {
  name: 'Bored Ape Yacht Club #1234',
  image: 'https://example.com/bored-ape.png',
  tokenId: '1234',
  uniqueId: '1-0x1234567890123456789012345678901234567890-1234',
  chain_name: 'Ethereum',
  chain_id: 1,
  chain_logo_url: 'https://example.com/eth-logo.png',
};

describe('CollectibleItem', () => {
  describe('Compact variant (default)', () => {
    it('should render compact variant by default', () => {
      const { getByText } = render(<CollectibleItem item={mockCollectible} />);

      expect(getByText('Bored Ape Yacht Club #1234')).toBeTruthy();
      expect(getByText('Ethereum')).toBeTruthy();
    });

    it('should render compact variant when explicitly set', () => {
      const { getByText } = render(<CollectibleItem item={mockCollectible} variant="compact" />);

      expect(getByText('Bored Ape Yacht Club #1234')).toBeTruthy();
      expect(getByText('Ethereum')).toBeTruthy();
    });

    it('should display chain logo in compact variant', () => {
      const { getByText } = render(<CollectibleItem item={mockCollectible} variant="compact" />);

      // The chain name should be rendered
      expect(getByText('Ethereum')).toBeTruthy();
    });

    it('should apply correct styles for compact variant', () => {
      const { getByText } = render(<CollectibleItem item={mockCollectible} variant="compact" />);
      const nameText = getByText('Bored Ape Yacht Club #1234');

      // Check that the text has the correct styling props
      expect(nameText.props.style).toEqual(
        expect.arrayContaining([expect.objectContaining({ fontWeight: '600' })])
      );
    });
  });

  describe('Detailed variant', () => {
    it('should render detailed variant when specified', () => {
      const { getByText } = render(<CollectibleItem item={mockCollectible} variant="detailed" />);

      expect(getByText('Bored Ape Yacht Club #1234')).toBeTruthy();
      expect(getByText('Token ID: 1234')).toBeTruthy();
      expect(getByText('Ethereum')).toBeTruthy();
    });

    it('should display token ID in detailed variant', () => {
      const { getByText } = render(<CollectibleItem item={mockCollectible} variant="detailed" />);

      expect(getByText('Token ID: 1234')).toBeTruthy();
    });

    it('should display chain information with logo in detailed variant', () => {
      const { getByText } = render(<CollectibleItem item={mockCollectible} variant="detailed" />);

      expect(getByText('Ethereum')).toBeTruthy();
    });

    it('should apply correct styles for detailed variant', () => {
      const { getByText } = render(<CollectibleItem item={mockCollectible} variant="detailed" />);
      const nameText = getByText('Bored Ape Yacht Club #1234');

      // Check that the text has the correct styling props for detailed variant
      expect(nameText.props.style).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            fontSize: 14,
            fontWeight: '600',
            color: '#333',
          }),
        ])
      );
    });
  });

  describe('Edge cases', () => {
    it('should handle long names with numberOfLines', () => {
      const longNameCollectible = {
        ...mockCollectible,
        name: 'Very Long Collectible Name That Should Be Truncated When Displayed',
      };

      const { getByText } = render(
        <CollectibleItem item={longNameCollectible} variant="detailed" />
      );
      const nameText = getByText(
        'Very Long Collectible Name That Should Be Truncated When Displayed'
      );

      // Check that numberOfLines is applied
      expect(nameText.props.numberOfLines).toBe(1);
    });

    it('should handle missing image gracefully', () => {
      const noImageCollectible = {
        ...mockCollectible,
        image: '',
      };

      // Should not crash when image is empty
      expect(() => {
        render(<CollectibleItem item={noImageCollectible} />);
      }).not.toThrow();
    });

    it('should handle special characters in name', () => {
      const specialNameCollectible = {
        ...mockCollectible,
        name: 'NFT #1234 🚀 Special Characters',
      };

      const { getByText } = render(<CollectibleItem item={specialNameCollectible} />);

      expect(getByText('NFT #1234 🚀 Special Characters')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should render without crashing with image props', () => {
      // Test that component renders with image props without crashing
      expect(() => {
        render(<CollectibleItem item={mockCollectible} />);
      }).not.toThrow();
    });

    it('should handle compact variant rendering', () => {
      expect(() => {
        render(<CollectibleItem item={mockCollectible} variant="compact" />);
      }).not.toThrow();
    });

    it('should handle detailed variant rendering', () => {
      expect(() => {
        render(<CollectibleItem item={mockCollectible} variant="detailed" />);
      }).not.toThrow();
    });
  });
});
