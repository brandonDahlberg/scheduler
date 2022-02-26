import React from 'react'
import './InterviewerListItem.scss'
import classNames from 'classnames'

export default function InterviewerListItem(props) {

const { id, name, avatar, setInterviewer, selected } = props;
const interviewerClass = classNames('interviewers__item', {
  'interviewers__item--selected' : props.selected,
})

return (

<li className={interviewerClass} onClick={() => setInterviewer(id)}>
  <img
    className="interviewers__item-image"
    src={avatar}
    alt={name}
  />
 {selected && name}
</li>

  )
}