import React, { useEffect, useState } from 'react'

function Base64ImageViewer({ base64String }) {
    const [imageSrc, setImageSrc] = useState(''); 
    useEffect(() => {
        // Remove potential prefix from the Base64 string
        if(base64String!= ""){
            const cleanBase64String = base64String.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
        
            // Prepare the image source
            setImageSrc(`data:image/jpeg;base64,${cleanBase64String}`);
        }
      }, [base64String]);

      return (
        <div>
          {imageSrc ? (<>
            <br></br>
            <img  src={imageSrc} className='container mt-2' alt="Decoded"    style={{ maxWidth: '80%', transform: 'rotate(90deg)', transformOrigin: 'center' }} />
            </>
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      );
    };
export default Base64ImageViewer