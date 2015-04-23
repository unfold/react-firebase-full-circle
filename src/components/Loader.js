import React from 'react'

export default class Loader extends React.Component {
  render() {
    return <div>{this.props.children || 'Loading'}</div>
  }
}