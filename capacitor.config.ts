
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'My Ionic App',
  webDir: 'dist',
  server: {
    androidScheme: 'https', // or 'http' if your server is not using SSL
   url: 'com.io.ionic.starter://', // Your custom URL scheme
    cleartext: true,
    allowNavigation: [
     // 'http://localhost',
      'http://localhost:8100',
      'https://jroifzzyuxcexxazzsjy.supabase.co',
      'https://jroifzzyuxcexxazzsjy.supabase.co/auth/v1/callback',
      'https://jroifzzyuxcexxazzsjy.supabase.co/auth/v1/authorize?provider=google&redirect_to=com.io.ionic.starter%3A%2F%2F&scopes=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar',
       

      // Add other URLs as needed for OAuth redirects or other purposes
    ]
  },
  // Additional configuration options if needed...
};

/*export default config;

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ConfigTs',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
*/

