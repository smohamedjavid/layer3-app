import React from 'react';
import { render } from '@testing-library/react-native';
import { AppText } from '../../src/components/AppText';

describe('AppText', () => {
  it('should render with default styling', () => {
    const { getByText } = render(<AppText>Test Text</AppText>);
    const textElement = getByText('Test Text');

    expect(textElement).toBeTruthy();
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: expect.any(String), fontSize: 12 }),
        expect.objectContaining({ fontSize: 14, lineHeight: 20 }),
      ])
    );
  });

  it('should render with title type', () => {
    const { getByText } = render(<AppText type="title">Title Text</AppText>);
    const textElement = getByText('Title Text');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontSize: 28, fontWeight: 'bold', lineHeight: 28 }),
      ])
    );
  });

  it('should render with subtitle type', () => {
    const { getByText } = render(<AppText type="subtitle">Subtitle Text</AppText>);
    const textElement = getByText('Subtitle Text');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ fontSize: 18, fontWeight: 'bold' })])
    );
  });

  it('should render with defaultSemiBold type', () => {
    const { getByText } = render(<AppText type="defaultSemiBold">Semi Bold Text</AppText>);
    const textElement = getByText('Semi Bold Text');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontSize: 14, lineHeight: 20, fontWeight: '600' }),
      ])
    );
  });

  it('should render with link type', () => {
    const { getByText } = render(<AppText type="link">Link Text</AppText>);
    const textElement = getByText('Link Text');

    expect(textElement.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ lineHeight: 30, fontSize: 16 })])
    );
  });

  it('should apply custom styles', () => {
    const customStyle = { color: 'red', fontSize: 20 };
    const { getByText } = render(<AppText style={customStyle}>Custom Text</AppText>);
    const textElement = getByText('Custom Text');

    expect(textElement.props.style).toEqual(expect.arrayContaining([customStyle]));
  });

  it('should pass through other Text props', () => {
    const { getByText } = render(
      <AppText numberOfLines={2} ellipsizeMode="tail">
        Long text that should be truncated
      </AppText>
    );
    const textElement = getByText('Long text that should be truncated');

    expect(textElement.props.numberOfLines).toBe(2);
    expect(textElement.props.ellipsizeMode).toBe('tail');
  });
});
