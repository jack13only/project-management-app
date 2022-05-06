import { Provider } from 'react-redux';
import { store } from './app/store';
import { render, screen } from '@testing-library/react';
import App from './App';
import Header from './components/header/Header';

describe('Header', () => {
  it('Header', () => {
    render(<Header />);

    const HEADER = screen.getByTestId('header');
    expect(HEADER).toBeInTheDocument();

    const HEADER_BTNS = screen.getAllByTestId('signUpBtn');
    expect(HEADER_BTNS.length).toBe(2);
  });
});

describe('Welcome page', () => {
  it('Welcome page', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
