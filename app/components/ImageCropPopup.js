'use client';
import React, { useState, useRef, useEffect } from 'react';


const ImageCropPopup = ({ src, onClose, onCropComplete }) => {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    width: 480,
    height: 600,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [isCropped, setIsCropped] = useState(false);
  const [isCropping, setIsCropping] = useState(false);

  useEffect(() => {
    if (src) {
      const objectUrl = URL.createObjectURL(src);
      setImageUrl(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [src]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setCrop((prevCrop) => ({
      ...prevCrop,
      width: imageRef.current.width,
      height: (imageRef.current.width / imageRef.current.naturalWidth) * imageRef.current.naturalHeight,
    }));
  };

  const handleMouseDown = (e) => {
    const { clientX, clientY } = e;
    const { left, top } = canvasRef.current.getBoundingClientRect();
    const offsetX = clientX - left;
    const offsetY = clientY - top;
    setIsDragging(true);
    setCrop((prevCrop) => ({ ...prevCrop, isDragging: true, offsetX, offsetY }));
  };

  const handleMouseMove = (e) => {
    if (isDragging && !resizeDirection) {
      const { clientX, clientY } = e;
      const { left, top } = canvasRef.current.getBoundingClientRect();
      const x = clientX - left - crop.offsetX;
      const y = clientY - top - crop.offsetY;

      // Limit crop area to the canvas boundaries
      const maxX = canvasRef.current.clientWidth - crop.width;
      const maxY = canvasRef.current.clientHeight - crop.height;
      setCrop((prevCrop) => ({
        ...prevCrop,
        x: Math.max(0, Math.min(x, maxX)),
        y: Math.max(0, Math.min(y, maxY)),
      }));
    }

    if (resizeDirection) {
      const { clientX, clientY } = e;
      const { left, top } = canvasRef.current.getBoundingClientRect();

      // Calculate new width and height for the crop area
      let width = clientX - left - crop.x;
      let height = clientY - top - crop.y;

      // Limit resize to the canvas boundaries
      const maxWidth = canvasRef.current.clientWidth - crop.x;
      const maxHeight = canvasRef.current.clientHeight - crop.y;
      width = Math.max(1, Math.min(width, maxWidth));
      height = Math.max(1, Math.min(height, maxHeight));

      setCrop((prevCrop) => ({ ...prevCrop, width, height }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setResizeDirection(null);
  };

  const handleResize = (direction) => {
    setResizeDirection(direction);
  };

  const handleApplyCrop = () => {
    setIsCropping(true);
    setIsCropped(true);
  };

  const handleSaveCrop = () => {
    if (imageRef.current && canvasRef.current) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const resolutionScale = 15; // Increase this value for higher resolution
      const highResWidth = crop.width * resolutionScale;
      const highResHeight = crop.height * resolutionScale;
      
      canvas.width = highResWidth;
      canvas.height = highResHeight;

      ctx.drawImage(
        imageRef.current,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        highResWidth,
        highResHeight
      );

      const displayCanvas = document.createElement('canvas');
      displayCanvas.width = crop.width;
      displayCanvas.height = crop.height;
      const displayCtx = displayCanvas.getContext('2d');

      displayCtx.drawImage(
        canvas,
        0,
        0,
        highResWidth,
        highResHeight,
        0,
        0,
        crop.width,
        crop.height
      );

      const imageUrl = displayCanvas.toDataURL('image/jpeg',1.0);
      setCroppedImageUrl(imageUrl);
      setIsCropping(false);
      setIsCropped(false)
    }
  };

  const handleSaveImage = (url) => {
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      
      // Use the original file name and append a timestamp to ensure uniqueness
      const fileName = `${src.fileName}_${Date.now()}.jpg`; // Modify the file extension if needed
      console.log(fileName)
      link.download = fileName;
  
      // Trigger a click on the link to download the image
      link.click();
    }
  };
  

  return (
    <div className="crop-popup">
      <div className='left-panel'>
        {/* {!isCropping && (
          <div className="crop-icon-container">
            <button className="upload-button" onClick={() => handleApplyCrop()}>Crop</button>
          </div>
        )} */}
        {isCropping && (
          <div className="crop-icon-container">
            <button className="upload-button" onClick={() => handleSaveCrop()}>
              Save Cropped Image
            </button>
          </div>
        )}
        {!isCropping && (
          <div className="crop-icon-container">
            <button className="upload-button" onClick={() => onCropComplete(croppedImageUrl)}>
              Upload
            </button>
          </div>
        )}
      </div>
      {imageUrl && (
        <div
          className="crop-canvas-container"
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <img
            ref={imageRef}
            src={croppedImageUrl === null ? imageUrl : croppedImageUrl}
            alt="Image to Crop"
            className={`canvas-preview ${imageLoaded ? 'visible' : 'hidden'}`}
            onLoad={handleImageLoad}
            onMouseDown={handleMouseDown}
          />
          {isCropped && (
            <div
              className={`crop-area ${isDragging ? 'dragging' : ''}`}
              style={{
                top: crop.y,
                left: crop.x,
                width: crop.width,
                height: crop.height,
              }}
              onMouseDown={handleMouseDown}
            >
              <div
                className="resize-handle top-left"
                onMouseDown={() => handleResize('nw')}
                onMouseUp={handleMouseUp}
              ></div>
              <div
                className="resize-handle top-right"
                onMouseDown={() => handleResize('ne')}
                onMouseUp={handleMouseUp}
              ></div>
              <div
                className="resize-handle bottom-left"
                onMouseDown={() => handleResize('sw')}
                onMouseUp={handleMouseUp}
              ></div>
              <div
                className="resize-handle bottom-right"
                onMouseDown={() => handleResize('se')}
                onMouseUp={handleMouseUp}
              ></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCropPopup;
