export const initialFolder = {
  name: "New Folder",
  color: "#ccc",
  icon: "folder"
}

export const initialNote = {
  content: "",
  date: "Not provided",
  title: "New Note"
}

export const TRASH_ID = "TRASH"
export const UNSORTED_ID = "UNSORTED"
export const ALL_NOTES_ID = "ALL_NOTES"

export const folderOptions = [
  {
    name: "Rename",
    action: "Rename"
  },
  {
    name: "Delete",
    action: "Delete"
  },
  {
    isTable: true,
    name: "Colors",
    buttons: [
      {
        backgroundColor: "#1abc9c",
        action: {backgroundColor: "#1abc9c"}
      },
      {
        backgroundColor: "#2ecc71",
        action: {backgroundColor: "#2ecc71"}
      },
      {
        backgroundColor: "#3498db",
        action: {backgroundColor: "#3498db"}
      },
      {
        backgroundColor: "#9b59b6",
        action: {backgroundColor: "#9b59b6"}
      },
      {
        backgroundColor: "#34495e",
        action: {backgroundColor: "#34495e"}
      },
      {
        backgroundColor: "#16a085",
        action: {backgroundColor: "#16a085"}
      },
      {
        backgroundColor: "#27ae60",
        action: {backgroundColor: "#27ae60"}
      },
      {
        backgroundColor: "#2980b9",
        action: {backgroundColor: "#2980b9"}
      },
      {
        backgroundColor: "#8e44ad",
        action: {backgroundColor: "#8e44ad"}
      },
      {
        backgroundColor: "#2c3e50",
        action: {backgroundColor: "#2c3e50"}
      },
      {
        backgroundColor: "#f1c40f",
        action: {backgroundColor: "#f1c40f"}
      },
      {
        backgroundColor: "#e67e22",
        action: {backgroundColor: "#e67e22"}
      },
      {
        backgroundColor: "#e74c3c",
        action: {backgroundColor: "#e74c3c"}
      },
      {
        backgroundColor: "#ecf0f1",
        action: {backgroundColor: "#ecf0f1"}
      },
      {
        backgroundColor: "#95a5a6",
        action: {backgroundColor: "#95a5a6"}
      },
      {
        backgroundColor: "#f39c12",
        action: {backgroundColor: "#f39c12"}
      },
      {
        backgroundColor: "#d35400",
        action: {backgroundColor: "#d35400"}
      },
      {
        backgroundColor: "#c0392b",
        action: {backgroundColor: "#c0392b"}
      },
      {
        backgroundColor: "#bdc3c7",
        action: {backgroundColor: "#bdc3c7"}
      },
      {
        backgroundColor: "#7f8c8d",
        action: {backgroundColor: "#7f8c8d"}
      }
    ]
  },
  {
    isTable: true,
    name: "Icon",
    buttons: [
      {
        icon: "outlet",
        action: {icon: "outlet"}
      },
      {
        icon: "accessibility",
        action: {icon: "accessibility"}
      },
      {
        icon: "accessible",
        action: {icon: "accessible"}
      },
      {
        icon: "alarm_on",
        action: {icon: "alarm_on"}
      },
      {
        icon: "assignment",
        action: {icon: "assignment"}
      },
      {
        icon: "face",
        action: {icon: "face"}
      },
      {
        icon: "get_app",
        action: {icon: "get_app"}
      },
      {
        icon: "schedule",
        action: {icon: "schedule"}
      },
      {
        icon: "shopping_cart",
        action: {icon: "shopping_cart"}
      },
      {
        icon: "thumb_up",
        action: {icon: "thumb_up"}
      },
      {
        icon: "thumb_down",
        action: {icon: "thumb_down"}
      },
      {
        icon: "rss_feed",
        action: {icon: "thumb_down"}
      },
      {
        icon: "visibility",
        action: {icon: "visibility"}
      },
      {
        icon: "error",
        action: {icon: "error"}
      },
      {
        icon: "call",
        action: {icon: "call"}
      },
      {
        icon: "clear",
        action: {icon: "clear"}
      },
      {
        icon: "mail",
        action: {icon: "mail"}
      },
      {
        icon: "weekend",
        action: {icon: "weekend"}
      },
      {
        icon: "attach_money",
        action: {icon: "attach_money"}
      },
      {
        icon: "tag_faces",
        action: {icon: "tag_faces"}
      },
    ]
  }
]

export const noteOptions = [
  {
    name: "Rename",
    action: "Rename"
  },
  {
    name: "Delete",
    action: "Delete"
  }
]

export const trashOptions = [
  {
    name: "Clear",
    action: "Clear"
  }
]
