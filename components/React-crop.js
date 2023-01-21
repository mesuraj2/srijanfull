import React, { useEffect, useState } from 'react'

import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'


export default function CropDemo({ src }) {


   
    // const [crop, setCrop] = useState()
    return (
      // <ReactCrop crop={crop} onChange={c => setCrop(c)}>
      //   <img src={url} />
      // </ReactCrop>
      <img src={src} />
    )
    }