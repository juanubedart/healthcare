import { SentryMiddleware } from './sentry.middleware';

describe('SentryMiddleware', () => {
  it('should be defined', () => {
    expect(new SentryMiddleware()).toBeDefined();
  });
});
