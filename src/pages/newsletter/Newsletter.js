import { useMember } from "../../hooks/useMember"
import SurveyResult from "./SurveyResult"
import Comments from "./Comments"

//styles
import "./Newsletter.css"

export default function Newsletter() {
    const { allSubmit } = useMember()

    return (
        <div>
            {!allSubmit && 
            <p className="intro">Pillow newsletter is where the survey results of your group would be released after every member has answered.<br />
            Your pillow newsletter is still pending responses from some members...</p>}
            {allSubmit && 
            <div className="news-letter">
                <SurveyResult />
                <Comments />
            </div>}
        </div>
    )
}
