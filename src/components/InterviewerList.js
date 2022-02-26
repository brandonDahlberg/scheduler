import React, { useState } from 'react'
import './InterviewerList.scss'
import InterviewerListItem from './InterviewerListItem'
import classNames from 'classnames'

export default function InterviewerList(props) {
	const [selectedInterviewer, setInterviewer] = useState('')
	const { interviewers } = props
	const parsedInterviewers = interviewers.map(interviewer => {
		return (
			<InterviewerListItem
				key={interviewer.id}
				{...interviewer}
				setInterviewer={setInterviewer}
				selected={selectedInterviewer === interviewer.id}
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
