import React from "react"
import NoteItem from "./NoteItem/NoteItem"
import classes from "./NoteItems.module.css"
import { stripHtml } from "../../shared/utility"
import moment from "moment"

const NoteItems = props => {
  // const docRefRename = React.createRef()

  // useEffect(() => {
  //   if(docRefRename && props.renameNoteId) {
  //     console.log(123)
  //     docRefRename.current.focus()
  //   }
  // })

  let options = {}
  const jsxNotes = props.notes.map(note => {
    options = {}
    // console.log(props.renameNoteId)
    // if (note.id === props.renameNoteId) {
    //   options = {
    //     onKeyPress: props.onRename,
    //     onBlur: props.onRename,
    //     ref: docRefRename
    //   }
    // }
    return (
      <NoteItem
        leftClicked={event => props.showContext(event, "note", note.id)}
        active={note.id === props.current}
        options={options}
        key={note.id}
        clicked={() => props.select(note.id)}
        title={note.title}
        content={stripHtml(note.content.slice(0, 50))}
        date={moment(note.date).fromNow()}
      />
    )
  })

  return <ul className={classes.NoteItems}>{jsxNotes}</ul>
}

export default NoteItems
