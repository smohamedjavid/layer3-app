export const formatAddress = (address: string, prefixLength = 4, suffixLength = 3): string => {
  if (!address || address.length < prefixLength + suffixLength) {
    return address;
  }
  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
};

export const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatBalance = (balance: string, decimals: number): string => {
  // Convert balance from smallest unit to actual balance
  const actualBalance = parseFloat(balance) / Math.pow(10, decimals);

  // Format with M/K for large numbers
  if (actualBalance >= 1e6) {
    return (actualBalance / 1e6).toFixed(2) + 'M';
  } else if (actualBalance >= 1e3) {
    return (actualBalance / 1e3).toFixed(2) + 'K';
  } else if (actualBalance >= 1) {
    return actualBalance.toFixed(4);
  } else {
    return actualBalance.toFixed(6);
  }
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
};

export const formatPercent = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${(value || 0).toFixed(2)}%`;
};
