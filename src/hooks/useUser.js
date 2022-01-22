import { useState, useEffect } from "react"

export const useGroupId = (uid) => {
  const [data, setData] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
        const curUser = await getDoc(doc(db, "users", uid))
        setData(curUser.data())
    }

    fetchData()
  }, [uid])

  return { data }
}