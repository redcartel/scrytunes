import React from 'react'

const RightColumn = ({children}) => {
  return (
    <div
      className='RightColumn'
      style={{
      backgroundColor: 'inherit',
      overflow: 'hidden'
      }}
    >
      {children}
    </div>
  )
}

export default RightColumn
