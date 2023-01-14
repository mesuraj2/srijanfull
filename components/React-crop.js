import React, { useEffect, useState } from 'react'

import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'


export default function CropDemo({ src }) {
    const [url, seturl] = useState()
const preview=()=>{
    var oFReader = new FileReader();
    oFReader.readAsDataURL(src);

    oFReader.onload = function (oFREvent) {
       seturl(oFREvent.target.result);
    };
}
   
    const [crop, setCrop] = useState()
    return (
      <ReactCrop crop={crop} onChange={c => setCrop(c)}>
        <img src={url} />
      </ReactCrop>
    )
  }
