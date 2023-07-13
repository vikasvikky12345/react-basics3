import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WelcomeScreen from './WelcomeScreen';

test('renders Hello World as a text', () => {
  render(<WelcomeScreen />);
  const helloWorldElement = screen.getByText('Welcome to the expense tracker!');
  expect(helloWorldElement).toBeInTheDocument();
});

test('clicking the Update User link navigates to the Update User page', () => {
  render(<WelcomeScreen />);
  
  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  const updateUserLink = screen.getByRole('link', { name: 'Update User' });
  userEvent.click(updateUserLink);

  expect(mockNavigate).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith('/updateuser');
});

test('submitting the ExpenseForm triggers the form submission action', () => {
  render(<WelcomeScreen />);
  
  const mockDispatch = jest.fn();
  jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
  }));

  const expenseForm = screen.getByTestId('expense-form');
  fireEvent.submit(expenseForm);

  expect(mockDispatch).toHaveBeenCalledTimes(1); 
  expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
});

test('clicking the Send Verification Email button triggers the email sending action', () => {
  render(<WelcomeScreen />);
  
  const mockDispatch = jest.fn();
  jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
  }));

  const sendEmailButton = screen.getByRole('button', { name: 'Send Verification Email' });
  userEvent.click(sendEmailButton);

  expect(mockDispatch).toHaveBeenCalledTimes(1);
  expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
});

test('attempting to delete the user triggers the user deletion action', () => {
  render(<WelcomeScreen />);
  
  const mockDispatch = jest.fn();
  jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
  }));

  const logoutButton = screen.getByRole('button', { name: 'Logout' });
  userEvent.click(logoutButton);

  expect(mockDispatch).toHaveBeenCalledTimes(1); 
  expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
});

test('renders the "Update User" link', () => {
  render(<WelcomeScreen />);
  const updateUserLink = screen.getByRole('link', { name: 'Update User' });
  expect(updateUserLink).toBeInTheDocument();
});

test('renders the "Logout" button', () => {
  render(<WelcomeScreen />);
  const logoutButton = screen.getByRole('button', { name: 'Logout' });
  expect(logoutButton).toBeInTheDocument();
});

test('renders the ExpenseForm component', () => {
  render(<WelcomeScreen />);
  const expenseForm = screen.getByTestId('expense-form');
  expect(expenseForm).toBeInTheDocument();
});
