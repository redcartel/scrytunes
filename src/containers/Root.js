import React from 'react'
import {withRouter} from 'react-router-dom'
import ViewPort from './ViewPort.js'
import log from '../log'

class Root extends React.Component {
  render() {

    log('Root', this.props)

    const viewPortProps = {
      profile: this.props.profile, 
      playlist: this.props.playlist
    }

    return (
      <ViewPort {...viewPortProps} />
    );
  }
}

export default withRouter(Root);
