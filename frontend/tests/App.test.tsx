import { cleanup,fireEvent,render,screen } from '@testing-library/react';
import { afterEach,describe,expect,it,vi } from 'vitest';
import App from '../src/App';
const manager={id:'m',email:'manager@shiftflow.local',role:'MANAGER',employeeId:null};
const employeeUser={id:'u',email:'barry@shiftflow.local',role:'EMPLOYEE',employeeId:'e1'};
const barry={id:'e1',firstName:'Barry',lastName:'Nguyen',email:'barry@shiftflow.local',phone:'0400000000',jobTitle:'Chef',status:'ACTIVE',createdAt:'2026-09-20T00:00:00.000Z'};
const response=(body:unknown,status=200)=>Promise.resolve(new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json'}}));
afterEach(()=>{cleanup();localStorage.clear();window.history.pushState({},'','/');vi.restoreAllMocks();});

describe('authentication restoration',()=>{
  it('restores a valid token through auth/me',async()=>{localStorage.setItem('shiftflow_token','valid');window.history.pushState({},'','/dashboard');vi.spyOn(globalThis,'fetch').mockImplementation(()=>response({user:manager}));render(<App/>);expect(screen.getByText('Restoring session…')).toBeInTheDocument();expect(await screen.findByRole('heading',{name:'Manager dashboard'})).toBeInTheDocument();});
  it('clears an invalid token and redirects to login',async()=>{localStorage.setItem('shiftflow_token','expired');window.history.pushState({},'','/dashboard');vi.spyOn(globalThis,'fetch').mockImplementation(()=>response({error:{}},401));render(<App/>);expect(await screen.findByRole('heading',{name:'Welcome back'})).toBeInTheDocument();expect(localStorage.getItem('shiftflow_token')).toBeNull();});
  it('sends an employee directly to my schedule',async()=>{vi.spyOn(globalThis,'fetch').mockImplementation(()=>response({token:'token',user:employeeUser}));render(<App/>);fireEvent.change(screen.getByLabelText('Email'),{target:{value:employeeUser.email}});fireEvent.change(screen.getByLabelText('Password'),{target:{value:'ShiftFlow123!'}});fireEvent.click(screen.getByRole('button',{name:'Sign in'}));expect(await screen.findByRole('heading',{name:'My schedule'})).toBeInTheDocument();expect(window.location.pathname).toBe('/my-schedule');});
});

describe('employee UI',()=>{
  function managerSession(){localStorage.setItem('shiftflow_token','valid');vi.spyOn(globalThis,'fetch').mockImplementation((input,init)=>{const url=String(input);if(url.endsWith('/auth/me'))return response({user:manager});if(init?.method==='PATCH')return response({employee:{...barry,jobTitle:'Head Chef'}});return response({employee:barry,employees:[barry]});});}
  it('loads employee details',async()=>{managerSession();window.history.pushState({},'','/employees/e1');render(<App/>);expect(await screen.findByRole('heading',{name:'Barry Nguyen'})).toBeInTheDocument();expect(screen.getByText('0400000000')).toBeInTheDocument();});
  it('updates employee details',async()=>{managerSession();window.history.pushState({},'','/employees/e1');render(<App/>);await screen.findByRole('heading',{name:'Barry Nguyen'});fireEvent.click(screen.getByRole('button',{name:'Edit employee'}));fireEvent.change(screen.getByLabelText(/job title/i),{target:{value:'Head Chef'}});fireEvent.click(screen.getByRole('button',{name:'Save changes'}));expect(await screen.findByText('Employee updated successfully.')).toBeInTheDocument();expect(screen.getByText('Head Chef')).toBeInTheDocument();});
  it('does not allow an employee into manager pages',async()=>{localStorage.setItem('shiftflow_token','valid');window.history.pushState({},'','/employees');vi.spyOn(globalThis,'fetch').mockImplementation(()=>response({user:employeeUser}));render(<App/>);expect(await screen.findByRole('heading',{name:'My schedule'})).toBeInTheDocument();});
});
