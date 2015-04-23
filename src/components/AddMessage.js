import React from 'react'

import actions from '../actions'

export default class AddMessage extends React.Component {
  constructor() {
    this.state = {
      name: '',
      message: ''
    }
  }

  onInputChange(key, e) {
    let changes = {}

    changes[key] = e.currentTarget.value

    this.setState(changes)
  }

  onSubmit(e) {
    e.preventDefault()

    const {name, message} = this.state

    if(name && message) {
      actions.message.add({
        name: name,
        message: message
      })

      this.setState({
        message: ''
      })
    }
  }

  render() {
    const {name, message} = this.state

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={this.onInputChange.bind(this, 'name')} />
        </div>

        <div>
          <input
            type="text"
            value={message}
            placeholder="Message"
            onChange={this.onInputChange.bind(this, 'message')} />
        </div>

        <input type="submit" value="Add message" disabled={!(name && message)} />
      </form>
    )
  }
}