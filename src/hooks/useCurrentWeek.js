import { useEffect, useState } from "react/cjs/react.development"
//import { useDocument} from "./useDocument"
import { useUserContext } from "./useUserContext"

import { db } from "../firebase/config"
import { doc, getDoc, Timestamp } from "firebase/firestore";

export const useCurrentWeek = () => {
    const { groupId } = useUserContext()
    const [error, setError] = useState(null)
    const [curWeek, setCurWeek] = useState(null)

    const calcWeek = (created) => {
        const week = (Timestamp.now().seconds - created.seconds) / (24*3600*7)
        setCurWeek(week)
        console.log(created.toDate().getDay())
    }

    useEffect(() => {
        try {
            if (groupId) {
                let ref = doc(db, "groups", groupId)
                getDoc(ref).then((snap) => {
                    calcWeek(snap.data().created)
                })
            }    
        } catch (e) {
            setError(e)
        }
    }, [groupId])

    return { curWeek, error }
}