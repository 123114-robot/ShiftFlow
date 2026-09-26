import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App';
afterEach(() => vi.restoreAllMocks());
describe('App', () => {
  it('shows a successful backend connection', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({ status: 'ok', service: 'shiftflow-api' }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    render(<App />);
    await waitFor(() => expect(screen.getByText('API connected')).toBeInTheDocument());
  });
});
