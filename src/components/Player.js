import React, {useState, useEffect} from 'react'
import TopControls from './TopControls'

const Player = ({songData, activeProfile})=>{
  return (
    <div className="Player">
      <div style={{ textAlign: 'center' }}>
        <h1>ScryTunes Media Player: {activeProfile}</h1>
        <audio src={songData} controls='yes' id='AudioPlayer' />
      </div>
    </div>
  );
}

export default Player
