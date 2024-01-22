
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'georgesappzeus',
  appName: 'My Ionic App',
  webDir: 'dist',
  server: {
    androidScheme: 'https', // or 'http' if your server is not using SSL
   //url: 'georgesappzeus', // Your custom URL scheme
    cleartext: true,
    allowNavigation: [
     // 'http://localhost',
      
     'https://jroifzzyuxcexxazzsjy.supabase.co/auth/v1/callback',
      'https://jroifzzyuxcexxazzsjy.supabase.co',
      
      'https://jroifzzyuxcexxazzsjy.supabase.co/auth/v1/authorize?provider=google&scopes=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar',
      'https://rss.app/embed/v1/list/trm4QTTl8rN509nE',
       

      // Add other URLs as needed for OAuth redirects or other purposes
    ]
  },
  // Additional configuration options if needed...
};

export default config;

/*import { CapacitorConfig } from '@capacitor/cli';

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

