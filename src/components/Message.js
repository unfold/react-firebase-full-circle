import React from 'react'

import Loader from './Loader'
import firebase from '../decorators/firebase'

@firebase({
  message: ({id}) => `messages/${id}`
}, {
  placeholder: <Loader>Loading message...</Loader>
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
