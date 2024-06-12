import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from '../Components/ContactForm';
import Results from '../Components/Results';

describe('Form tests', () => {
  render(<ContactForm />);

  // Grabbing dom elements for this group of testing
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);
  const submitButt = screen.getByRole('button');

  // Putting inputs into an array so they can be tested efficiently
  const allInputs = [firstNameInput, lastNameInput, emailInput, messageInput];

  // Reusable input filling function
  const fillInputs = () => {
    allInputs.forEach((input) => {
      userEvent.clear(input);
      userEvent.type(input, 'Hi');
    });
  };

  // Mock data for post submission render test
  const data = {
    firstName: 'Hi',
    lastName: 'Hi',
    email: 'Hi',
    message: 'Hi',
  };

  test('Form renders correctly/sanity checker', () => {
    expect(screen.getByLabelText('form')).toBeInTheDocument();
  });

  test('Inputs can be typed in', () => {
    fillInputs();
    allInputs.forEach((input) => {
      expect(input.value).toBe('Hi');
    });
  });

  test('Form submits', () => {
    const handleSubmit = jest.fn();
    const submit = jest.fn();
    render(<ContactForm onSubmit={handleSubmit(submit)} />);
    userEvent.click(submitButt);

    expect(handleSubmit).toBeCalled();
  });

  test('Pre element renders when compatible input data is entered', () => {
    render(<Results data={data} />);
    const preElement = screen.getByLabelText(/results/);

    expect(preElement).toHaveTextContent(JSON.stringify(data, null, 2), {
      exact: true,
    });
  });
});
