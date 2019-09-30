import React from 'react'
import { Button } from 'react-bootstrap'

const { dialog } = require('electron').remote

export default function TopControls (props) {

  const { loadSongs, addSongs } = props.funcs

  const loadFilesMenu = event => {
    event.preventDefault()
    const files = dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections']
    })
    if (files) {
      addSongs(files)
    }

    /*
              storage.get('songs', (error, songs) => {
                const oldSongs = songs.length !== undefined ? songs : []
                const newSongList = [...oldSongs, ...files]
                this.setState({fileList: newSongList})
                storage.set('songs', {songlist:newSongList})
              })
              */
  }

  return (
    <div className='TopContainer' style={{ paddingBottom: '20px' }}>
      <button onClick={loadFilesMenu}>Load Files</button>
      <button onClick={() => null}>Load Directory</button>
      <button onClick={() => loadSongs()}>Log JSON</button>
    </div>
  )
}
