import React from 'react'
import LeftColumn from './layout-elements/LeftColumn'
import RightColumn from './layout-elements/RightColumn'
import MainInterface from './layout-elements/MainInterface'

const bgColor = "inherit"

const ViewPort = ({profile, playlist}) => {

  return (
  <div
    className='ViewPort'
    id='Layout'
    style={{
    position: 'relative',
    backgroundColor: bgColor,
    height: '100vh',
    width: '100vw',
    overflow: 'hidden'
    }}
    >
      <LeftColumn>
        <div className="leftControls">hello</div>
      </LeftColumn>
      <RightColumn>
        <MainInterface profile={profile} playlist={playlist}/>
      </RightColumn>
  </div>
    )
  }

export default ViewPort
