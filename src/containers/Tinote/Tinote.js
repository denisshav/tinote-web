import React, {Component} from "react"

import classes from "./Tinote.module.css"
import Menu from "../../components/Menu/Menu"
import Explorer from "./Explorer/Explorer"
import NoteEditor from "./NoteEditor/NoteEditor"


class Tinote extends Component {
  state = {}

  render() {
    return (
      <div className={classes.Tinote}>
        <div className={classes.Wrapper}>
          <Menu />
          <Explorer />
        </div>
          <NoteEditor />
      </div>
    )
  }

}

export default Tinote
