import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App';

afterEach(() => {
  cleanup();
  localStorage.clear();
  window.history.pushState({}, '', '/');
  vi.restoreAllMocks();
});

describe('authentication UI', () => {
  it('redirects unauthenticated users to login', async () => {
    window.history.pushState({}, '', '/dashboard');
    render(<App />);
    expect(await screen.findByRole('heading', { name: 'Welcome back' })).toBeInTheDocument();
  });

  it('logs in and opens the role-appropriate dashboard', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify({
      token: 'signed-token',
      user: { id: 'manager-1', email: 'manager@shiftflow.local', role: 'MANAGER', employeeId: null },
    }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    render(<App />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'manager@shiftflow.local' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'ShiftFlow123!' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Manager dashboard' })).toBeInTheDocument());
    expect(localStorage.getItem('shiftflow_token')).toBe('signed-token');
  });
});
