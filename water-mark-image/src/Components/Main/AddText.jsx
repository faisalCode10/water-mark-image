import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './AddText.css';
import Draggable from 'react-draggable'; // Import react-draggable

const AddText = ({ isAddingText, setWatermarkHTML, watermarkHTML }) => {
  const [quillHTML, setQuillHTML] = useState(watermarkHTML);

  const handleQuillChange = (value) => {
    setQuillHTML(value);
    setWatermarkHTML(value);
  };

  return (
    <div>
      {isAddingText ? (
          <div>
            <ReactQuill
              value={quillHTML}
              onChange={handleQuillChange}
              style={{
                position: 'relative',
              }}
            className="ql-editor"
              
            />
    </div>
      ) : null}
        <Draggable>
            <div
              style={{
                position: 'absolute',
                color:'white',
                width: '50%',
                direction: 'ltr',
                resize: 'both',
                cursor: 'grab',
                zIndex: '1',
              }}
              dangerouslySetInnerHTML={{ __html: quillHTML }}
            ></div>
        </Draggable>
          </div>
  );
};

export default AddText;
