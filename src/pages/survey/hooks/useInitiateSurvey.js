import { useState, useEffect } from 'react'
import { db } from "../../../firebase/config"
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const useInitiateSurvey = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const updateStatus = async(id) => {
        try {
            updateDoc(doc(db, "users", id), {
                surveyStatus: 1
              });
        } catch (e) {
            throw new Error ("Failed to update survey status")
        }
    }

    const initiateSurvey = async (groupId) => {
        setError(null)
        setIsPending(true)

        try {
            const ref = doc(db, "groups", groupId)
            const docSnap = await getDoc(ref)
            const memberIds = docSnap.data().users

            memberIds.forEach(id => {
                updateStatus(id)
            });

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        } catch(err) {
            if (!isCancelled) {
                // setError(err.message)
                setError("Failed to initiated survey!")
                setIsPending(false)
                console.log(err)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { initiateSurvey, error, isPending }
}