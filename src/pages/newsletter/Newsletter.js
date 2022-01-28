import { useMember } from "../../hooks/useMember"
import SurveyResult from "./SurveyResult"

export default function Newsletter() {
    const { allSubmit } = useMember()

    return (
        <div>
            {!allSubmit && <p>Your pillow newsletter is still pending responses from some members...</p>}
            {allSubmit && <SurveyResult />}
        </div>
    )
}
