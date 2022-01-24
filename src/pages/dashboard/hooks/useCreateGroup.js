import { useState, useEffect } from 'react'
import { useUserContext } from "../../../hooks/useUserContext"

import { db } from "../../../firebase/config"
import { collection, query, where, doc, getDocs, addDoc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";

export const useCreateGroup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { id: curUid, groupId: curGid } = useUserContext()

    const addUserToGroup = async (email) => {
        setError(null)
        setIsPending(true)

        try {
            //logic for fetching cur user and new user doc, grabbing the ids
            const q = query(collection(db, "users"), where("email", "==", email))
            const querySnapshot = await getDocs(q)
            const newUser = querySnapshot.docs[0]  // assume only one matching user

            let newUid = newUser.id
            let newGid = newUser.data().groupId

            if (!curGid&& !newGid) {    // neither is in a group
                const groupRef = await addDoc(collection(db, "groups"), {
                    users:[curUid, newUid],
                    initiated: Timestamp.now()
                })
                updateDoc(doc(db, "users", curUid), {
                    groupId: groupRef.id
                })
                updateDoc(doc(db, "users", newUid), {
                    groupId: groupRef.id
                })
            } else {
                if (!newGid) { // assume only one not in group; both are in groups do nothing for now
                    await updateDoc(doc(db, "groups", curGid), {
                        users: arrayUnion(newUid)
                    })

                    updateDoc(doc(db, "users", newUid), {
                        groupId: curGid
                    })
                } else if (!curGid) {
                    await updateDoc(doc(db, "groups", newGid), {
                        users: arrayUnion(curUid)
                    })

                    updateDoc(doc(db, "users", curUid), {
                        groupId: newGid
                    })
                }
            }

            if (!q) {
                throw new Error('Could not complete signup')
            }

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
                }
            } 
        catch(err) {
            if (!isCancelled) {
                // setError(err.message)
                setError("Failed to add memeber. Make sure email is correct!")
                setIsPending(false)
                console.log(err)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addUserToGroup, error, isPending }
}