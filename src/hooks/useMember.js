import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useUserContext } from "./useUserContext"

export const useMember = () => {
    const [documents, setDocuments] = useState([])
    const [allSubmit, setAllSubmit] = useState(false)
    const [error, setError] = useState(null)
    const { groupId } = useUserContext()

    useEffect(() => {
        try {
            if (groupId) {
              let ref = query(collection(db, "users"), where("groupId", "==", groupId))
              const unsubscribe = onSnapshot(ref, (snapshot) => {
                  let results = []  
                  snapshot.docs.forEach(doc => {
                    results.push({...doc.data(), id: doc.id})
                  });
                  setAllSubmit(results.reduce((prev, cur) => prev.surveyStatus===2 && cur.surveyStatus===2))
                  
                  // update state
                  setDocuments(results)
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

    return { documents, error, allSubmit }
}