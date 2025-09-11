export const API_CONFIG = {
  /**
   * IMPORTANT: The API keys below are for demonstration purposes only.
   * Usually, you would want to keep API keys secure and not hard-code them in your source code (prod js-bundle).
   * environment variables are not secure as it injects them as plain text, consider using a proxy backend.
   *
   * COVALENT_API_KEY: Your Covalent API key for accessing blockchain data.
   * ALCHEMY_API_KEY: Your Alchemy API key for accessing NFT data.
   *
   */
  COVALENT_API_KEY: '<COVALENT_API_KEY>',
  ALCHEMY_API_KEY: '<ALCHEMY_API_KEY>',
  COVALENT_BASE_URL: 'https://api.covalenthq.com/v1',
} as const;

export const COLORS = {
  primary: '#0a7ea4',
  background: '#f9f9f9',
  backgroundSecondary: '#f0f0f0ff',
  surface: '#ffffff',
  text: '#11181C',
  textSecondary: '#666666',
  textMuted: '#999999',
  border: '#e0e0e0',
  error: '#ff6b6b',
  success: '#51cf66',
  warning: '#ffd43b',
} as const;

export const API_ENDPOINTS = {
  USERS: 'https://layer3.xyz/api/assignment/users',
} as const;

export const UI_CONSTANTS = {
  BORDER_RADIUS: 12,
  PADDING: 16,
  MARGIN: 8,
  SHADOW_OPACITY: 0.1,
  SHADOW_RADIUS: 4,
} as const;
