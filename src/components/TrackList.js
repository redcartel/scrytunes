import React, {useState, useEffect} from 'react'

const TrackList = ({rowY, bounds})=>{
  return(
  <div style={rowY ? {
    position: 'absolute',
    top: rowY,
    height: bounds.height - rowY,
    width: '100vw' 
  }:{}}>
    trackList
  </div>
  )
}

export default TrackList
