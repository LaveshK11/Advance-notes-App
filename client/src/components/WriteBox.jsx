import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill'sstyles
import { useDispatch, useSelector } from 'react-redux';
import { writeNotes } from '../redux/slice/noteSlice';


function WriteBox() {
  let editorHtml = useSelector((state) => state.notes.editorHtml); 
  const dispatch = useDispatch();

  if (!editorHtml) {
    editorHtml = '';
  }

  const handleChange = (html) => {

    if (html.trim() !== "<p><br></p>") {
      dispatch(writeNotes(html));
    }

  };
  x
  return (
    <div className="rich-text-editor" style={{ color: "black" }}>
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
