import React from "react"
import NoteItem from "./NoteItem/NoteItem"
import classes from "./NoteItems.module.css"

const noteItems = props => {
  const jsxNotes = props.notes.map((note, index) => {
    return <NoteItem 
    key={index}
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

export default noteItems
