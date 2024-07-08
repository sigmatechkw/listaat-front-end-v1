import React from 'react'
import CKEditor from 'react-ckeditor-component'

const CkEditorForEdit = ({ textEditor, setTextEditorVal }) => {
  const updateContent = newContent => {
    setTextEditorVal(newContent)
  }

  const onChange = evt => {
    var newContent = evt.editor.getData()
    setTextEditorVal(newContent)
  }

  const onBlur = evt => {
    //console.log("onBlur event called with event info: ", evt);
  }

  const afterPaste = (/* evt */) => {
    //console.log("afterPaste event called with event info: ", evt);
  }

  return (
    <CKEditor
      activeClass='p10'
      content={textEditor}
      events={{
        blur: onBlur,
        afterPaste: afterPaste,
        change: onChange
      }}
    />
  )
}

export default CkEditorForEdit
