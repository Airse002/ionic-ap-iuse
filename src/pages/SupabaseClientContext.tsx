import React, { ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jroifzzyuxcexxazzsjy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyb2lmenp5dXhjZXh4YXp6c2p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3Njc0MTAsImV4cCI6MjAyMTM0MzQxMH0.v6iJukk6khR41HDkuPQMxK-fAJRDNMA2pOrsQEvsTS4';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const SupabaseClientContext = React.createContext(supabase);

interface SupabaseClientProviderProps {
  children: ReactNode;
}

export const SupabaseClientProvider: React.FC<SupabaseClientProviderProps> = ({ children }) => {
  return (
    <SupabaseClientContext.Provider value={supabase}>
      {children}
    </SupabaseClientContext.Provider>
  );
};
