import React from 'react'
import Alloffer from './offer/alloffer'
import Allchat from './offer/allchat'

function Offer({alloffer,allchat}) {
  return (
    <div >
        <div className='allchat'>
          <h2 className='topchat'>Top Chat Near You</h2>
        <Allchat totalchat={allchat} />
        </div>
        <div >
           <Alloffer totaloffer={alloffer}/>
        </div>
    </div>
  )
}



export default Offer