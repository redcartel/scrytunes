import React, {useState} from 'react'
import TopControls from '../../components/TopControls'
import MusicList from '../../components/MusicList'
import Player from '../../components/Player'
import fs from 'fs'
import dataurl from 'dataurl'
import storage from 'electron-json-storage'

const genStorage = () => {
  storage.set('scryTunes', {
    'profiles': {
      'default': {
        'library': [],
        'playlists': {
          'first': [],
          'second': []
        }   
      },
    },
    'settings': {
    }
  })

  storage.set('scryTunesFiles', [
  ])
}

const logStorage = () => {
  console.log(storage.get('scryTunes', (e,d)=>{console.log(d)}))
  console.log(storage.get('scryTunesFiles', (e,d)=>{console.log(d)}))
}

const getScryTunesFiles = (callBack) => {
  storage.get('scryTunesFiles', (error,data)=>callBack(data,error))
}

const filesDict = (paths) => {
  const newDict = {}
  for (let path of paths) {
    const stat = fs.statSync(path)
    newDict[stat.ino] = {path: path, tags: {title: "a song", artist: "an artist"}}
  }
  return newDict
}

//const makeFile = (path)

const MainInterface = ({profile})=>{
  const [files, updateFiles] = useState([])
  const [songData, updateSongData] = useState('data:')

  const playlist = null // should be a prop from above

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

  const addLibraryFiles = (loadedFiles) => {
    storage.get('scryTunes', (error, stData)=>{
      const newLibrary = stData.profiles[profile]['library'];
      for (let inode in loadedFiles) {
        newLibrary.push(inode)
        console.log(inode)
      }
      stData.profiles[profile]['library'] = newLibrary
      storage.set('scryTunes', stData)
    })
  }

  const addSongs = (paths, profile) => {
    getScryTunesFiles(oldFiles=>{
      const loadedFiles = filesDict(paths)
      console.log(loadedFiles)
      const newFiles = {...oldFiles, ...loadedFiles}
      storage.set('scryTunesFiles', newFiles, (error)=>{
        addLibraryFiles(loadedFiles)
      })
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

  const playerProps = {songData, profile}
  const topControlProps = {loadSongs, addSongs, songData, genStorage, logStorage, profile}
  const musicListProps = {playSong, playlist, profile}

  return (
    <div className="MainInterface" style={{width: '100vw', height: '100vh'}}>
      <Player {...playerProps} />
      <TopControls {...topControlProps} />
      <MusicList {...musicListProps} />
    </div>
  )
}

export default MainInterface
