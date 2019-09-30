import React, { useState, useEffect, useLayoutEffect} from 'react'
import isDev from 'electron-is-dev'
import LeftColumn from './layout-elements/LeftColumn'
import RightColumn from './layout-elements/RightColumn'

const bgColor = isDev ? 'green' : 'white'
const maxColX = 300
const minColX = 100
const colXRatio = .2

const NewLayout = ({ bounds }) => {
  const [divBounds, setDivBounds] = useState({})
  const [layoutDiv, setLayoutDiv] = useState(null)
  const [colX, setColX] = useState(null)

  const checkBounds = () => {
    if (layoutDiv) {
      const layoutBounds = {
        x: layoutDiv.clientLeft,
        y: layoutDiv.clientTop,
        width: layoutDiv.clientWidth,
        height: layoutDiv.clientHeight
      }
      if (
        divBounds.x !== layoutBounds.x ||
        divBounds.y !== layoutBounds.y ||
        divBounds.width !== layoutBounds.width ||
        divBounds.height !== layoutBounds.height
      ) {
        setDivBounds(layoutBounds)
        if (!colX) {
          let nColX = colXRatio * layoutBounds.width
          if (nColX > maxColX) {
            nColX = maxColX
          } else if (nColX < minColX) {
            nColX = minColX 
          }
          setColX(nColX)
        }
      }
    }
  }

  useLayoutEffect(() => {
    if (!layoutDiv) {
      setLayoutDiv(window.document.getElementById('Layout'))
    } else {
      setTimeout(checkBounds, 10)
      setTimeout(checkBounds, 100)
    }
  })

  const colProps = {bounds: divBounds, colX: colX, setColX: setColX}

  return (
  <div
    className='Layout'
    id='Layout'
    style={{
    position: 'relative',
    backgroundColor: bgColor,
    height: '100vh',
    width: '100vw',
    overflow: 'hidden'
    }}
    >
    <LeftColumn {...colProps} />
    <RightColumn {...colProps} />
  </div>
    )
  }

export default NewLayout
