import React, {Component} from "react"

import NoteItems from "../../../components/NoteItems/NoteItems"
import FolderItems from "../../../components/FolderItems/FolderItems"
import classes from "./Explorer.module.css"

class Explorer extends Component {
  state = {
    folders: [
      {
        icon: "folder",
        color: "#ccc",
        name: "folder 1"
      },
      {
        icon: "folder",
        color: "yellow",
        name: "folder 2"
      }
    ],
    notes: [
      {
        title: "Note 1",
        content: "Simple content note 1",
        date: "1 min ago"
      },
      {
        title: "Note 2",
        content: "Simple content note 2",
        date: "5 min ago"
      },
      {
        title: "Note 3",
        content: "Simple content note 3",
        date: "10 min ago"
      }
    ]
  }

  render() {
    return (
      <div className={classes.Explorer}>
        <FolderItems folders={this.state.folders}/>
        <NoteItems notes={this.state.notes}/>
      </div>
    )
  }
}

export default Explorer
