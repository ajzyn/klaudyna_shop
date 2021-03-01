import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const useCheckAuthorization = history => {
  const { userInfo } = useSelector(state => state.userLogin)
  useEffect(() => {
    if (!userInfo) history.push('/login')
  }, [history, userInfo])
}

export default useCheckAuthorization
