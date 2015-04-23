import React from 'react'
import map from 'lodash/collection/map'

import Loader from './Loader'
import Message from './Message'
import AddMessage from './AddMessage'
import createFirebaseContainer from '../createFirebaseContainer'

class Feed extends React.Component {
  render() {
    const items = map(this.props.feed, (value, key) => {
      return <Message key={key} id={key} />
    })

    return (
      <div>
        {items}
        <AddMessage />
      </div>
    )
  }
}

export default createFirebaseContainer(Feed, {
  loader: <Loader>Loading feed...</Loader>,

  subscribeTo: {
    feed(props) {
      return `feed`
    }
  }
})