import axios from 'axios';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUploader = ({
  setImages,
  images,
  uploadsNumber,
  setUploadsNumber,
  setReadyToUpload,
  setloging
}) => {
  // this code is for cropping image
  // const [newAvatarUrl, setNewAvatarUrl] = useState();
  // const [cropper, setCropper] = useState();
  // const [loading, setloading] = useState(false);

  // const onDrop = (acceptedFiles) => {
  //   if (acceptedFiles) {
  //     setNewAvatarUrl(URL.createObjectURL(acceptedFiles));
  //   }
  // };

  // const getCropData = async () => {
  //   if (cropper) {
  //     const file = await fetch(cropper.getCroppedCanvas().toDataURL())
  //       .then((res) => res.blob())
  //       .then((blob) => {
  //         return new File([blob], "newAvatar.png", { type: "image/png" });
  //       });
  //     if (file) {
  //       setloading(true);
  //       const form = new FormData();
  //       form.append("file", file);
  //       const { data } = await axios.post("/api/upload", form);
  //       setImages([...images, data]);
  //       setNewAvatarUrl("");
  //       setloading(false);
  //     }
  //   }
  // };

  const onDrop = async (acceptedFiles) => {
    // //console.log(acceptedFiles);
    setloging(true)
    if (uploadsNumber >= 5) return setReadyToUpload(false);
    if (acceptedFiles.length <= 5) {
      setReadyToUpload(false);
      acceptedFiles.map(async (file) => {
        setUploadsNumber((prev) => prev + 1);
        //console.log('hiii');
        const form = new FormData();
        form.append('file', file);
        const { data } = await axios.post('/api/upload', form);
        //console.log(data);

        setImages([...images, data.url]);
      });
      // setImages(acceptedFiles.map((file) => URL.createObjectURL(file)));
      //console.log(images);
    } else {
      alert('Maximum 5 images allowed.');
    }
    setloging(false)
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

      {/* {newAvatarUrl && 
        <div>
          <Cropper
            src={newAvatarUrl}
            style={{ height: 400, width: 400 }}
            initialAspectRatio={4 / 3}
            minCropBoxHeight={100}
            minCropBoxWidth={100}
            cropBoxResizable={false}
            guides={false}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
          <button onClick={getCropData}>Upload</button>
        </div>
      } */}
    </div>
  );
};

export default ImageUploader;
