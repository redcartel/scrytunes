import React, {useEffect, useState} from 'react'

import storage from 'electron-json-storage'

const getPaths = (profile, playlist, callback) => {
  storage.getMany(['scryTunes', 'scryTunesFiles'], (err, data)=>{
    const files = data.scryTunesFiles
    const paths = data.scryTunes.profiles[profile]['library'].map(node=>files[node]['path'])
    callback(paths)
  })
}

export default function MusicList({files, playSong, activeProfile, playlist}) {

  const [paths, setPaths] = useState([]) 

  useEffect(()=>{
    getPaths(activeProfile, null, paths=>{setPaths(paths)})
  }, [activeProfile])

  /*
  const songs = [
    {'title': 'All Together Now', 'artist': 'The Beatles', 'track': 8, 'album': 'Yellow Submarine'},
    {'title': 'Ceremony', 'artist': 'New Order', 'track': 1, 'album': 'Substance'},
    {'title': 'Loser', 'artist': 'Bectk', 'track': 6, 'album': 'Mellow Gold'}
  ]
  */

  /*
  const rows = songs.map((tags, i)=>
  <tr key={i}>
      <td>{tags.track}</td>
      <td>{tags.title}</td>
      <td>{tags.artist}</td>
      <td>{tags.album}</td>
    </tr>);
    */
  
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
      <table striped bordered hover>
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
