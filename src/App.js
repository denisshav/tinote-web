import React from "react"
import Layout from "./hoc/Layout/Layout"
import Tinote from "./containers/Tinote/Tinote"
import { Switch, Route } from "react-router-dom"
import Auth from "./containers/Auth/Auth"

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/tinote" component={Tinote} />
        <Route path="/" component={Auth} />
      </Switch>
    </Layout>
  )
}

export default App
