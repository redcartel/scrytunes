import React, {useState, useEffect} from 'react'

const Player = ({rowY, bounds})=>{
  return (
    <div style={rowY ? {
      position: 'absolute',
      top: 0,
      left: 0,
      height: rowY, 
      width: '100vw'
    } : {}} >
    <audio controls />
  </div>
  );
}

export default Player
