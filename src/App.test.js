import { render, screen } from '@testing-library/react';
import AppMobile from './AppMobile';

test('renders learn react link', () => {
  render(<AppMobile />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
