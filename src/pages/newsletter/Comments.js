import { useState } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import Avatar from "../../components/Avatar"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAddComments } from "./hooks/useAddComments"
import { useGroup } from "../../hooks/useGroup"
import { Timestamp } from "firebase/firestore";

// hardcoded avatar icon
import AvatarIcon from '../../assets/avatar_male.svg'

//styles
import "./Comments.css"

export default function Comments() {
  const { user } = useAuthContext()
  const { addComments, error } = useAddComments() 
  const [newComment, setNewComment] = useState('')
  const { documents } = useGroup()

  let surveyName = "survey1"
  let surveyResult = documents[surveyName]

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      content: newComment,
      createdAt: Timestamp.now(),
      id: user.uid
    }
    
    await addComments(commentToAdd)

    if (!error) {
      setNewComment('')
    }
  }

  return (
    <div className="project-comments">
      <h4>Comments</h4>

      <ul>
        {surveyResult && surveyResult.comments.length > 0 && surveyResult.comments.map(comment => (
          <li key={comment.id}>
            <div className="comment-author">
              <Avatar src={AvatarIcon} />
              <p>{comment.displayName}</p>
            </div>
            <div className="comment-date">
              <p>{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</p>
            </div>
            <div className="comment-content">
              <p>{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea 
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  )
}