//harcoded
import AvatarIcon from '../assets/avatar_male.svg'
import Avatar from './Avatar'

// styles
import './MemberList.css'

export default function MemberList({ members }) {
  return (
    <div className="member-list">
      {members.length === 0 && <p>No members in your pillow group yet!</p>}
      {members.map(m => (
        <div key={m.id} className="card">
            <Avatar src={AvatarIcon}/>
            <h4>{m.displayName}</h4>
            <p>Feeling happy!</p>
            <div className="status">
              {!m.submitted && <span className="not-submitted"></span>}
              {m.submitted && <span className="submitted"></span>}
              {!m.submitted && <p>Survey Pending...</p>}
              {m.submitted && <p>Survey Submitted!</p>}
            </div>
        </div>        
        ))}
    </div>
  )
}