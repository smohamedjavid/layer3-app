const React = require('react');

const mockComponent = (name) => {
  return React.forwardRef((props, ref) => {
    const { children, ...otherProps } = props;
    return React.createElement(name, { ...otherProps, ref }, children);
  });
};

module.exports = {
  View: mockComponent('View'),
  Text: mockComponent('Text'),
  TouchableOpacity: mockComponent('TouchableOpacity'),
  ActivityIndicator: mockComponent('ActivityIndicator'),
  StyleSheet: {
    create: (styles) => styles,
    flatten: (styles) => styles,
  },
  Platform: {
    OS: 'ios',
    select: (obj) => obj.ios || obj.default,
  },
  Dimensions: {
    get: () => ({ width: 375, height: 667 }),
  },
  Alert: {
    alert: jest.fn(),
  },
};
