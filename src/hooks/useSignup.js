import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'

import { auth, db } from '../firebase/config'
import { doc, setDoc } from "firebase/firestore"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // add display name to user
      await updateProfile(res.user, { displayName })
      
      // create a user document with existing uid
      await setDoc(doc(db, "users", res.user.uid), {
        online: true,
        displayName,
        email,
        groupId: null
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
        console.log(err)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}