import { useState } from 'react'
import { useCreateGroup } from "./hooks/useCreateGroup"
import { useMember } from "../../hooks/useMember"
import MemberList from './MemberList'
import "./Dashboard.css"

export default function Dashboard() {
    const [email, setEmail] = useState('')
    const { addUserToGroup, isPending, error } = useCreateGroup()
    const { documents } = useMember()

    const handleSubmit = (e) => {
        e.preventDefault()
        addUserToGroup(email)
        setEmail('')
      }
      
    return (
      <>
        <h2 className="page-title">My Clanno Home</h2>
        {documents && <MemberList members={documents} />}
        <div className="add-user-form">
          <p className="title">Start a new group by inviting members through email <br />Or<br />
          Join an existing group by email of any members of that group</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>email:</span>
              <input
                required
                type="email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
              />
            </label>
            {!isPending && <button className="btn">Join Clanno Group!</button>}
            {isPending && <button className="btn" disabled>Loading...</button>}
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </>
    )
}
