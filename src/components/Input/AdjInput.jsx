import React, { useState } from 'react';
import './cinput.css';

const AdjInput = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <label placeholder='whfbwjfvh' contentEditable="true" className='adjinput'>{value}</label>
      <input
        type='text'
        style={{width: 0, height: 0, opacity: 0}}
        value={value}
        onChange={e => onChange(e)}
      />
    </div>
  )
}

export default AdjInput