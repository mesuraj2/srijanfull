import React from 'react'
import Alloffer from './offer/alloffer'
import Allchat from './offer/allchat'

function Offer({alloffer,allchat}) {
  return (
    <div >
        {/* <Allchat totalchat={allchat} /> */}
        <div >
           <Alloffer totaloffer={alloffer}/>
        </div>
    </div>
  )
}



export default Offer