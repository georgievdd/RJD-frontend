import React from 'react'
import './cinput.css';
import { InputLabel } from '@mantine/core';

const Input = (props) => {
  return (
    <div>
      <InputLabel>{props.label}</InputLabel>
      <input 
        {...props}
        className='cinput'
      />
    </div>
  )
}

export default Input;