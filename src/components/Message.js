import React from 'react'

import Loader from './Loader'
import firebase from '../decorators/firebase'

@firebase({
  loader: <Loader>Loading message...</Loader>,

  subscribeTo: {
    message(props) {
      return `messages/${props.id}`
    }
  }
})

export default class Message extends React.Component {
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
