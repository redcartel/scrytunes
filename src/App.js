import React, {useState, useEffect} from 'react';
import NewLayout from './containers/NewLayout'

//import fs from 'fs';
import { remote } from 'electron';
import isDev from 'electron-is-dev';

function App() {
  const [bounds, setBounds] = useState([0,0,0,0])
  const [activeProfile, setActiveProfile] = useState("default")

  const updateBounds = () => {
    const nBounds = remote.getCurrentWindow().webContents.getOwnerBrowserWindow().getBounds()
    setBounds(nBounds)
  }

  useEffect(()=>{
    remote.getCurrentWindow().addListener('resize', (event)=>{
      updateBounds()
    });
    updateBounds()
  },[])

  // console.log(bounds)

  const layoutProps = {activeProfile, setActiveProfile}

  return (
    <>
      <NewLayout bounds={bounds} {...layoutProps} />
    </>
  );
}

export default App;
