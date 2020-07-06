import React from "react" 
import classes from "./ContextMenu.module.css"

const contextMenu = props => {
  const jsxOptions = props.options.map((option, index) => {
    return (
      <li 
        onClick={() => props.optionHandler(option.name)}
        key={index}
        className={classes.ContextMenuItem}
        >{option.name}</li>
    )
  })

  const classNames = [classes.ContextMenu]

  if (!props.show) {
    classNames.push(classes.Hide)
  } else {
    document.addEventListener("click", () => {
      props.closed()
    })
  }

  return (
    <div className={classNames.join(" ")} style={{top: props.y, left: props.x}}>
      <ul className={classes.ContextMenuItems}>
        {jsxOptions}
      </ul>
    </div>
  )
}

export default contextMenu
