import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface RichTextEditorProps {
  onContentChange: (content: EditorState) => void;
  initialContent?: EditorState;
  darkMode?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  onContentChange,
  initialContent,
  darkMode
}) => {
  const [editorState, setEditorState] = useState(
    initialContent || EditorState.createEmpty()
  );

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    onContentChange(state);
  };

  return (
    <div className={'dark-editor-container bg-gray-700'}>
      <Editor
        placeholder='Type Something...'
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: ['inline', 'fontSize', 'textAlign'], 
          inline: {
            options: ['bold', 'italic', 'underline']
          },
          fontSize: {},
          textAlign: {
            options: ['left', 'center', 'right']
          }
        }}
        wrapperClassName={darkMode ? 'dark-editor-wrapper' : ''}
        editorClassName={darkMode ? 'dark-editor-content' : ''}
      />
    </div>
  );
}

export default RichTextEditor;
