import React from 'react'
import './InterviewerListItem.scss'
import classNames from 'classnames'

export default function InterviewerListItem(props) {
	const { id, name, avatar, selected, value, setValue, setInterviewer } = props
	const interviewerClass = classNames('interviewers__item', {
		'interviewers__item--selected': selected,
	})

	return (
		<li
			className={interviewerClass}
			onClick={() => {
				setInterviewer(id)
				setValue(id)
			}}
			selected={value === id}
		>
			<img className='interviewers__item-image' src={avatar} alt={name} />
			{selected && name}
		</li>
	)
}
