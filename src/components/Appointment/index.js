import React from 'react'
import Header from './Header'
import Show from './Show'
import Empty from './Empty'

import './styles.scss'

export default function Appointment(props) {
	const { student, interviewer } = props

	return (
		<article className='appointment'>
			<Header time={props.time} />
			{props.interview && <Show student={student} interviewer={interviewer} />}
			{!props.interview && <Empty />}
		</article>
	)
}
