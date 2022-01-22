import { useMember } from '../hooks/useMember'

// components
import Avatar from './Avatar'

// hardcoded avatar icon
import AvatarIcon from '../assets/avatar_male.svg'

// styles
import './OnlineUsers.css'

export default function OnlineUsers() {
  const { error, documents } = useMember()

  return (
    <div className="user-list">
      <h2>Your Pillow Group</h2>
      {error && <div>{error}</div>}
      {documents && documents.map(user => (
        <div key={user.id} className="user-list-item">
          {user.online && <span className="online-user"></span>}
          <span>{user.displayName}</span>
          <Avatar src={AvatarIcon} />
        </div>
      ))}
    </div>
  )
}