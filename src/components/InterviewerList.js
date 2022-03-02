import React, { useState } from 'react'
import './InterviewerList.scss'
import InterviewerListItem from './InterviewerListItem'

export default function InterviewerList(props) {
	const [value, setValue] = useState('')
	const { interviewers, setInterviewer } = props
	const arrayOfInterviewers = []
	for (const interviewer in interviewers) {
		arrayOfInterviewers.push(interviewers[interviewer])
	}
	const parsedInterviewers = arrayOfInterviewers.map(interviewer => {
		return (
			<InterviewerListItem
				setInterviewer={setInterviewer}
				key={interviewer.id}
				{...interviewer}
				value={value}
				selected={interviewer.id === value}
				setValue={setValue}
			/>
		)
	})

	return (
		<section className='interviewers'>
			<h4 className='interviewers__header text--light'>Interviewer</h4>
			<ul className='interviewers__list'>{parsedInterviewers}</ul>
		</section>
	)
}
