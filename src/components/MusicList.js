import React from 'react'

export default function MusicList({songs, playSong}) {
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

  const rows = songs.map((path, i)=>
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
