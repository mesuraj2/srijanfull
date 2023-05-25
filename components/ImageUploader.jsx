import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({ setImages }) => {

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length <= 5) {
      setImages(acceptedFiles.map((file) => URL.createObjectURL(file)));
    } else {
      alert('Maximum 5 images allowed.');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="w-[15rem] h-[15rem] border-2 border-black/70 my-4 cursor-pointer rounded-md relative bg-white"
    >
      <input {...getInputProps()} />
      <div className="">
        <p className="text-[1rem] absolute top-[50%] -translate-y-[50%] px-5 text-gray-600">
          {isDragActive
            ? 'Drop the files here'
            : 'Drag and drop files here, or click to select files'}
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
