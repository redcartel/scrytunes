import React, {useEffect, useState} from 'react'
import storage from 'electron-json-storage'
import log from '../log.js'

const getPaths = (profile, playlist, callback) => {
  log("MusicList", profile, playlist)
  if (profile) {
    const getPlaylist = playlist || 'library'
    storage.getMany(['scryTunes', 'scryTunesFiles'], (err, data)=>{
      const files = data.scryTunesFiles
      const paths = data.scryTunes.profiles[profile][getPlaylist].map(node=>files[node]['path'])
      callback(paths)
    })
  }
}

export default function MusicList({files, playSong, profile, playlist}) {

  const [paths, setPaths] = useState([]) 

  useEffect(()=>{
    getPaths(profile, playlist, paths=>{setPaths(paths)})
  }, [profile])
  
  const rows = paths.map((path, i)=>
  <tr key={i} onDoubleClick={(event)=>playSong(path)}>
    <td>{i}</td>
    <td>{path}</td>
    <td>Some Band</td>
    <td>Some Album</td>
  </tr>
  );

  const header = <tr>
    <td>#</td>
    <td>Title</td>
    <td>Artist</td>
    <td>Album</td>
  </tr>

  return (
    <div className='MusicList' style={{overflow: 'scroll', position: 'relative', bottom: '0px'}}>
      <table striped="true" bordered="true" hover="true">
        <thead>
          {header}
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}
