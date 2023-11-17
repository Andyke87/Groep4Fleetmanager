// eslint-disable-next-line no-unused-vars
import React from 'react'

// eslint-disable-next-line react/prop-types
const TextField = ({name, value, onChange}) => {
  return (
    <div>
      <input type="text" 
      className='txtBox' 
      name={name}
      value={value} 
      onChange={onChange} />
    </div>
  )
}

export default TextField