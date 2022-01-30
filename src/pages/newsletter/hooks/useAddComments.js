import { useState, useEffect } from 'react'
import { db } from "../../../firebase/config"
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useUserContext } from '../../../hooks/useUserContext';
import { useCurrentWeek } from '../../../hooks/useCurrentWeek';

export const useAddComments = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { groupId } = useUserContext()
    const { curWeek } = useCurrentWeek()

    const addComments = async (comment) => {
        setError(null)
        setIsPending(true)

        console.log("to be add: ", comment)

        const commentField = "survey" + curWeek + ".comments"

        try {
            const ref = doc(db, "groups", groupId)
            updateDoc(ref, {
                [commentField]: arrayUnion(comment)
            })

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        } catch(err) {
            if (!isCancelled) {
                // setError(err.message)
                setError("Failed to add comment!")
                setIsPending(false)
                console.log(err)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addComments, error, isPending }
}