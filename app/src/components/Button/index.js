import React from 'react';
import PropTypes from 'prop-types';
import { Button as ElementsButton } from 'react-native-elements';
import { COLORS } from '../../constants';

const Button = ({ fullWidth, gutterTop, ...props }) => (
  <ElementsButton
    {...props}
    type="solid"
    buttonStyle={{
      backgroundColor: COLORS.buttonBackground,
    }}
    titleStyle={{
      color: COLORS.buttonTextColor,
    }}
    containerStyle={{
      paddingTop: gutterTop ? 15 : 0,
      marginHorizontal: fullWidth ? 0 : '25%',
    }}
  />
);

Button.defaultProps = {
  fullWidth: false,
  gutterTop: false,
};

Button.propTypes = {
  fullWidth: PropTypes.bool,
  gutterTop: PropTypes.bool,
};

export default Button;
