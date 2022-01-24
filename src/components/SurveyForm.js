import { useState } from 'react'

export default function SurveyForm() {
    const [q1, setQ1] = useState('')
    const [q2, setQ2] = useState('')
    const [q3, setQ3] = useState('')

    let error = null
    let isPending = false

    const handleSubmit = (e) => {
        e.preventDefault()
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
                <span>Why did you rate like that ?</span>
                <input
                required
                type="text" 
                onChange={(e) => setQ2(e.target.value)} 
                value={q2}
                />
            </label>
            <label>
                <span>You are selected to DIY a question for your pillow group this week!</span>
                <input
                required
                placeholder="Type your question here"
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