import React from 'react'
import Firebase from 'firebase'
import difference from 'lodash/array/difference'
import mapValues from 'lodash/object/mapValues'
import forEach from 'lodash/collection/forEach'

let ref = new Firebase('https://react-full-circle.firebaseio.com/')

function createFirebaseContainer(Component, params) {
  return class extends React.Component {
    onValue(key, snapshot) {
      let changes = {}
      const value = snapshot.val()

      changes[key] = value

      console.log('Got value for', key, value)

      this.setState(changes)
    }

    subscribe(key, path) {
      let subRef = ref.child(path)
      const onValue = this.onValue.bind(this, key)

      console.log('Subscribing to', path)

      subRef.on('value', onValue)

      return {
        unsubscribe() {
          console.log('Unsubscribing from', path)
          subRef.off('value', onValue)
        }
      }
    }

    componentDidMount() {
      this.subscriptions = mapValues(params.subscribeTo, (getPath, key) => {
        return this.subscribe(key, getPath(this.props))
      })
    }

    componentWillUnmount() {
      forEach(this.subscriptions, subscription => {
        subscription.unsubscribe()
      })
    }

    render() {
      const stateKeys = Object.keys(this.state || {})
      const subscribeToKeys = Object.keys(params.subscribeTo)
      const loading = difference(subscribeToKeys, stateKeys)

      if(loading.length) {
        return params.loader
      }

      return React.createElement(Component, this.state)
    }
  }
}

class Api {
  static Message(id) {
    return `messages/${id}`
  }
}

class Loader extends React.Component {
  render() {
    return <div>Loading</div>
  }
}

class MessageComponent extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.message.name}</div>
        <div>{this.props.message.description}</div>
      </div>
    )
  }
}

const Message = createFirebaseContainer(MessageComponent, {
  loader: <Loader />,

  subscribeTo: {
    message(props) {
      return Api.Message(props.id)
    }
  }
})

class MessageList extends React.Component {
  constructor() {
    super()

    this.state = {
      show: true
    }
  }

  toggleShow() {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const toggleLabel = this.state.show ? 'Hide' : 'Show'

    return (
      <div>
        <div>
          Message list
          <button onClick={this.toggleShow.bind(this)}>{toggleLabel}</button>
        </div>

        {this.state.show && <Message id="0" />}
      </div>
    )
  }
}

window.addEventListener('load', () => {
  React.render(<MessageList />, document.body)
})