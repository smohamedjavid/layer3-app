// React Native imports
import { StyleSheet, Text as RNText, type TextProps } from 'react-native';

// Local imports
import { COLORS } from '../constants/config';

export type AppTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function AppText({ style, type = 'default', ...rest }: AppTextProps) {
  return (
    <RNText
      style={[
        { color: COLORS.text, fontSize: 12 },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    lineHeight: 20,
  },
  defaultSemiBold: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  link: {
    color: COLORS.primary,
    fontSize: 16,
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 28,
  },
});
