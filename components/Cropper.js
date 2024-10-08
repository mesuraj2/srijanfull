import React from "react";
import { Cropper } from "react-cropper";

export default function CropperImg() {
  const [newAvatarUrl, setNewAvatarUrl] = useState();
  const [cropper, setCropper] = useState();
  const [loading, setloading] = useState(false);

  const getNewAvatarUrl = (e) => {
    if (e.target.files) {
      setNewAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const getCropData = async () => {
    if (cropper) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], "newAvatar.png", { type: "image/png" });
        });
      if (file) {
        setloading(true);
        const form = new FormData();
        form.append("file", file);
        const { data } = await axios.post("/api/upload", form);
        //console.log(data);
        // setimageurl(data);
        setNewAvatarUrl("");
        setloading(false);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={getNewAvatarUrl}
        required
      />

      {newAvatarUrl && (
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
      )}

      <button onClick={getCropData}>Upload</button>
    </div>
  );
}
