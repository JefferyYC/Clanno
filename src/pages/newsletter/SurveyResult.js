import { useGroup } from "../../hooks/useGroup"
import { Q_ONE, Q_TWO, Q_THREE} from "../../constants/SurveyQuestions"

//styles
import './SurveyResult.css'

export default function SurveyResult() {
    
    let surveyName = "survey1"
    const { documents } = useGroup()
    let surveyResult = documents[surveyName]

    return (
        <div>
            {surveyResult && 
                <>
                <div className="question">
                    <h3>{Q_ONE}</h3>
                    {surveyResult.q1.map(d => (
                        <div key={d.id}>
                            <h4>{d.displayName}</h4>
                            <p>{d.answer}</p>
                        </div>
                    ))}
                </div>
                <div className="question">
                    <h3>{Q_TWO}</h3>
                    {surveyResult.q2.map(d => (
                        <div key={d.id}>
                            <h4>{d.displayName}</h4>
                            <p>{d.answer}</p>
                        </div>
                    ))}
                </div>
                <div className="question">
                    <h3>{Q_THREE}</h3>
                    {surveyResult.q3.map(d => (
                        <div key={d.id}>
                            <h4>{d.displayName}</h4>
                            <p>{d.answer}</p>
                        </div>
                    ))}
                </div>
            </>}
        </div>
    )
}