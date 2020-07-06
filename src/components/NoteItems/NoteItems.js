import React, {memo} from "react"
import NoteItem from "./NoteItem/NoteItem"
import classes from "./NoteItems.module.css"

const noteItems = props => {
  const jsxNotes = props.notes.map(note => {
    return <NoteItem 
    leftClicked={(event) => props.showContext(event, "note", note.id)}
    active={note.id === props.current}
    key={note.id}
    clicked={() => props.select(note.id)}
    title={note.title}
    content={note.content}
    date={note.date}
    />
  })

  return (
    <ul className={classes.NoteItems}>
      {jsxNotes}
    </ul>
  )
}

export default memo(noteItems)
