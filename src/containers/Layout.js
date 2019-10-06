import React, { useState } from 'react'
// import MyComp from './MyComp';
import MusicList from '../components/MusicList'
import TopControls from '../components/TopControls'

  /*
const { dialog } = require('electron').remote
const fs = require('fs')
const dataurl = require('dataurl')
const storage = require('electron-json-storage')
  */

// import { dialog } from 'electron'

export default function (props) {

  return (
    <div className='Layout'>
          {PlayerArea}
            <TopControls
              funcs={{
                loadSongs,
                addSongs
              }}
            />
            <MusicList songs={files} playSong={playSong}/>
    </div>
  )
}
