"use client";
import React from 'react';
import PropTypes from 'prop-types';
import './AppButton.css';

const AppButton = ({
  label,
  color,
  rounded = false,
  variant = 'primary',
  style = {},
  colorClass,
  ...props
}) => {
  const classNames = [
    'app-button',
    colorClass,
    rounded ? 'app-button--rounded' : '',
    variant === 'primary' ? 'app-button--primary' : 'app-button--secondary',
  ].join(' ');

  const buttonStyle = {
    backgroundColor: color,
    ...style,
  };

  return (
    <button
      {...props}
      className={classNames}
      style={buttonStyle}
    >
      {label}
    </button>
  );
};

export default AppButton;
