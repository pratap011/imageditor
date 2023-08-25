import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';

const ImageEditor = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [modifiedImage, setModifiedImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  useEffect(() => {
    if (originalImage) {
      applyImageChanges();
    }
  }, [brightness, contrast,originalImage]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setOriginalImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const applyImageChanges = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();

    img.src = originalImage;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      context.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
      context.drawImage(img, 0, 0);

      const modifiedImageData = canvas.toDataURL('image/jpeg');
      setModifiedImage(modifiedImageData);
    };
  };

  const handleBrightnessChange = (event) => {
    setBrightness(event.target.value);
  };

  const handleContrastChange = (event) => {
    setContrast(event.target.value);
  };

  const handleDownload = () => {
    if(modifiedImage==null){
      alert("Please upload an image first!")
    }
    else{
      const downloadLink = document.createElement('a');
      downloadLink.href = modifiedImage;
      downloadLink.download = 'modified_image.jpg';
      downloadLink.click();
    }
  };

  return (
    <div>
      <Navbar/>
      <br></br>
      <br></br>
      <div className='image-container'>
      {originalImage && <img className="image"  src={modifiedImage || originalImage} alt="Modified" />}
      </div>
      {originalImage&&(<div className="modifiers">
      {originalImage&&(<div>
        <label htmlFor="brightness">Brightness: </label>
        <input
          type="range"
          id="brightness"
          min="0"
          max="200"
          value={brightness}
          onChange={handleBrightnessChange}
        />
      </div>)}
      {originalImage&&(<div>
        <label htmlFor="contrast" className='slider-label'>Contrast: </label>
        <input
          type="range"
          id="contrast"
          min="0"
          max="200"
          className="slidebar"
          value={contrast}
          onChange={handleContrastChange}
        />
      </div>)}
      </div>)}
      <div className="buttons">
      <label className="upload-button-label" htmlFor="image-upload">
        Upload Image
        <input
          type="file"
          id="image-upload"
          className="image-upload-input"
          onChange={handleImageUpload}
        />
      </label>
      <br></br>
      <br></br>
      <button className='download-button' onClick={handleDownload}>
        Download Modified Image
      </button>
      </div>
    </div>
  );
};

export default ImageEditor;
