import { useUserContext } from '../../hooks/useUserContext'
import SurveyForm from '../../components/SurveyForm'
import { useInitiateSurvey } from './hooks/useInitiateSurvey'

// styles
import './Survey.css'

export default function Survey() {
  const { groupId, surveyStatus } = useUserContext()
  const { initiateSurvey } = useInitiateSurvey()

  return (
    <>
        {surveyStatus===0 && 
        <>
          <p>Nobody has initiated the pillow survey for this week...</p>
          <button className="btn" onClick={() => initiateSurvey(groupId)}>Initate Survey!</button>
        </>
        }
        {surveyStatus===1 && <SurveyForm />}
    </>
  )
}