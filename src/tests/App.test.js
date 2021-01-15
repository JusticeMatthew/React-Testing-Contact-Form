import React from 'react';
import { render, screen } from '@testing-library/react';
//Removed fireEvent in favor of the new userEvent option, which more accurately simulates user inputs like adding in keyUp and keyDown events under the .type method INSTEAD of the old .change option which just plugs in the text all at once.
import userEvent from '@testing-library/user-event';

import App from '../App';
import ContactForm from '../Components/ContactForm';

test('App renders correctly', () => {
  render(<App />);
});

describe('Form tests', () => {
  // Grabbing dom elements for this group of testing

  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);

  // Sanity checker
  test('Form renders correctly/sanity checker', () => {
    render(<ContactForm />);
  });

  test('Inputs can be typed in and form submitted', () => {
    // Rendering inside each test prevents errors, per the docs
    render(<ContactForm />);

    // Putting inputs into an array so they can be tested efficiently
    const allInputs = [firstNameInput, lastNameInput, emailInput, messageInput];

    // Iterating over my inputs array to test them all individually with DRY code
    allInputs.forEach((input) => {
      // Old nasty way
      // fireEvent.type(input, { target: { value: 'Hi' } });

      // New improved way
      userEvent.type(input, 'Hi');
      expect(input.value).toBe('Hi');
    });

    // Pulling button from DOM
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Clicking button (The warnings in the console are depriciated, per the docs wrapping with act is not needed)
    userEvent.click(submitButton);

    // Pulling the data variable from DOM to ensure it rendered correctly. I used the find method for this since it has a built in wait method.
    const renderedPre = screen.findByLabelText(/data display/i);

    // The pre element only renders if it's data is truthy, so by default this test will only pass if the element is rendered correctly.
    expect(renderedPre).toBeTruthy();
  });
});
