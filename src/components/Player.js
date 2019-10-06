import React from 'react'

const Player = ({songData, activeProfile})=>{
  return (
    <div className="Player">
      <div style={{ textAlign: 'center' }}>
        <h1>scryTunes Media Player: {activeProfile}</h1>
        <audio src={songData} controls='yes' id='AudioPlayer' />
      </div>
    </div>
  );
}

export default Player
