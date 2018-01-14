import React from 'react'
import Async from './Async'
import onImageReady from '~/utils/onImageReady'

class OnImageReady extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (this.props.src !== nextProps.src || this.props.view !== nextProps.view)
  }
  render () {
    const { src, view } = this.props
    return (
      <Async
        call={() => onImageReady(src)}
        view={view}
      />
    )
  }
}

export default OnImageReady
