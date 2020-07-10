import React from "react"
import classes from "./ContextMenu.module.css"

const createSubMenu = (items, optionHandler) => {
  const jsxItems = items.map((item, ind) => {
    return (
      <li
        onClick={() => optionHandler(item.action)}
        key={ind}
        style={{ backgroundColor: item.backgroundColor, color: item.color }}
      >
        {item.icon && <span className="material-icons">{item.icon}</span>}
      </li>
    )
  })

  return <ul className={classes.TableMenu}>{jsxItems}</ul>
}

const contextMenu = props => {
  const jsxOptions = props.options.map((option, index) => {
    if (option.isTable) {
      return (
        <li key={index} className={classes.ContextMenuItem}>
          {option.name}
          {createSubMenu(option.buttons, props.optionHandler)}
        </li>
      )
    } else {
      return (
        <li
          onClick={() => props.optionHandler(option.action)}
          key={index}
          className={classes.ContextMenuItem}
        >
          {option.name}
        </li>
      )
    }
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
    <div
      className={classNames.join(" ")}
      style={{ top: props.y, left: props.x }}
    >
      <ul className={classes.ContextMenuItems}>{jsxOptions}</ul>
    </div>
  )
}

export default contextMenu
