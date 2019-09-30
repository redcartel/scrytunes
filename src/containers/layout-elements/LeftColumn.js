import React, {useState, useEffect} from 'react'
import isDev from 'electron-is-dev'

const bgColor = isDev ? 'red' : 'inherit'

const LeftColumn = ({bounds, colX}) => {
  const [style, setStyle] = useState({})

  useEffect(()=>{
    if (bounds) {
      setStyle({
        left: bounds.x,
        top: bounds.y,
        width: colX,
        height: bounds.height
      })
    }
  }, [bounds, colX])

  return (
  <div className="LeftColumn" style={{
    ...style,
    backgroundColor: bgColor,
    position: 'absolute'
  }}>
  
  </div>
  )
}

export default LeftColumn
