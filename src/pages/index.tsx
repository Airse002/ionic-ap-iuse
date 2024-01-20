/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CalendarApp from './Tab4';
import reportWebVitals from './reportWebVitals';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const supabase = createClient(
  "https://jroifzzyuxcexxazzsjy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyb2lmenp5dXhjZXh4YXp6c2p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3Njc0MTAsImV4cCI6MjAyMTM0MzQxMH0.v6iJukk6khR41HDkuPQMxK-fAJRDNMA2pOrsQEvsTS4" 
);


const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement as Element);

root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <CalendarApp />
    </SessionContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);*/