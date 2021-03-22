import React from 'react'
import Title from '../components/Title'
import '../styles/gallerystyles.scss'
import UploadForm from '../components/UploadForm'

const Galleryscreen = () => {
  return (
    <div className='App'>
      <Title />
      <UploadForm />
    </div>
  )
}

export default Galleryscreen
