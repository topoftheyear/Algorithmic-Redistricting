import { render, screen } from '@testing-library/react';
import App from './App';

test('renders text', () => {
  render(<App />);
  const linkElement = screen.getByText(/what/i);
  expect(linkElement).toBeInTheDocument();
});
