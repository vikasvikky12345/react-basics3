import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoginForm from './LoginForm';
import { loginUser } from '../Store';

const server = setupServer(
  rest.post('/api/login', (req, res, ctx) => {
    const { email, password } = req.body;
    if (email === 'test@example.com' && password === 'password') {
      return res(ctx.json({ success: true, token: 'mocked-token' }));
    } else {
      return res(
        ctx.status(401),
        ctx.json({ success: false, message: 'Invalid credentials' })
      );
    }
  })
);

const mockStore = configureStore([]);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('LoginForm', () => {
  test('login success', async () => {
    const initialState = {
      auth: {
        error: null,
        user: null,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(store.getActions()).toEqual([
        loginUser({ email: 'test@example.com', password: 'password' }),
      ]);
    });

    expect(screen.getByText('Welcome to the application')).toBeInTheDocument();
    expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument();
  });

  test('login failure', async () => {
    const initialState = {
      auth: {
        error: null,
        user: null,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'invalid@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(store.getActions()).toEqual([
        loginUser({ email: 'invalid@example.com', password: 'wrongpassword' }),
      ]);
    });

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    expect(screen.queryByText('Welcome to the application')).not.toBeInTheDocument();
  });
});
