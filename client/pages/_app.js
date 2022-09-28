import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.css"

const App = ({ Component, pageProps }) => {
    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
      setShowChild(true);
    }, []);
  
    if (!showChild) {
      return null;
    }
  
    if (typeof window === 'undefined') {
      return <></>;
    } else {
      return (
          <Component {...pageProps} />
      );
    }
}

export default App;