import React from 'react'
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import Confirm from './Confirm'
import Status from './Status'
import Error from './Error'
import useVisualMode from 'hooks/useVisualMode'

import './styles.scss'

const EMPTY = 'EMPTY'
const SHOW = 'SHOW'
const CREATE = 'CREATE'
const SAVING = 'SAVING'
const STATUS = 'STATUS'
const CONFIRM = 'CONFIRM'
const DELETING = 'DELETING'
const EDIT = 'EDIT'
const ERROR_SAVE = 'ERROR_SAVE'
const ERROR_DELETE = 'ERROR_DELETE'

export default function Appointment(props) {
	const { id, cancelInterview, bookInterview, interview, interviewer, interviewers, appointments } = props
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY)

	const save = (name, interviewer) => {
		const interview = {
			student: name,
			interviewer,
		}

		transition(SAVING)

		bookInterview(id, interview)
			.then(() => transition(SHOW))
			.catch(() => transition(ERROR_SAVE, true))
	}

	const cancel = () => {
		transition(DELETING, true)
		cancelInterview(id)
			.then(() => transition(EMPTY))
			.catch(() => transition(ERROR_DELETE, true))
	}

	return (
		<article className='appointment'>
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)} interview={interview} />
			)}
			{mode === CREATE && (
				<Form
					appointments={appointments}
					interviewer={interviewer}
					save={save}
					interviewers={interviewers}
					onCancel={() => transition(EMPTY)}
					bookInterview={bookInterview}
					interview={interview}
				/>
			)}
			{mode === SAVING && <Status message={'Saving...'} />}
			{mode === DELETING && <Status message={'Deleting...'} />}
			{mode === CONFIRM && <Confirm onCancel={back} onConfirm={cancel} />}
			{mode === EDIT && (
				<Form
					appointments={appointments}
					interviewer={interview ? interview.interviewer.id : interviewer}
					save={save}
					interviewers={interviewers}
					onCancel={() => transition(SHOW)}
					interview={interview}
				/>
			)}
			{mode === ERROR_SAVE && <Error onClose={() => transition(CREATE)} message={'Error Saving'} />}
			{mode === ERROR_DELETE && <Error onClose={() => transition(SHOW)} message={'Error Deleting'} />}
		</article>
	)
}
