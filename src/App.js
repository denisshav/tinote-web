import React from "react"
import Layout from "./hoc/Layout/Layout"
import Tinote from "./containers/Tinote/Tinote"
import { Switch, Route, Redirect } from "react-router-dom"
import Auth from "./containers/Auth/Auth"

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/tinote" component={Tinote} />
        <Redirect to="/auth" />
      </Switch>
    </Layout>
  )
}

export default App
