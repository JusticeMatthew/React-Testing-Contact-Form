import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import App from '../App';
import ContactForm from '../Components/ContactForm';

test('App renders correctly', () => {
  render(<App />);
});

describe('Form tests', () => {
  // Sanity checker
  test('Form renders correctly/sanity checker', () => {
    render(<ContactForm />);
  });

  // Test to make sure inputs can be typed in
  test('Inputs can be typed in and form submitted', () => {
    // Rendering inside each test prevents errors, per the docs
    render(<ContactForm />);

    // Pulling inputs from the DOM for testing
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    // Putting inputs into an array so they can be tested efficiently
    const allInputs = [firstNameInput, lastNameInput, emailInput, messageInput];

    // Iterating over my inputs array to test them all individually with DRY code
    allInputs.forEach((input) => {
      fireEvent.change(input, { target: { value: 'Hi' } });
      expect(input.value).toBe('Hi');
    });

    //Pulling button from DOM
    const submitButton = screen.getByRole('button', { name: /submit/i });

    //Clicking button (The warnings in the console are depriciated, per the docs wrapping with act is not needed)
    fireEvent.click(submitButton);

    // Pulling the data variable from DOM to ensure it rendered correctly. I used the find method for this since it has a built in wait method.
    const renderedPre = screen.findByLabelText(/data display/i);

    // The pre element only renders if it's data is truthy, so by default this test will only pass if the element is rendered correctly.
    expect(renderedPre).toBeTruthy();
  });
});
