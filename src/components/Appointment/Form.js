import React, { useState } from 'react'
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'

export default function Form(props) {
	const { appointments, save, interview, interviewer: interviewerProp, interviewers, onCancel } = props
	const [student, setStudent] = useState(interview ? interview.student : '')
	const [interviewer, setInterviewer] = useState(interviewerProp || null)
	return (
		<main className='appointment__card appointment__card--create'>
			<section className='appointment__card-left'>
				<form autoComplete='off' onSubmit={event => event.preventDefault()}>
					<input
						className='appointment__create-input text--semi-bold'
						name='name'
						type='text'
						placeholder='enter student name'
						value={student}
						onChange={event => setStudent(event.target.value)}
					/>
				</form>
				<InterviewerList interviewers={interviewers} value={interviewer} setInterviewer={setInterviewer} />
			</section>
			<section className='appointment__card-right'>
				<section className='appointment__actions'>
					<Button danger onClick={onCancel}>
						Cancel
					</Button>
					<Button confirm onClick={() => save(student, interviewer)}>
						Save
					</Button>
				</section>
			</section>
		</main>
	)
}
