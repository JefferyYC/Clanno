// context provider for the user document in firestore

import { createContext, useEffect, useState } from "react"
import { db } from "../firebase/config"
import { doc, onSnapshot } from "firebase/firestore";
import { useAuthContext } from "../hooks/useAuthContext";

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [userDoc, setUserDoc] = useState(null)
  const { user } = useAuthContext()
  const [error, setError] = useState(null)


  useEffect(() => {
      if (user) {
        const ref = doc(db, "users", user.uid)

        const unsubscribe = onSnapshot(ref, snapshot => {
          // need to make sure the doc exists & has data
          if(snapshot.data()) {
            setUserDoc({...snapshot.data(), id: snapshot.id})
            setError(null)
          }
          else {
            setError('No such document exists')
          }
        }, err => {
          console.log(err.message)
          setError('failed to get document')
        })
    
        // unsubscribe on unmount
        return () => unsubscribe()
    }
  }, [user])

  // console.log('UserDoc state:', userDoc)
  
  return (
    <UserContext.Provider value={{ ...userDoc, error, setUserDoc }}>
      { children }
    </UserContext.Provider>
  )
}