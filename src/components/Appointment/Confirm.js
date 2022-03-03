import React from 'react'
import Button from 'components/Button'

export default function Confirm(props) {
	const { cancel, transition, SHOW } = props
	return (
		<main className='appointment__card appointment__card--confirm'>
			<h1 className='text--semi-bold'>Delete the appointment?</h1>
			<section className='appointment__actions'>
				<Button danger onClick={() => transition(SHOW)}>
					Cancel
				</Button>
				<Button danger onClick={() => cancel()}>
					Confirm
				</Button>
			</section>
		</main>
	)
}
