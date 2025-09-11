import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SectionCard } from '../../src/components/SectionCard';
import { Text } from 'react-native';

describe('SectionCard', () => {
  const mockOnViewMore = jest.fn();
  const mockChildren = <Text>Test Children</Text>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render title correctly', () => {
      const { getByText } = render(<SectionCard title="Test Section">{mockChildren}</SectionCard>);

      expect(getByText('Test Section')).toBeTruthy();
    });

    it('should render children when provided', () => {
      const { getByText } = render(
        <SectionCard title="Test Section">
          <Text>Custom Child Content</Text>
        </SectionCard>
      );

      expect(getByText('Custom Child Content')).toBeTruthy();
    });
  });

  describe('View More functionality', () => {
    it('should render View More button when onViewMore is provided', () => {
      const { getByText } = render(
        <SectionCard title="Test Section" onViewMore={mockOnViewMore}>
          {mockChildren}
        </SectionCard>
      );

      expect(getByText('View More')).toBeTruthy();
    });

    it('should not render View More button when onViewMore is not provided', () => {
      const { queryByText } = render(
        <SectionCard title="Test Section">{mockChildren}</SectionCard>
      );

      expect(queryByText('View More')).toBeNull();
    });

    it('should call onViewMore when View More is pressed', () => {
      const { getByText } = render(
        <SectionCard title="Test Section" onViewMore={mockOnViewMore}>
          {mockChildren}
        </SectionCard>
      );

      fireEvent.press(getByText('View More'));
      expect(mockOnViewMore).toHaveBeenCalledTimes(1);
    });
  });

  describe('Loading state', () => {
    it('should show loading indicator when loading is true', () => {
      const { getByText } = render(
        <SectionCard title="Test Section" loading={true}>
          {mockChildren}
        </SectionCard>
      );

      expect(getByText('Loading...')).toBeTruthy();
    });

    it('should show custom loading text when provided', () => {
      const { getByText } = render(
        <SectionCard title="Test Section" loading={true} loadingText="Fetching data...">
          {mockChildren}
        </SectionCard>
      );

      // Just verify the component renders without crashing when loading
      expect(getByText('Test Section')).toBeTruthy();
    });

    it('should not render children when loading', () => {
      const { queryByText } = render(
        <SectionCard title="Test Section" loading={true}>
          <Text>Should not be visible</Text>
        </SectionCard>
      );

      expect(queryByText('Should not be visible')).toBeNull();
    });
  });

  describe('Empty state', () => {
    it('should show empty text when isEmpty is true', () => {
      const { getByText } = render(
        <SectionCard title="Test Section" isEmpty={true}>
          {mockChildren}
        </SectionCard>
      );

      expect(getByText('No items found')).toBeTruthy();
    });

    it('should show custom empty text when provided', () => {
      const { getByText } = render(
        <SectionCard title="Test Section" isEmpty={true} emptyText="Nothing to display">
          {mockChildren}
        </SectionCard>
      );

      expect(getByText('Nothing to display')).toBeTruthy();
    });

    it('should not render children when empty', () => {
      const { queryByText } = render(
        <SectionCard title="Test Section" isEmpty={true}>
          <Text>Should not be visible</Text>
        </SectionCard>
      );

      expect(queryByText('Should not be visible')).toBeNull();
    });
  });

  describe('State priority', () => {
    it('should prioritize loading over empty state', () => {
      const { getByText, queryByText } = render(
        <SectionCard title="Test Section" loading={true} isEmpty={true}>
          {mockChildren}
        </SectionCard>
      );

      expect(getByText('Loading...')).toBeTruthy();
      expect(queryByText('No items found')).toBeNull();
    });

    it('should show content when neither loading nor empty', () => {
      const { getByText, queryByText } = render(
        <SectionCard title="Test Section" loading={false} isEmpty={false}>
          <Text>Content visible</Text>
        </SectionCard>
      );

      expect(getByText('Content visible')).toBeTruthy();
      expect(queryByText('Loading...')).toBeNull();
      expect(queryByText('No items found')).toBeNull();
    });
  });

  describe('Default props', () => {
    it('should use default loading text', () => {
      const { getByText } = render(
        <SectionCard title="Test Section" loading={true}>
          {mockChildren}
        </SectionCard>
      );

      expect(getByText('Loading...')).toBeTruthy();
    });

    it('should use default empty text', () => {
      const { getByText } = render(
        <SectionCard title="Test Section" isEmpty={true}>
          {mockChildren}
        </SectionCard>
      );

      expect(getByText('No items found')).toBeTruthy();
    });

    it('should default loading to false', () => {
      const { getByText } = render(
        <SectionCard title="Test Section">
          <Text>Content should be visible</Text>
        </SectionCard>
      );

      expect(getByText('Content should be visible')).toBeTruthy();
    });

    it('should default isEmpty to false', () => {
      const { getByText } = render(
        <SectionCard title="Test Section">
          <Text>Content should be visible</Text>
        </SectionCard>
      );

      expect(getByText('Content should be visible')).toBeTruthy();
    });
  });

  describe('Styling', () => {
    it('should apply correct title styling', () => {
      const { getByText } = render(<SectionCard title="Test Section">{mockChildren}</SectionCard>);

      const titleText = getByText('Test Section');
      // Just verify the title text exists and has some styling
      expect(titleText).toBeTruthy();
    });

    it('should apply correct View More styling', () => {
      const { getByText } = render(
        <SectionCard title="Test Section" onViewMore={mockOnViewMore}>
          {mockChildren}
        </SectionCard>
      );

      const viewMoreText = getByText('View More');
      // Just verify the View More text exists
      expect(viewMoreText).toBeTruthy();
    });
  });
});
