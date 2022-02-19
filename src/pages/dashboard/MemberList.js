import { UNINITIATED, UNSUBMITTED, SUBMITTED } from '../../constants/SurveyStatus'
//harcoded
import AvatarIcon from '../../assets/avatar_male.svg'
import Avatar from '../../components/Avatar'

// styles
import './MemberList.css'

export default function MemberList({ members }) {
  return (
    <div className="member-list">
      {members.length === 0 && <p>You are not in a clanno group yet. Start your journey with Clanno now!</p>}
      {members.map(m => (
        <div key={m.id} className="card">
            <Avatar src={AvatarIcon}/>
            <h4>{m.displayName}</h4>
            <div className="status">
              {m.surveyStatus === UNINITIATED && <span className="not-initiated"></span>}
              {m.surveyStatus === UNSUBMITTED && <span className="not-submitted"></span>}
              {m.surveyStatus === SUBMITTED && <span className="submitted"></span>}
              {m.surveyStatus === UNINITIATED && <p>Survey Not Initiated...</p>}
              {m.surveyStatus === UNSUBMITTED && <p>Survey Not Submitted...</p>}
              {m.surveyStatus === SUBMITTED && <p>Survey Submitted!</p>}
            </div>
        </div>        
        ))}
    </div>
  )
}