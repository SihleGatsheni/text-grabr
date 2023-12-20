'use client';
import React, {useState, useRef,useEffect} from 'react';
import { FaPlus } from 'react-icons/fa';
import Link from 'next/link';
import ProgressIndicator from './ProgressIndicator';
import ImageCropPopup from './ImageCropPopup';
import { v4 as uuidv4 } from 'uuid';

const Overlay = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [extractedText, setExtractedText] = useState('');
    const [copied, setCopied] = useState(false);
    const [isCropPopupOpen, setIsCropPopupOpen] = useState(false);
    const [croppedFile, setCroppedFile] = useState(null);

    const handleDragEnter = e => {
      e.preventDefault();
      setIsDragging(true);
    };
  
    const handleDragLeave = e => {
      e.preventDefault();
      setIsDragging(false);
    };
  
    const handleDragOver = e => {
      e.preventDefault();
    };
  
    const handleDrop = e => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && droppedFile.type.startsWith('image/')) {
        setFile(droppedFile);
        setErrorMessage('');
      } else {
        setFile(null);
        setErrorMessage('File Not Supported.');
      }
    };

    const handleAreaClick = () => {
        fileInputRef.current.click();
      };
    
      const handleFileInputChange = e => {
        const selectedFile = e.target.files[0];
    
        if (selectedFile && selectedFile.type.startsWith('image/')) {
          setFile(selectedFile);
          setErrorMessage('');
        } else {
          setFile(null);
          setErrorMessage('File Not Supported.');
        }
      };

      const handleImageProcessing  = () => {
        if (file) {
          setIsCropPopupOpen(true);
        } else {
          setErrorMessage('Please select an image first.');
        }
      }
      const extractTextFromImage = async (imageSrc) => {
        if (!imageSrc) {
          setErrorMessage('Please select an image first.');
          return;
        }
        setErrorMessage('');
        setLoading(true);
        setIsCropPopupOpen(false);
        const formData = new FormData();
        formData.append('file', imageSrc);
        try {
          const response = await fetch('http://ec2-13-245-136-237.af-south-1.compute.amazonaws.com/api/v1/extract-text', {
            method: 'POST',
            body: formData,
          });
    
          if (response.ok) {
            const data = await response.json();
           setExtractedText(data.text);
          } else {
            setErrorMessage( await response.text());
          }
        } catch (error) {
          setErrorMessage('Something went wrong. Please try again later.')
        }
    
        setLoading(false);
      };

      const copyTextToClipboard = (text) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed'; // Prevents the textarea from affecting the layout
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      
      const handleCopyButtonClick = () => {
        copyTextToClipboard(extractedText);
        setCopied(true);
      };

      useEffect(() => {
        if (copied) {
          const timeoutId = setTimeout(() => {
            setCopied(false);
          }, 2000); // Show "Copied" message for 2 seconds
          return () => clearTimeout(timeoutId);
        }
      }, [copied]);

      useEffect(() => {
        if (file) {
          handleImageProcessing();
        }
      },[file])

    const reset = () => {
      setFile(null);
      setExtractedText('');
      setErrorMessage('');
    }
  
    const dataURLtoFile = (dataUrl) => {
      const [, type , base64Data] = dataUrl.match(/^data:(.*);base64,(.*)$/);
      const randomFileName = `${uuidv4()}.${type.split('/')[1]}`;
      const blob = new Blob([Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0))], { type });
      const file = new File([blob], randomFileName, { type });
      return file;
    }
    const handleCropComplete = (croppedData) => {
    if(croppedData == null){
     extractTextFromImage(file)
      return
    }
    extractTextFromImage(dataURLtoFile(croppedData))
    };
  
    const handleCropPopupClose = () => {
      setIsCropPopupOpen(false);
    };
  
  return (
    <div className="overlay-wrapper">
      <div className="bg-white p-8 shadow-lg w-580">
        <h1 className="text-3xl font-bold text-black text-center mb-4">Text Grabr Tool</h1>
        <p className="text-lg font-semibold text-black text-center mb-6">Extract Text from Images Seamlessly</p>
        <p className="text-sm text-black text-center mb-8">
          This tool will allow you to extract text from any image. You may upload an image into the
          tool, and once extracted, the text will be displayed below and available to copy to the
          clipboard.
        </p>
        { file === null ? 
        (
        <div
        className={`bg-white p-8 rounded-lg shadow-lg w-360 flex flex-col items-center justify-center border-4 ${
          isDragging ? 'border-blue-500' : 'border-gray-400'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleAreaClick}
      >
         <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />
        <div className="flex items-center justify-center border-dashed rounded-lg p-8 mb-6">
          <FaPlus className="text-blue-500 mr-2" />
          <span className={`${isDragging ? 'text-blue-500' : 'text-black'}`}>
            Drag file here or click to browse
          </span>
        </div>
      </div>) 
      : (
        <div>
        </div>
      )}
       {isCropPopupOpen && file && (
        <ImageCropPopup src={file} onClose={handleCropPopupClose} onCropComplete={handleCropComplete} />
      )}
      {croppedFile && (
        <div className='bg-white p-8  w-300 flex flex-column items-center justify-center border-1'>
        <div className="">
          {file.type.includes('image/') ? (
            <img src={URL.createObjectURL(file)} alt="Image Preview" className="max-h-96 mx-auto" />
          ) : (
            <p>No image preview available</p>
          )}
        </div>
        <p>{file.name}</p>
      </div>)}
      {errorMessage && <div className="text-red-500 text-center mb-2">{errorMessage}</div>}
      <ProgressIndicator isLoading={loading} />
        <div className="text-lg font-semibold text-black text-center mb-2">Extracted Text:</div>
        <div className='mb-4'>
        <textarea
          className="w-full h-80 border border-gray-400 p-2 rounded-sm"
          placeholder="Extracted text will be displayed here..."
          value={extractedText}
          readOnly></textarea>
            {copied && <div className="text-green-600 mt-2">Copied!</div>}
            <div className="flex justify-end mt-2">
           {
           extractedText.length > 0 && (
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg ml-2" onClick={handleCopyButtonClick}>
                Copy Text To Clickboard
              </button>
            )
          }
          </div>
          </div>
        <Link className='flex justify-center items-center text-blue-600' href="" onClick={ () => reset()} >
          start over
        </Link>
      </div>
    </div>
  );
};

export default Overlay;
