import './init'
import React, { useState, useRef, useEffect } from 'react';
import { BiText } from 'react-icons/bi';
import { AiOutlinePicture } from 'react-icons/ai';
import html2canvas from 'html2canvas';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Draggable from 'react-draggable';
import 'react-quill/dist/quill.snow.css';
import './EditingImage.css';
import './RightNav.css';
import UploadImage from './UploadImage';

const EditingImage = () => {
  const encodedImage = localStorage.getItem('selectedImage');
  const [watermarkHTML, setWatermarkHTML] = useState('');
  const [isAddingText, setIsAddingText] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const containerRef = useRef(null);

  const addText = () => {
    if (!encodedImage) {
      console.log('No selected image to add text to.');

    } else {
      setIsAddingText(true);
    }
  };

  const handleSaveText = async () => {
    setIsAddingText(false);

    // Force a redraw of the React Quill component
    setWatermarkHTML(watermarkHTML);

    if (containerRef.current) {
      try {
        const canvas = await html2canvas(containerRef.current);

        const watermarkedImageUrl = canvas.toDataURL('image/png');

        const a = document.createElement('a');
        a.href = watermarkedImageUrl;
        a.download = 'watermarked_image.png';
        a.click();
      } catch (error) {
        console.error('Error capturing image:', error);
      }
    }
  };

  // Function to handle changes in the React Quill editor
  const handleEditorChange = (htmlContent) => {
    setWatermarkHTML(htmlContent);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Set the uploaded image to state
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };


  useEffect(() => {
    if (window.location.reload == true) {
      console.log("Reload to ", window.location.href = '/')

      window.location.replace('/')
      console.log(error)
    }
  }, [])



  return (
    <div className="main">
      <div className="left">
        <div className="quill-container">
          {isAddingText ? (
            <div>
              <ReactQuill
                value={watermarkHTML}
                onChange={handleEditorChange}
                style={{
                  position: 'relative',
                }}
                className="ql-editor"

              />
            </div>
          ) : null}

          <div className="image-container" ref={containerRef}>
            <Draggable>
              <div
                style={{
                  position: 'absolute',
                  color: 'white',
                  width: '70%',
                  direction: 'ltr',
                  resize: 'both',
                  cursor: 'grab',
                  zIndex: '1',
                }}
                dangerouslySetInnerHTML={{ __html: watermarkHTML }}
              ></div>
            </Draggable>
            <div className="img">
              <img
                src={encodedImage}
                alt=""
              />
            </div>
            <UploadImage uploadedImage={uploadedImage} />
          </div>
        </div>
        <div className="para">
          <p>Watermark will be applied to this image</p>
        </div>
        <div className="small-img">
          <img src={encodedImage} alt="" />
        </div>
      </div>

      <div className="right">
        <div className="right-nav">
          <h1>Watermark Images</h1>
          <div className="buttons">
            <div className="btn-first">
              <BiText className="icon" />
              <button onClick={addText}>Add Text</button>
            </div>
            <div className="btn-second">
              <button>
                <label htmlFor="imageInput" className="icon-label">
                  <AiOutlinePicture className="icon" />
                  Add Image
                </label>
                <input
                  type="file"
                  id="imageInput"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </button>
            </div>
          </div>
          <div className="save-btn">
            <button className="btn-active" onClick={handleSaveText}>
              <p>  Watermark Image</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditingImage;
