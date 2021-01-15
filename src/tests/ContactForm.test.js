import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
//Removed fireEvent in favor of the new userEvent option, which more accurately simulates user inputs like adding in keyUp and keyDown events under the .type method INSTEAD of the old .change option which just plugs in the text all at once.
import userEvent from '@testing-library/user-event';

import ContactForm from '../Components/ContactForm';

describe('Form tests', () => {
  // Rendering here for grabbing the DOM elements I will need and also rendering in each test
  render(<ContactForm />);

  // Grabbing dom elements for this group of testing
  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);

  // Putting inputs into an array so they can be tested efficiently
  const allInputs = [firstNameInput, lastNameInput, emailInput, messageInput];

  // Reusable input filling function
  const fillInputs = () => {
    allInputs.forEach((input) => {
      userEvent.clear(input);
      userEvent.type(input, 'Hi');
      // Old nasty way
      // fireEvent.type(input, { target: { value: 'Hi' } });
    });
  };

  // Per Docs component needs to be rendered in each test to prevent issues
  test('Form renders correctly/sanity checker', () => {
    render(<ContactForm />);
  });

  test('Inputs can be typed in', () => {
    render(<ContactForm />);
    fillInputs();
    allInputs.forEach((input) => {
      expect(input.value).toBe('Hi');
    });
  });
});
