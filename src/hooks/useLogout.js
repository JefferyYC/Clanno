import { useEffect, useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useUserContext } from './useUserContext'

import { auth, db } from '../firebase/config'
import { signOut } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"


export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch, user } = useAuthContext()
  const { setUserDoc } = useUserContext() 
  
  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      // update logout status before sign out
      const { uid } = user
      const ref = doc(db, "users", uid)
      await updateDoc(ref, {
        online: false
      })

      // sign the user out
      await signOut(auth)
      
      // dispatch logout action
      dispatch({ type: 'LOGOUT' })
      setUserDoc(null)

      // update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      } 
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
        console.log("error in useLogout: ", err)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
}