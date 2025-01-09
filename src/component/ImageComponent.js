import React from 'react'

function ImageComponent({ byteArray }) {
 // Convert byte array to Base64
 const base64String = btoa(String.fromCharCode.apply(null, byteArray));

 // Construct the image source URL
 const imageSrc = `data:image/jpeg;base64,${base64String}`;

 return (
   <div>
     <img src={imageSrc} alt="Decoded" />
   </div>
 );
};

export default ImageComponent