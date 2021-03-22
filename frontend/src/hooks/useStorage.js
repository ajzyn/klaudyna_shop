import { useState, useEffect } from 'react'
import { projectStorage, proejctFirestore } from '../firebase/config'

const useStorage = file => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)

  useEffect(() => {
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
  }, [file])

  return { progress, url, error }
}

export default useStorage
