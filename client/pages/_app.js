import React, { useState, useEffect } from "react"
import Head from 'next/head'

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
      <>
        <Head>
          <title>Ticket app - microservice course</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}

export default App;