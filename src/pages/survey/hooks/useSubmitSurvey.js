import { useState, useEffect } from 'react'
import { db } from "../../../firebase/config"
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useUserContext } from '../../../hooks/useUserContext';

export const useSubmitSurvey = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { groupId, displayName, id } = useUserContext()

    const submitSurvey = async (a1, a2, a3) => {
        setError(null)
        setIsPending(true)

        try {
            const ref = doc(db, "groups", groupId)
            let q1 = "survey1.q1"
            let q2 = "survey1.q2"
            let q3 = "survey1.q3"

            updateDoc(ref, {
               [q1]: arrayUnion({
                   id,
                   displayName,
                   answer: a1
                }),
               [q2]: arrayUnion({
                    id,
                    displayName,
                    answer: a2                
                }),
                [q3]: arrayUnion({
                    id,
                    displayName,
                    answer: a3               
                })
            })

            updateDoc(doc(db, "users", id), {
                surveyStatus: 2
            })

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        } catch(err) {
            if (!isCancelled) {
                // setError(err.message)
                setError("Failed to submit survey!")
                setIsPending(false)
                console.log(err)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { submitSurvey, error, isPending }
}