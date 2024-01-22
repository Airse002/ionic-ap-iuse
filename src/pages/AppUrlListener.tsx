import { useEffect } from 'react';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { useHistory } from 'react-router-dom';

function AppUrlListener() {
  const history = useHistory();

  useEffect(() => {
    const openUrlListener = App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      const url = new URL(event.url);
      // Assuming the URL might look like "georgesappzeus://callback?access_token=..."
      // Here we check the scheme and path instead of host
      if (url.protocol === 'georgesappzeus:' && url.pathname === '/callback') {
        // Extract the token or other OAuth information from the URL here
        const accessToken = url.searchParams.get('access_token');
        // Handle the access token: store it, use it to fetch user details, etc.
        // Redirect to the desired route in your app
        history.push('/tab2'); // Replace with where you want to redirect in your app
      }
    });

    return () => {
      openUrlListener.remove();
    };
  }, [history]);

  return null;
}

export default AppUrlListener;
