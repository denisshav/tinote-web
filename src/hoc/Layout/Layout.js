import React, { Component } from "react"

class Layout extends Component {
  render() {
    return (
      <>
        <main style={{ height: "100%" }}>{this.props.children}</main>
      </>
    )
  }
}

export default Layout
