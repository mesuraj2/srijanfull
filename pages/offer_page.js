import React, { useEffect } from "react";
import { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { ChatState } from "../Context/ChatProvider";
import { Box, Button, Input, useToast } from "@chakra-ui/react";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
// import s3 from '../s3.js'

export default function Loc() {
  // const [latitude, setlatitude] = useState()
  // const [longitude, setlongitude] = useState()
  const [offername, setoffername] = useState();
  const [desc, setdesc] = useState();
  const [category, setcategory] = useState();
  // const [city, setcity] = useState()
  const toast = useToast();
  const { city, latitude, longitude, setlatitude, setlongitude, setcity } =
    ChatState();
  const [imageupload, setimageupload] = useState();
  const [imageurl, setimageurl] = useState();

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
        // console.log(data);
        setimageurl(data);
        setNewAvatarUrl("");
        setloading(false);
      }
    }
  };

  useEffect(() => {
    setlatitude(JSON.parse(localStorage.getItem("coordinates"))[0]);
    setlongitude(JSON.parse(localStorage.getItem("coordinates"))[1]);
  }, []);

  const getpostion = async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
      },
      (err) => console.log(err)
    );

    const { data } = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
    setcity(data.city);
  };
  useEffect(() => {
    getpostion();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "auth-token": secureLocalStorage.getItem("token"),
      },
    };
    const { data } = await axios.post(
      `/api/offer`,
      {
        Offername: offername,
        desc: desc,
        category: category,
        url: imageurl,
        coordinate: localStorage.getItem("coordinates"),
      },
      config
    );
    console.log(data);
    if (data) {
      toast({
        title: "added ",
        description: "added successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <Box display={'flex'} flexDirection='column' alignItems={'center'} >
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
        {loading && <Spinner />}
        <Button onClick={getCropData}>Upload</Button>
        <div>check your location coordinate: {city && city}</div>
        <Button onClick={getpostion}>updateLocation</Button>
      </div>
      <form className="offerpagedesign" onSubmit={handleSubmit}>
        <label>
          Enter your offername:
          <Input
            type="text"
            value={offername}
            onChange={(e) => setoffername(e.target.value)}
            required
          />
        </label>
        <label>
          Enter your desc:
          <Input
            type="text"
            value={desc}
            onChange={(e) => setdesc(e.target.value)}
            required
          />
        </label>
        <label>
          Enter your category:
          <Input
            type="text"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            required
          />
        </label>
        <label>
          
          <p>lat: {latitude}</p>
          <p> long: {longitude}</p>
        </label>
        <Button type="submit">submit</Button>
      </form>
    </Box>
  );
}
