import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import { Image } from 'react-bootstrap'

const UploadForm = () => {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [image, setImage] = useState({})

  const changeHandler = async (e) => {
    let selected = e.target.files[0]
    const types = ['image/png', 'image/jpg', 'image/jpeg']

    if (selected && types.includes(selected.type)) {
      setFile(selected)
      setError('')
    } else {
      setFile(null)
      setError('Proszę wybrać pliki z rozszerzeniem jpg/png/jpeg')
    }
  }
  return (
    <div>
      <form action="">
        <input type="file" onChange={changeHandler} />
        <span>+</span>
        <div className="output">
          {error && <div className="error">{error}</div>}
          {file && <div>{file.name}</div>}
          {file && (
            <ProgressBar file={file} setFile={setFile} setImage={setImage} />
          )}
          {Object.keys(image).length > 0 && <Image fluid src={image.url} />}
        </div>
      </form>
    </div>
  )
}

export default UploadForm
