import { useState, useEffect } from 'react'
import { projectStorage } from '../firebase/config'
import Resizer from 'react-image-file-resizer'

const resizeConfig = file =>
  new Promise(resolve => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      'JPEG',
      100,
      0,
      uri => {
        resolve(uri)
      },
      'file'
    )
  })

const useResizeAndStorage = file => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)
  const [image, setImage] = useState({})

  const resizeFile = async file => {
    console.log(file)
    try {
      const resizedFile = await resizeFile(file)
      setError('')
      setImage(resizedFile)
    } catch (err) {
      setError('Nie udało się zmienic pliku')
    }
  }

  useEffect(() => {
    resizeFile(file)
    if (Object.keys(image) > 0) {
      //ref
      const storageRef = projectStorage.ref(file.name)

      storageRef.put(file).on(
        'state_change',
        snap => {
          let precentage = (snap.bytesTransferred / snap.totalBytes) * 100
          setProgress(precentage)
        },
        err => {
          setError(err)
        },
        async () => {
          const url = await storageRef.getDownloadURL()
          if (url) {
            setUrl(url)
          }
        }
      )
    }
  }, [file, image])

  return { progress, url, error }
}

export default useResizeAndStorage
