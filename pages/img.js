// import React from "react";
// import GoogleMapReact from "google-map-react";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// export default function SimpleMap() {
//   const defaultProps = {
//     center: {
//       lat: 10.99835602,
//       lng: 77.01502627,
//     },
//     zoom: 11,
//   };

//   return (
//     // Important! Always set the container height explicitly
//     <div style={{ height: "100vh", width: "100%" }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "AIzaSyB2-NqsdU7khAc2NgCkPgEszbI-W4rf50M" }}
//         defaultCenter={defaultProps.center}
//         defaultZoom={defaultProps.zoom}
//       >
//         home
//       </GoogleMapReact>
//     </div>
//   );
// }
import React from "react";
import Lottie from "react-lottie-player";
import  chat  from "../animations/chat.json";

export default function Img() {
  return (
    <div>
      <Lottie
        loop
        animationData={chat}
        play
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
}
