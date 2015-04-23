import React from 'react'

import Loader from './Loader'
import createFirebaseContainer from '../createFirebaseContainer'

class Message extends React.Component {
  render() {
    const message = this.props.message

    return (
      <div>
        <div>{message.name}</div>
        <div>{message.description}</div>
      </div>
    )
  }
}

export default createFirebaseContainer(Message, {
  loader: <Loader>Loading message...</Loader>,

  subscribeTo: {
    message(props) {
      return `messages/${props.id}`
    }
  }
})