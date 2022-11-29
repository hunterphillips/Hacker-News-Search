import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hacker News Search header', () => {
  render(<App />);
  const headerText = screen.getByText(/Hacker News Search/i);
  expect(headerText).toBeInTheDocument();
});
