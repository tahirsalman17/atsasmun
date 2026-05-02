import React from 'react';
import { render, screen } from '@testing-library/react';
import Events from '@/app/(component)/events/Events';
import ContextPage from '@/app/Context/ContextPage';

// Mock the Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock the Next.js Image component
jest.mock('next/image', () => {
  return ({ src, alt }) => {
    return <img src={src} alt={alt} />;
  };
});

describe('Events Component', () => {
  const mockContext = {
    check: '',
    setCheck: jest.fn(),
    dubaidates: { startdate: '10', enddate: '12', month: 'Oct', year: '2025' },
    istanbuldates: { startdate: '06', enddate: '09', month: 'Aug', year: '2026' },
    saudidates: { startdate: '15', enddate: '18', month: 'Oct', year: '2026' },
    newyorkdates: { startdate: '01', enddate: '04', month: 'Nov', year: '2026' },
    londondates: { startdate: '10', enddate: '13', month: 'Nov', year: '2026' },
    bakudates: { startdate: '20', enddate: '23', month: 'Nov', year: '2026' },
  };

  it('renders the events section header', () => {
    render(
      <ContextPage.Provider value={mockContext}>
        <Events />
      </ContextPage.Provider>
    );

    expect(screen.getByText('Series of Events')).toBeInTheDocument();
    expect(screen.getByText('Our key events')).toBeInTheDocument();
  });

  it('renders the event cards with correct details', () => {
    render(
      <ContextPage.Provider value={mockContext}>
        <Events />
      </ContextPage.Provider>
    );

    // Check for Istanbul event
    expect(screen.getByText('ATSASMUN Istanbul, Turkey')).toBeInTheDocument();
    expect(screen.getByText('06 – 09 Aug 2026')).toBeInTheDocument();
    
    // Check for London event
    expect(screen.getByText('ATSASMUN London, UK')).toBeInTheDocument();
    expect(screen.getByText('10 – 13 Nov 2026')).toBeInTheDocument();

    // Check for Register buttons
    const registerButtons = screen.getAllByText('Register Now');
    expect(registerButtons.length).toBeGreaterThan(0);
  });
});
