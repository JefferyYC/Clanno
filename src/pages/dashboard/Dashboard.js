import { useState } from 'react'
import { useCreateGroup } from "./hooks/useCreateGroup"
import { useMember } from "../../hooks/useMember"
import MemberList from '../../components/MemberList'

import "./Dashboard.css"

export default function Dashboard() {
    const [email, setEmail] = useState('')
    const { addUserToGroup, isPending, error } = useCreateGroup()
    const { documents } = useMember()

    const handleSubmit = (e) => {
        e.preventDefault()
        addUserToGroup(email)
      }
      
    return (
      <>
        <h2 className="page-title">My Pillow Home</h2>
        {documents && <MemberList members={documents} />}
        <div className="add-user-form">
          <h2 className="title">Add more members!</h2>
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
            {!isPending && <button className="btn">Add user</button>}
            {isPending && <button className="btn" disabled>Loading...</button>}
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </>
    )
}
