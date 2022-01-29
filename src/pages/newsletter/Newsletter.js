import { useMember } from "../../hooks/useMember"
import SurveyResult from "./SurveyResult"
import Comments from "./Comments"

//styles
import "./Newsletter.css"

export default function Newsletter() {
    const { allSubmit } = useMember()

    return (
        <div>
            {!allSubmit && <p>Your pillow newsletter is still pending responses from some members...</p>}
            {allSubmit && 
            <div className="news-letter">
                <SurveyResult />
                <Comments />
            </div>}
        </div>
    )
}
