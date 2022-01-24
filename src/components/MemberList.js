//harcoded
import AvatarIcon from '../assets/avatar_male.svg'
import Avatar from './Avatar'

// styles
import './MemberList.css'

export default function MemberList({ members }) {
  return (
    <div className="member-list">
      {members.length === 0 && <p>There is no members in your pillow group yet. Start your journey of better family communication
        by adding new members to your pillow group!</p>}
      {members.map(m => (
        <div key={m.id} className="card">
            <Avatar src={AvatarIcon}/>
            <h4>{m.displayName}</h4>
            <p>Feeling happy!</p>
            <div className="status">
              {m.surveyStatus === 0 && <span className="not-initiated"></span>}
              {m.surveyStatus === 1 && <span className="not-submitted"></span>}
              {m.surveyStatus === 2 && <span className="submitted"></span>}
              {m.surveyStatus === 0 && <p>Survey Not Initiated...</p>}
              {m.surveyStatus === 1 && <p>Survey Not Submitted...</p>}
              {m.surveyStatus === 2 && <p>Survey Submitted!</p>}
            </div>
        </div>        
        ))}
    </div>
  )
}