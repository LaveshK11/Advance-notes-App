import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's styles
import { useDispatch, useSelector } from 'react-redux';
import { writeNotes } from '../redux/slice/noteSlice';


function WriteBox() {
  const editorHtml = useSelector((state) => state.notes.editorHtml); // Get editorHtml from Redux store
  const dispatch = useDispatch();

  const handleChange = (html) => {
    dispatch(writeNotes(html));
  };

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
