import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ContactForm = () => {
  const [data, setData] = useState();
  const { register, errors, handleSubmit } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = (data) => {
    setData(data);
  };

  return (
    <div className='App'>
      <form onSubmit={handleSubmit(onSubmit)} aria-label='form'>
        <div>
          <label htmlFor='firstName'>First Name*</label>
          <input
            // Fixed the issue that was breaking the test
            // The label was not attached to any inputs because the firstName lacked it's ID
            id='firstName'
            name='firstName'
            placeholder='Edd'
            ref={register({ required: true, maxLength: 3 })}
          />
          {errors.firstName && (
            <p>Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor='lastName'>Last Name*</label>
          <input
            id='lastName'
            name='lastName'
            placeholder='Burke'
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p>Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor='email'>Email*</label>
          <input
            name='email'
            // This is also breaking the testing the email field needs the correct ID also
            id='email'
            placeholder='bluebill1049@hotmail.com'
            ref={register({ required: true })}
          />
          {errors.email && (
            <p>Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label htmlFor='message'>Message</label>
          <textarea
            name='message'
            id='message'
            ref={register({ required: false })}
          />
        </div>
        {/* // Had to set an aria lable for this because pre elements are not accessible which is not only unacceptable, it also made it hard for the tests to find it. */}
        {data && (
          <div data-testid='test'>
            <pre style={{ textAlign: 'left', color: 'white' }}>
              {JSON.stringify(data)}
            </pre>
          </div>
        )}
        <input type='submit' />
      </form>
    </div>
  );
};

export default ContactForm;
