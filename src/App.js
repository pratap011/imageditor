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

  const handleIncreaseBrightness=()=>{
    console.log("reached");
      setBrightness(brightness+5)
    
  }
  const handleDecreaseBrightness=()=>{
    console.log("reached");
      setBrightness(brightness-5)
    
  }

  const handleDecreaseContrast=()=>{
    console.log("reached");
  
      setContrast(contrast-5);
    
  }

  const handleIncreaseContrast=()=>{
    console.log("reached"); 
      setContrast(contrast+5);
    
  }

  const handleContrastChange = (event) => {
    console.log("Reached contrast")
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
      {originalImage&&(<div className="brightness-div">
        <button onClick={handleDecreaseBrightness}>Decrease Brightness</button>
        <button onClick={handleIncreaseBrightness}>Increase Brightness</button>
      </div>)}
      {originalImage&&(<div className="contrast-div">
        <button onClick={handleDecreaseContrast}>Decrease Constrast</button>
        <button onClick={handleIncreaseContrast}>Increase Contrast</button>
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
      <button className='download-button' onClick={handleDownload}>
        Download Modified Image
      </button>
      </div>
    </div>
  );
};

export default ImageEditor;
