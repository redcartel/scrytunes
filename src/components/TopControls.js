import React from 'react'

const { dialog } = require('electron').remote

export default function TopControls ({loadSongs, addSongs, songData, genStorage, logStorage}) {

  const loadFilesMenu = event => {
    event.preventDefault()
    const files = dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections']
    })
    if (files) {
      addSongs(files)
    }
  }

  return (
    <div className='TopContainer' style={{ paddingBottom: '20px' }}>
      <button onClick={loadFilesMenu}>Load Files</button>
      <button onClick={() => null}>Load Directory</button>
      <button onClick={() => loadSongs()}>Log JSON</button>
      <button onClick={() => genStorage()}>Regenerate Storage</button>
      <button onClick={() => logStorage()}>Log Storage</button>
    </div>
  )
}
