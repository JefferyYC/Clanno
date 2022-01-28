import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { doc, onSnapshot } from "firebase/firestore"
import { useUserContext } from "./useUserContext"

export const useGroup = () => {
    const [documents, setDocuments] = useState([])
    const [error, setError] = useState(null)
    const { groupId } = useUserContext()

    useEffect(() => {
        try {
            if (groupId) {
              let ref = doc(db, "groups", groupId)
              const unsubscribe = onSnapshot(ref, (snapshot) => {
                  // update state
                  setDocuments(snapshot.data())
                  setError(null)
                }, error => {
                  console.log(error)
                  setError('could not fetch the data')
                })
            
                // unsubscribe on unmount
                return () => unsubscribe()
            }
        } catch (e) {
            console.log(e)
            setError("failed to fetch members")
        }
  }, [groupId])

    return { documents, error }
}