import React, { Component, Fragment } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import Icon from 'react-icons-kit'
import { bold } from 'react-icons-kit/feather/bold'
import { italic } from 'react-icons-kit/feather/italic'
import { code } from 'react-icons-kit/feather/code'
import { list } from 'react-icons-kit/feather/list'
import { underline } from 'react-icons-kit/feather/underline'

import { BoldMark, FormatToolbar, ItalicMark } from './index'

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'My first paragraph'
              }
            ]
          }
        ]
      }
    ]
  }
})

export class TextEditor extends Component {
  state = {
    value: initialValue
  }
  editor

  onChange = ({ value }) => {
    this.setState({ value })
  }

  onKeyDown = (e, editor) => {
    if (!e.ctrlKey) return

    e.preventDefault()

    switch (e.key) {
      case 'b': {
        editor.toggleMark('bold')
        return true
      }

      case 'i': {
        editor.toggleMark('italic')
        return true
      }

      case 'c': {
        editor.toggleMark('code')
        return true
      }

      case 'l': {
        editor.toggleMark('list')
        return true
      }

      case 'u': {
        editor.toggleMark('underline')
        return true
      }

      default: return true
    }
  }

  renderMark = props => {
    switch (props.mark.type) {
      case 'bold': return <BoldMark {...props} />

      case 'italic': return <ItalicMark {...props} />

      case 'code': return <code {...props.attributes}>{props.children}</code>

      case 'list': return (
        <ul {...props.attributes}>
          <li>{props.children}</li>
        </ul>
      )

      case 'underline': return <u {...props.attributes}>{props.children}</u>

      default:
    }
  }

  onMarkClick = (e, type) => {
    e.preventDefault();

    const change = this.editor.toggleMark(type);
    this.onChange(change);
  }

  render() {
    return (
      <Fragment>
        <FormatToolbar>
          <button
            className="tooltip-icon-button"
            onPointerDown={e => this.onMarkClick(e, 'bold')}
          >
            <Icon icon={bold} />
          </button>

          <button
            className="tooltip-icon-button"
            onPointerDown={e => this.onMarkClick(e, 'italic')}
          >
            <Icon icon={italic} />
          </button>

          <button
            className="tooltip-icon-button"
            onPointerDown={e => this.onMarkClick(e, 'code')}
          >
            <Icon icon={code} />
          </button>

          <button
            className="tooltip-icon-button"
            onPointerDown={e => this.onMarkClick(e, 'list')}
          >
            <Icon icon={list} />
          </button>

          <button
            className="tooltip-icon-button"
            onPointerDown={e => this.onMarkClick(e, 'underline')}
          >
            <Icon icon={underline} />
          </button>
        </FormatToolbar>
        <Editor
          ref={editor => this.editor = editor}
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
        />
      </Fragment>
    )
  }
}