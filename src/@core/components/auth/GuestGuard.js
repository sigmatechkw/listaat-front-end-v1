// ** React Imports
import { useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'
import {useSelector} from "react-redux";

const GuestGuard = props => {
  const { children, fallback } = props
  const token = useSelector(state => state.auth.token)
  const auth = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (token) {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])
  if (auth.loading || (!auth.loading && auth.user !== null)) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
