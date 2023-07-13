import { render, screen } from '@testing-library/react';
import WelcomeScreen from './WelcomeScreen';

test('renders Hello World as a text', () => {
  render(<WelcomeScreen />);
  const helloWorldElement = screen.getByText('Welcome to the expense tracker!');
  expect(helloWorldElement).toBeInTheDocument();
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
