import { useEffect, useState, useRef } from "react"
import { db } from "../firebase/config"
import { collection, onSnapshot, query, where } from "firebase/firestore"

export const useCollection = (collectionName, _query) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const collectionQuery = useRef(_query).current

  useEffect(() => {
    let ref = collection(db, collectionName)

    if (collectionQuery) {
      ref = query(ref, where(...collectionQuery))
    }

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      });
      
      // update state
      setDocuments(results)
      setError(null)
    }, error => {
      console.log(error)
      setError('could not fetch the data')
    })

    // unsubscribe on unmount
    return () => unsubscribe()

  }, [collectionName, collectionQuery])

  return { documents, error }
}