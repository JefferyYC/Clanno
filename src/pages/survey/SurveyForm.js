import { useState } from 'react'
import { useSubmitSurvey } from './hooks/useSubmitSurvey'

//styles
import "./SurveyForm.css"

export default function SurveyForm() {
    const [q1, setQ1] = useState('')
    const [q2, setQ2] = useState('')
    const [q3, setQ3] = useState('')
    const { submitSurvey, isPending, error } = useSubmitSurvey()

    const handleSubmit = (e) => {
        e.preventDefault()
        submitSurvey(q1, q2, q3)
        setQ1('')
        setQ2('')
        setQ3('')
      }

    return (
        <form onSubmit={handleSubmit} className="survey-form">
            <h2>Your Pillow Survey</h2>
            <label>
                <span>Rate your week from 1 to 5 !</span>
                <input
                required 
                type="number" 
                onChange={(e) => setQ1(e.target.value)} 
                value={q1}
                />
            </label>
            <label>
                <span>What is something that makes you happy this week?</span>
                <input
                required
                placeholder="A great meal? A completed project?"
                type="text" 
                onChange={(e) => setQ2(e.target.value)} 
                value={q2}
                />
            </label>
            <label>
                <span>What are you looking forward to next week ?</span>
                <input
                required
                placeholder="Meeting a friend? Having some rest? ... "
                type="text" 
                onChange={(e) => setQ3(e.target.value)} 
                value={q3}
                />
            </label>
            {!isPending && <button className="btn">Submit!</button>}
            {isPending && <button className="btn" disabled>Loading</button>}
            {error && <p className="error">{error}</p>}
        </form>
    )
  }