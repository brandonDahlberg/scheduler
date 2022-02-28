import React, { useState } from 'react'
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'

export default function Form(props) {
	const { interviewers, onSave, onCancel } = props
	const [student, setStudent] = useState(student || '')
	const [interviewer, setInterviewer] = useState(interviewer || null)
	function reset() {
		setStudent('') && setInterviewer('')
	}
	function cancel(inputs) {
		for (const input of inputs) input()
	}

	return (
		<main className='appointment__card appointment__card--create'>
			<section className='appointment__card-left'>
				<form autoComplete='off' onSubmit={event => event.preventDefault()}>
					<input
						className='appointment__create-input text--semi-bold'
						name='name'
						type='text'
						placeholder='Enter Student Name'
						value={student}
						onChange={event => setStudent(event.target.value)}
					/>
				</form>
				<InterviewerList interviewers={interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
			</section>
			<section className='appointment__card-right'>
				<section className='appointment__actions'>
					<Button danger onClick={() => cancel([onCancel, reset])}>
						Cancel
					</Button>
					<Button confirm onClick={onSave}>
						Save
					</Button>
				</section>
			</section>
		</main>
	)
}
