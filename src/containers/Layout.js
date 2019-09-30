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
import { app } from 'electron'
import fs from 'fs'
import dataurl from 'dataurl'
import storage from 'electron-json-storage'

export default function (props) {
  const [files, updateFiles] = useState([])
  const [songData, updateSongData] = useState('data:')

  storage.getAll((error, data) => console.log('getAll', error, data))

  /*
  storage.set('songs', ['ok'], (error, data)=>{
    console.log('set', error, data)
  })
  */

  const loadSongs = () => {
    storage.get('songs', (error, data) => {
      console.log('loadSongs', error, data)
      if (data !== undefined && data.length !== undefined) {
        console.log('loadSongs loaded data')
        updateFiles(data)
      } else {
        console.log('new songlist')
        storage.set('songs', [])
      }
    })
  }

  const addSongs = paths => {
    console.log('addSongs paths', paths)
    console.log('addSongs files', files)
    storage.get('songs', (error, files) => {
      console.log('addSongs', files)
      const newFileList = [...files, ...paths]
      updateFiles(newFileList)
      storage.set('songs', newFileList)
    })
  }

  const playSong = filePath => {
    const songProm = new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(dataurl.convert({ data, mimetype: 'audio/mp3' }))
      })
    })
    songProm.then(durl => {
      console.log(durl)
      updateSongData(durl)
    })
  }

  const PlayerArea = (
    <div className="PlayerArea">
      <div style={{ textAlign: 'center' }}>
        <h1>ScryTunes Media Player</h1>
        <audio src={songData} controls='yes' id='AudioPlayer' />
      </div>
    </div>
  )

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
