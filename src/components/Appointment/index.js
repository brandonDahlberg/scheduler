import React from 'react'
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import Confirm from './Confirm'
import Status from './Status'
import useVisualMode from 'hooks/useVisualMode'

import './styles.scss'

const EMPTY = 'EMPTY'
const SHOW = 'SHOW'
const CREATE = 'CREATE'
const SAVING = 'SAVING'
const STATUS = 'STATUS'
const CONFIRM = 'CONFIRM'

export default function Appointment(props) {
	const { id, cancelInterview, bookInterview, interview, interviewer, interviewers, appointments } = props
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY)

	const save = (name, interviewer) => {
		transition(SAVING)
		const interview = {
			student: name,
			interviewer,
		}
		bookInterview(id, interview).then(() => transition(SHOW))
	}

	const cancel = (name, interviewer) => {
		transition(STATUS)
		const interview = {
			student: name,
			interviewer,
		}
		cancelInterview(id, interview).then(() => transition(SHOW))
	}

	return (
		<article className='appointment'>
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && <Show CONFIRM={CONFIRM} transition={transition} interview={interview} />}
			{mode === CREATE && (
				<Form
					appointments={appointments}
					interviewer={interviewer}
					save={save}
					interviewers={interviewers}
					onCancel={() => back()}
					bookInterview={bookInterview}
				/>
			)}
			{mode === SAVING && <Status />}
			{mode === CONFIRM && <Confirm transition={transition} SHOW={SHOW} STATUS={STATUS} cancel={cancel} />}
		</article>
	)
}
