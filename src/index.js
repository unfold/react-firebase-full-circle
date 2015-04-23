import React from 'react'

import Feed from './components/Feed'

class App extends React.Component {
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

        {this.state.show && <Feed />}
      </div>
    )
  }
}

window.addEventListener('load', () => {
  React.render(<App />, document.body)
})