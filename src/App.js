import React from 'react';
import Layout from './hoc/Layout/Layout';
import Tinote from "./containers/Tinote/Tinote"

function App() {
  return (
    <div style={{height: "100%"}}>
      <Layout>
        <Tinote />
      </Layout>
    </div>
  );
}

export default App;
