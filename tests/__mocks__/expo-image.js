const React = require('react');

const Image = React.forwardRef((props, ref) => {
  const { source, style, ...otherProps } = props;
  return React.createElement('img', {
    ...otherProps,
    ref,
    src: typeof source === 'object' ? source.uri : source,
    style,
  });
});

module.exports = {
  Image,
};
