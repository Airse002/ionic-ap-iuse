import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { GoogleApis } from 'googleapis';
// src/pages/Tab3.tsx

import React, { useEffect, useState } from 'react';

const Tab3: React.FC = () => {
  const [events, setEvents] = useState<string>('');

  useEffect(() => {
    const CLIENT_ID = '<YOUR_CLIENT_ID>';
    const API_KEY = '<YOUR_API_KEY>';
    const DISCOVERY_DOC =
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
    const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

    const loadGoogleCalendarApi = async () => {
      try {
        // Load Google API script dynamically
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.async = true;
        script.defer = true;
        script.onload = () => initializeGoogleApi(CLIENT_ID, API_KEY);
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error loading Google Calendar API script:', error.message);
      }
    };

    const initializeGoogleApi = async (clientId: string, apiKey: string) => {
      try {
        // @ts-ignore
        await window.gapi.client.init({
          apiKey,
          clientId,
          discoveryDocs: [DISCOVERY_DOC],
        });

        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: SCOPES,
        });

        tokenClient.callback = async (resp) => {
          if (resp.error !== undefined) {
            throw resp;
          }

          const request = {
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime',
          };

          const response = await window.gapi.client.calendar.events.list(request);

          const fetchedEvents = response.result.items;
          if (!fetchedEvents || fetchedEvents.length === 0) {
            setEvents('No events found.');
          } else {
            const eventDetails = fetchedEvents.map(
              (event) =>
                `${event.summary} (${event.start.dateTime || event.start.date})`
            );
            setEvents('Events:\n' + eventDetails.join('\n'));
          }
        };

        if (window.gapi.client.getToken() === null) {
          tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
          tokenClient.requestAccessToken({ prompt: '' });
        }
      } catch (error) {
        console.error('Error initializing Google Calendar API:', error.message);
      }
    };

    // Load Google Calendar API and initiate the authentication process
    loadGoogleCalendarApi();
  }, []); // Run only once when the component mounts

  return (
    
    
    
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Google Calendar API Integration</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText>
          <pre>{events}</pre>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
