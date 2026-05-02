import React from 'react';
import { render, screen } from '@testing-library/react';
import LevelsOfParticipation from '@/app/(component)/levelsOfParticipation/LevelsOfParticipation';

// Mock the Next.js Image component
jest.mock('next/image', () => {
  return ({ src, alt }) => {
    return <img src={src} alt={alt} />;
  };
});

describe('LevelsOfParticipation Component', () => {
  it('renders the section header', () => {
    render(<LevelsOfParticipation />);
    expect(screen.getByText('Levels of Participation')).toBeInTheDocument();
  });

  it('renders the three levels of participation', () => {
    render(<LevelsOfParticipation />);

    // Check for 11-14 Years Old age group (should be 1 instance)
    const youngGroup = screen.getByText('11-14 Years Old');
    expect(youngGroup).toBeInTheDocument();

    // Check for 15-25 Years Old age group (should be 2 instances)
    const olderGroups = screen.getAllByText('15-25 Years Old');
    expect(olderGroups.length).toBe(2);

    // Check for specific description text snippets
    expect(screen.getByText(/Specially designed for younger participants/)).toBeInTheDocument();
    expect(screen.getByText(/Ideal for first-timers/)).toBeInTheDocument();
    expect(screen.getByText(/For experienced MUNers ready for deeper discussions/)).toBeInTheDocument();
  });

  it('renders three images', () => {
    render(<LevelsOfParticipation />);
    
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(3);
  });
});
