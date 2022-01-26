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
        <h2 className="page-title">My Pillow Home</h2>
        {documents && <MemberList members={documents} />}
        <div className="add-user-form">
          <p className="title">Invite a new member or join someone else's pillow group by email</p>
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
            {!isPending && <button className="btn">Join My Pillow Group!</button>}
            {isPending && <button className="btn" disabled>Loading...</button>}
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </>
    )
}
