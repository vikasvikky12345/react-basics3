import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SignupForm from './SignupForm';
import { signupUser, signupFailure } from '../Store';

const mockStore = configureStore([]);

describe('SignupForm', () => {
  test('signup success', () => {
    const initialState = {
      auth: {
        error: null,
        user: null,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByText('Signup'));

    const expectedActions = [
      signupUser({ email: 'test@example.com', password: 'password' }),
    ];
    expect(store.getActions()).toEqual(expectedActions);
    expect(screen.getByText('Already a User?')).toBeInTheDocument();
  });

  test('signup failure - missing fields', () => {
    const initialState = {
      auth: {
        error: null,
        user: null,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    fireEvent.click(screen.getByText('Signup'));

    const expectedActions = [
      signupFailure('Please fill in all fields.'),
    ];
    expect(store.getActions()).toEqual(expectedActions);
    expect(screen.getByText('Please fill in all fields.')).toBeInTheDocument();
  });

  test('signup failure - password mismatch', () => {
    const initialState = {
      auth: {
        error: null,
        user: null,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SignupForm />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password1' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'password2' },
    });

    fireEvent.click(screen.getByText('Signup'));

    const expectedActions = [
      signupFailure('Passwords do not match.'),
    ];
    expect(store.getActions()).toEqual(expectedActions);
    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
  });
});
