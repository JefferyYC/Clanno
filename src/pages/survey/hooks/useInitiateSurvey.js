import { useState, useEffect } from 'react'
import { db } from "../../../firebase/config"
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";

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

    const addSurvey = async(ref) => {
        let newSurvey = {}
        newSurvey["survey" + 1] = {
            q1: [],
            q2: [],
            q3: [],
            comments: [],
            initiated: Timestamp.now()
        }
        try {
            updateDoc(ref, newSurvey)
        } catch (e) {
            throw new Error ("Failed to register survey field in group")
        }
    }

    const initiateSurvey = async (groupId) => {
        setError(null)
        setIsPending(true)

        try {
            const ref = doc(db, "groups", groupId)
            addSurvey(ref)
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
                setError("Oops! Failed to initiate survey. Make sure you are in a group.")
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