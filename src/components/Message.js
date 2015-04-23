import React from 'react'

import Loader from './Loader'
import createFirebaseContainer from '../createFirebaseContainer'

class Message extends React.Component {
  render() {
    const message = this.props.message

    return (
      <p>
        <strong>{message.name}:</strong><br />
        {message.message}
      </p>
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