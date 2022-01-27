import { useMember } from "../../hooks/useMember"

export default function Newsletter() {
    const { allSubmit } = useMember()

    return (
        <div>
            {!allSubmit && <p>Your pillow newsletter is still pending responses from some members...</p>}
            {allSubmit && <p> Your pillow newsletter is ready! </p>}
        </div>
    )
}
