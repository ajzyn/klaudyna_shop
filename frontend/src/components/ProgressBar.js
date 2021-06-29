import React, { useEffect } from 'react'
import useStorage from '../hooks/useStorage'
import { ProgressBar as Progress } from 'react-bootstrap'

const ProgressBar = ({ file, setFile, setUploadedImage }) => {
  const res = useStorage(file)
  useEffect(() => {
    if (res.url) {
      setFile(null)
      setUploadedImage(res)
    }
  }, [res, setFile, setUploadedImage])

  return <Progress now={res.progress} label={`${res.progress}%`} />
}

export default ProgressBar
