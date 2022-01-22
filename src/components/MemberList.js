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
            <h4>{m.displayName}</h4>
            <p>Feeling happy!</p>
            <Avatar src={AvatarIcon} />
        </div>        
        ))}
    </div>
  )
}