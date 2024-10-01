import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Todo App', () => {
  render(<App />);
  const heading = screen.getByText("Dummy");
  expect(heading).toBeInTheDocument();
});
