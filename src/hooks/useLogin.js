import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'

import { auth, db } from '../firebase/config'
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"


export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)
  
    try {
      // login
      const res = await signInWithEmailAndPassword(auth, email, password)

      // update login status
      const ref = doc(db, "users", res.user.uid)
      await updateDoc(ref, {
        online: true
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
        // setError(err.message)
        setError("Login failed. Make sure email and password is correct!")
        setIsPending(false)
        console.log("error in useLogin: ", err)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, isPending, error }
}