import React, { useState } from 'react'
import './InterviewerList.scss'
import InterviewerListItem from './InterviewerListItem'

export default function InterviewerList(props) {
	const { value, interviewers, setInterviewer } = props
	const parsedInterviewers = interviewers.map(interviewer => {
		return (
			<InterviewerListItem
				setInterviewer={() => setInterviewer(interviewer.id)}
				key={interviewer.id}
				{...interviewer}
				selected={interviewer.id === value}
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

