import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's styles

function WriteBox() {
  const [editorHtml, setEditorHtml] = useState('');

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  return (
    <div className="rich-text-editor">
      <ReactQuill
        value={editorHtml}
        onChange={handleChange}
        modules={WriteBox.modules}
        formats={WriteBox.formats}
      />
    </div>
  );
}

// Configuration options for the editor
WriteBox.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link'],
    ['clean'],
  ],
};

WriteBox.formats = [
  'header',
  'font',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet',
  'link',
];

export default WriteBox;
