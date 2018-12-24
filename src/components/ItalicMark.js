import React from 'react'

export function ItalicMark(props) {
  return (
    <em property="italic">
      {props.children}
    </em>
  )
}