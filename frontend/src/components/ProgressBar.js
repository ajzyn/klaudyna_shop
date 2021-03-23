import React, { useEffect } from 'react'
import useStorage from '../hooks/useStorage'
import useResizeAndStorage from '../hooks/useResizeAndStorage'
import { ProgressBar as Progress } from 'react-bootstrap'

const ProgressBar = ({ file, setFile, setUploadedImage }) => {
  const res = useStorage(file)
  useEffect(() => {
    if (res.url) {
      setFile(null)
      setUploadedImage(res)
    }
  }, [res.url, setFile, setUploadedImage])

  return <Progress now={res.progress} label={`${res.progress}%`} />
}

export default ProgressBar
