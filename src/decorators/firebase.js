import React from 'react'
import Firebase from 'firebase'
import {difference, mapValues, forEach, isString} from 'lodash'

const ref = new Firebase('https://react-full-circle.firebaseio.com/')

export default function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component'
}

export default function firebase(subscriptions, {placeholder = null, required = true} = {}) {
  return function decorator(Component) {
    class Firebase extends React.Component {
      componentDidMount() {
        this.subscriptions = mapValues(subscriptions, (getPath, key) => {
          const path = isString(getPath) ? getPath : getPath(this.props);
          const subscriptionRef = isString(path) ? ref.child(path) : path;

          return this.subscribe(key, subscriptionRef);
        });
      }

      componentWillUnmount() {
        forEach(this.subscriptions, unsubscribe => unsubscribe());
      }

      subscribe(key, subscriptionRef) {
        const onValue = snapshot => {
          this.setState({
            [key]: snapshot.val(),
          });
        };

        subscriptionRef.on('value', onValue);

        return function unsubscribe() {
          subscriptionRef.off('value', onValue);
        };
      }

      render() {
        const stateKeys = Object.keys(this.state || {});
        const subscriptionKeys = Object.keys(subscriptions);
        const pending = difference(subscriptionKeys, stateKeys);

        if (required && pending.length) {
          return placeholder;
        }

        return <Component {...this.props} {...this.state} />;
      }
    }

    Firebase.displayName = `Firebase(${getDisplayName(Component)})`;

    return Firebase;
  };
}
