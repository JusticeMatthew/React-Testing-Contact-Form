import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from '../Components/ContactForm';

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

  test('Form renders correctly/sanity checker', () => {});

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
});
