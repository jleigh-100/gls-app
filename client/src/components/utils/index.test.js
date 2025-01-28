import { formatDate } from './index';

describe('formatDate', () => {
  it('should format a valid date string correctly', () => {
    const dateString = '2025-01-08T00:00:00Z';
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe('2025-01-08 00:00:00');
  });

  it('should return undefined for an invalid date string', () => {
    const dateString = 'invalid-date';
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBeUndefined();
  });

  it('should return undefined for an empty date string', () => {
    const dateString = '';
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBeUndefined();
  });

  it('should format a date string with different time correctly', () => {
    const dateString = '2025-01-08T15:30:45Z';
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe('2025-01-08 15:30:45');
  });

  it('should format a date string with different date correctly', () => {
    const dateString = '2023-12-25T10:05:30Z';
    const formattedDate = formatDate(dateString);
    expect(formattedDate).toBe('2023-12-25 10:05:30');
  });
});