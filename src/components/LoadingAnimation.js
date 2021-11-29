import React from 'react';
import Lottie from "react-lottie";
import lottiJSON from "../assets/animations/loading.json"

const LoadingAnimation = ({height = 100, width = 100}) => {
    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: lottiJSON, 
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
    }
    
    
    
    return ( 
        <Lottie options={defaultOptions} height={height} width={width}/>
     );
}
 
export default LoadingAnimation;