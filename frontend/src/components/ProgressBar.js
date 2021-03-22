import React, { useEffect } from 'react'
import useStorage from '../hooks/useStorage'
import useResizeAndStorage from '../hooks/useResizeAndStorage'

const ProgressBar = ({ file, setFile, setImage }) => {
  const res = useStorage(file)
  useEffect(() => {
    if (res.url) {
      setFile(null)
      setImage(res)
    }
  }, [res.url, setFile])

  return (
    <div className='progress-barr' style={{ width: res.progress + '%' }}></div>
  )
}

export default ProgressBar
