import React, { useState, useEffect } from 'react'
import Player from '../../components/Player'
import TrackList from '../../components/TrackList'
import isDev from 'electron-is-dev'

const bgColor = isDev ? 'blue' : 'white'

const RightColumn = ({ bounds, colX, setColX }) => {
  const [style, setStyle] = useState({})
  const [resizeStyle, setResizeStyle] = useState({})
  const [resizeDiv, setResizeDiv] = useState(null)
  
  const initDrag = (rDiv) => {
    let startX = colX

    function doDrag(e) {
      setColX(e.x)
    }

    function stopDrag(e) {
      rDiv.removeEventListener('mousemove', doDrag, false)
      rDiv.removeEventListener('mouseup', startDrag, false)
    }

    function startDrag(e) {
      console.log("go!")
    }

    rDiv.addEventListener('dragstart', doDrag, false)
    rDiv.addEventListener('drag', doDrag, false)
    rDiv.addEventListener('dragend', doDrag, false)
  }

  useEffect(() => {
    if (bounds) {
      setStyle({
        left: colX + 5,
        top: bounds.y,
        width: bounds.width - colX - 5,
        height: bounds.height
      })
      setResizeStyle({
        left: colX,
        top: 0,
        width: 5,
        height: bounds.height
      })
    } else {
      setStyle({
        left: 205,
        top: 0,
        width: 1000,
        height: '100vh'
      })
    }
    if (!resizeDiv) {
      const element = window.document.getElementById('resizeBorder')
      if (element) {
        setResizeDiv(element)
        initDrag(element)
      }
    }
  }, [bounds, colX, resizeDiv])

  useEffect(() => {}, [])

  return (
    <>
    <div
      className='RightColumn'
      style={
        style.width ? 
          {
        ...style,
        backgroundColor: bgColor,
        position: 'absolute'
      } : {}}
    >
      <Player bounds={bounds} rowY={100}/>
      <TrackList bounds={bounds} rowY={100}/>
    </div>
      <div
        className='resizeBorder'
        id='resizeBorder'
        style={
          resizeStyle.width ?
          {
          ...resizeStyle,
          cursor: 'ew-resize',
          backgroundColor: 'black',
          position: 'absolute',
          draggable: true
        } : {}}></div>
    </>
  )
}

export default RightColumn
