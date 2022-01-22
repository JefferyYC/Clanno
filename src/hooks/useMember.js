import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useAuthContext } from "./useAuthContext"
import { useDocument } from './useDocument'

// add isPending


export const useMember = () => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const { user } = useAuthContext()
    const { document } = useDocument("users", user.uid)

    useEffect(() => {
        // would error first time due to initial document is null
        try {
            let ref = query(collection(db, "users"), where("groupId", "==", document.groupId))
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
        } catch (e) {
            console.log(e)
            setError("failed to fetch members")
        }
  }, [document])

    return { documents, error }
}