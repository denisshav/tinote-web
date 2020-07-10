import React, { Component } from "react"

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <main style={{ height: "100%" }}>{this.props.children}</main>
      </React.Fragment>
    )
  }
}

export default Layout
