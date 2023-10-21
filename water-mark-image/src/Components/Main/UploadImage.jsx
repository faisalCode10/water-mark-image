import "./UploadImgContainer.css"
import React, { useRef, useEffect,  } from 'react';
import { fabric } from 'fabric';

const UploadImage = ({ uploadedImage }) => {
  //  a canvas ref to keep track of the fabric.Canvas instance. This allows you to maintain a single canvas throughout the component's lifecycle.
  const canvasRef = useRef(null);

  const canvas = useRef(null);
//  if the canvas.current exists. If it doesn't, I create a new fabric.Canvas and assign it to canvas.current. This ensures that only one canvas is created when the component mounts.
  useEffect(() => {
    if (!canvas.current) {
      canvas.current = new fabric.Canvas(canvasRef.current, {
        width: 820,
        height: 1200,
      });
    }

    if (uploadedImage) {
      fabric.Image.fromURL(uploadedImage, (img) => {
        img.set('stackingOrder', canvas.current.getObjects().length + 1);
        // create a new fabric.Image from the uploaded image and add it to the existing canvas using canvas.current.add(img). This way, you keep adding new images to the same canvas without removing the previous ones.
        canvas.current.add(img);
        // canvas.current.renderAll() after adding an image to ensure that the canvas gets updated and displays the new image.
        canvas.current.renderAll();
      });
    }
  }, [uploadedImage]);

  return (
    <div className='uploadImg-container'>
      <div className="upload-img">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default UploadImage;
