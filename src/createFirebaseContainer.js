import React from 'react'
import Firebase from 'firebase'
import difference from 'lodash/array/difference'
import mapValues from 'lodash/object/mapValues'
import forEach from 'lodash/collection/forEach'

const ref = new Firebase('https://react-full-circle.firebaseio.com/')

export default function createFirebaseContainer(Component, params) {
  return class extends React.Component {
    onValue(key, snapshot) {
      let changes = {}
      const value = snapshot.val()

      changes[key] = value

      console.log('Got value for', key, value)

      this.setState(changes)
    }

    subscribe(key, path) {
      const subRef = ref.child(path)
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