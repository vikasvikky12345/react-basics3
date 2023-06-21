import React from 'react';

import input from './Button.module.css';

const Button = (props) => {
  return (
    <button
      className={input.button}
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;