import React from "react"
import NoteItem from "./NoteItem/NoteItem"
import classes from "./NoteItems.module.css"
import { stripHtml } from "../../shared/utility"
import moment from "moment"

const NoteItems = props => {
  const jsxNotes = props.notes.map(note => {
    return (
      <NoteItem
        leftClicked={event => props.showContext(event, "note", note._id)}
        active={note._id === props.current}
        onRename={props.onEndRename}
        rename={note._id === props.renameId}
        key={note._id}
        clicked={() => props.select(note._id)}
        title={note.title}
        content={stripHtml(note.content.slice(0, 50))}
        date={moment(note.date).fromNow()}
      />
    )
  })

  return <ul className={classes.NoteItems}>{jsxNotes}</ul>
}

export default NoteItems
