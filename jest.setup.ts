import '@testing-library/jest-dom';

jest.mock('lucide-react', () => {
    return new Proxy({}, {
      get: (target, prop) => () => null,
    });
  });

const suppressedWarnings = [
  'Unknown event handler property `onCheckedChange`',
  'You provided a `checked` prop to a form field without an `onChange` handler'
];

const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    suppressedWarnings.some(warning => args[0].includes(warning))
  ) {
    return;
  }
  originalError(...args);
};