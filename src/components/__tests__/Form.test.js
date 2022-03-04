import React from 'react'

import { render, cleanup, fireEvent } from '@testing-library/react'

import Form from 'components/Appointment/Form'

afterEach(cleanup)

describe('Form', () => {
	const interviewers = [
		{
			id: 1,
			student: 'Sylvia Palmer',
			avatar: 'https://i.imgur.com/LpaY82x.png',
		},
	]
	it('renders without student name if not provided', () => {
		const { getByPlaceholderText } = render(<Form interviewers={interviewers} />)
		expect(getByPlaceholderText('Enter Student Name')).toHaveValue('')
	})

	it('renders with initial student name', () => {
    const interview = {
      student: 'Lydia Miller-Jones' 
    }
		const { getByTestId } = render(
      <Form 
      interviewers={interviewers} 
      interview={interview} 
    />
    )
		expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones')
	})
	it('validates that the student name is not blank', () => {
     const save = jest.fn();
     const { getByText } = render(
       <Form interviewers={interviewers} save={save} />
     );
     fireEvent.click(getByText("Save"));
     expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
     expect(save).not.toHaveBeenCalled();
	})
  it("can successfully save after trying to submit an empty student name", () => {
    const interview = {
      student: 'Lydia Miller-Jones' 
    }
    const save = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} save={save} />
    );
      
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(save).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(save).toHaveBeenCalledTimes(1);
    expect(save).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  })
  it("calls onCancel and resets the input field", () => {
    const interview = {
      student: 'Lydia Miller-Jones' 
    }
    const empty = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        interview={interview}
        save={jest.fn()}
        empty={empty}
      />
    );

    fireEvent.click(getByText("Save"));

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Cancel"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

    expect(empty).toHaveBeenCalledTimes(1);
  });
})
