import React from 'react'

export default class Loader extends React.Component {
  render() {
    return <p>{this.props.children || 'Loading'}</p>
  }
}