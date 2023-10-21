import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './Home.css';

const Home = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const handleSelectImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    handleImage(selectedFile);
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedFile = e.dataTransfer.files[0];
    handleImage(selectedFile);
  };

  const handleImage = (selectedFile) => {
    const encodedImage = URL.createObjectURL(selectedFile);
    localStorage.setItem('selectedImage', encodedImage);
    navigate('/editing');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDropImageLeave = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div className={`wrapper ${isDragging ? 'dragging' : ''}`}
        onDrop={handleImageDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <div className="container">
          <h1>Watermark IMAGE</h1>
          <p>Watermark JPG, PNG, or GIF images.</p>
          <p className='para'>Stamp images or text over your images at once.</p>
          <button className='btn' onClick={handleSelectImageClick}>
            <h1>Select Image</h1>
          </button>
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileSelect}
          />
          <span className='spn'>or drop images here</span>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Home;
