export const updateObject = (state, newObject) => {
  return {
    ...state,
    ...newObject,
  }
}

export function debounce(fn, time) {
  let timeout
  return (...args) => {
    const later = () => {
      clearTimeout(timeout)

      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, time)
  }
}

export function getDifferenceBetweenArrays(prevArr, newArr) {
  if (prevArr === newArr) {
    return {
      isDiffer: false,
      updated: [],
      deleted: [],
    }
  }

  const deleted = prevArr.filter(prevObj => {
    return !newArr.some(function (newObj) {
      return prevObj._id === newObj._id
    })
  })

  const updated = newArr.filter(newObj => !prevArr.includes(newObj))

  const response = {
    isDiffer: updated.length || deleted.length,
    updated: updated,
    deleted: deleted,
  }

  return response
}

export function stripHtml(html) {
  var tmp = document.createElement("DIV")
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ""
}
