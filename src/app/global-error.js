'use client'
import { useEffect } from "react";

 // Error boundaries must be Client Components
 
export default function GlobalError({ error, reset }) {

    useEffect(()=>{
        console.error('error from next error:',error)
    },[]);
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}