import React, { useState } from 'react'

import { Editor as TextEditor} from 'primereact/editor';
        
const Editor = ({text, setText,handleEditorChange}) => {
  return (
    <div className="card">
    <TextEditor value={text} onTextChange={handleEditorChange} style={{ height: '320px' }} />
</div>
  )
}

export default Editor