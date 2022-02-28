import React, { useState } from 'react'
import './InterviewerList.scss'
import InterviewerListItem from './InterviewerListItem'
import classNames from 'classnames'

export default function InterviewerList(props) {
	const [value, onChange] = useState('')
	const { interviewers } = props
	const parsedInterviewers = interviewers.map(interviewer => {
		return (
			<InterviewerListItem
				key={interviewer.id}
				{...interviewer}
				setInterviewer={() => onChange(interviewer.id)}
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
