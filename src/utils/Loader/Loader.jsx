import React from 'react'
import './loader.css'
import { ColorRing, Oval, Puff } from 'react-loader-spinner'
const Loader = () => {
  return (
    <div className="spinner-box">

      {/* <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperclassName="color-ring-wrapper"
        colors={['#f8615e', '#ff312d', '#f8615e', '#FFE23B', '#39C170']}
      /> */}
      <Oval
        visible={true}
        height="60"
        width="60"
        color="#f8615e"
        secondaryColor="#FFDDDC"
        strokeWidth="5"
        //colors={['#f8615e', '#000']}
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />

    </div>

  )
}

export default Loader