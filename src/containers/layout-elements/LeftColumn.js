import React, { useState, useEffect } from 'react'
import isDev from 'electron-is-dev'

const bgColor = '#eeeeee'

const LeftColumn = ({ children }) => {
  return (
    <div
      className='LeftColumn'
      style={{
        backgroundColor: bgColor,
        width: 200,
        float: 'left',
        height: '100vw'
      }}
    >
      {children}
    </div>
  )
}

export default LeftColumn
