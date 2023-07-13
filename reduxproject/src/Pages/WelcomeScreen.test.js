import { render, screen } from '@testing-library/react';
import WelcomeScreen from './WelcomeScreen';

test('renders Hello World as a text', () => {
  render(<WelcomeScreen />);
  const helloWorldElement = screen.getByText('Welcome to the exense tracker', {exact:flase});
  expect(helloWorldElement).toBeInTheDocument();
});