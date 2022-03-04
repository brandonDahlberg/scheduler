import React, { useState } from 'react'
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'
const EMPTY = "EMPTY"
export default function Form(props) {
	const { save, interview, interviewer: interviewerProp, interviewers, back} = props
	const [student, setStudent] = useState(interview ? interview.student : '')
	const [interviewer, setInterviewer] = useState(interviewerProp || null)
  const [error, setError] = useState('')
  
  function onCancel() {
    setStudent('')
    setInterviewer(null)
    back()
  }
  
  function validate() {
    if (student === "" || interviewer === null) {
      if(student === ""){
      setError("Student name cannot be blank");
      return;
      }
      if(!interviewer){
        setError("Must select an interviewer");
        return;
        }
    } 
    setError("");
    save(student, interviewer);
  }
  
	return (
		<main className='appointment__card appointment__card--create'>
			<section className='appointment__card-left'>
				<form autoComplete='off' onSubmit={event =>  event.preventDefault()}>
					<input
						className='appointment__create-input text--semi-bold'
						name='name'
						type='text'
						placeholder='Enter Student Name'
						value={student}
						onChange={event => setStudent(event.target.value)}
						data-testid='student-name-input'
					/>
          <section className="appointment__validation">{error}</section>
				</form>
				<InterviewerList interviewers={interviewers} value={interviewer} setInterviewer={setInterviewer} />
			</section>
			<section className='appointment__card-right'>
				<section className='appointment__actions'>
					<Button danger onClick={() => onCancel()}>
						Cancel
					</Button>
					<Button confirm onClick={() => validate()}>
						Save
					</Button>
				</section>
			</section>
		</main>
	)
}
