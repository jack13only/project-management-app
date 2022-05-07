import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { store } from './app/store';

import { App } from './App';
import { Header } from './components/layout/header/Header';
import { Footer } from './components/layout/footer/Footer';

describe('Layout', () => {
  it('Header', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const HEADER = screen.getByTestId('header');
    expect(HEADER).toBeInTheDocument();

    const HEADER_BTNS = screen.getAllByTestId('PrimaryButton');
    expect(HEADER_BTNS.length).toBe(2);
  });

  it('Footer', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const FOOTER = screen.getByTestId('footer');
    expect(FOOTER).toBeInTheDocument();
  });
});

describe('Welcome page', () => {
  it('Welcome page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const WELCOME_PAGE = screen.getByTestId('welcomepage');
    expect(WELCOME_PAGE).toBeInTheDocument();
  });
});
