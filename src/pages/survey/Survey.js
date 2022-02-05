import { useUserContext } from '../../hooks/useUserContext'
import SurveyForm from './SurveyForm'
import { useInitiateSurvey } from './hooks/useInitiateSurvey'

// styles
import './Survey.css'

export default function Survey() {
  const { groupId, surveyStatus } = useUserContext()
  const { initiateSurvey, error } = useInitiateSurvey()

  return (
    <>
        <div className="intro">
        <p>Pillow allows every member to send weekly updates to other members via a simple question and answer format, similar to a survey. <br />
           Questions will be released in the beginning of the week and the results will be posted at the end of the week for members to comment on. <br />
          The survey refreshes weekly.</p>
        </div>
        {surveyStatus===0 && 
        <>
          <p>Nobody has initiated the pillow survey for this week...</p>
          <button className="btn" onClick={() => initiateSurvey(groupId)}>Initate Survey!</button>
          {error && <p className="error">{error}</p>}
        </>
        }
        {surveyStatus===1 && <SurveyForm />}
        {surveyStatus===2 && <p>Congratuations on submitting this week's survey!</p>}
    </>
  )
}