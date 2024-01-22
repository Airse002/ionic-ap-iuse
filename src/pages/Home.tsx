import logo from './logo.svg';
//import './App.css';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonDatetime } from '@ionic/react';

function Home() {
  const [ start, setStart ] = useState(new Date());
  const [ end, setEnd ] = useState(new Date());
  const [ eventName, setEventName ] = useState("");
  const [ eventDescription, setEventDescription ] = useState("");

  const session = useSession(); // tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase!
  const { isLoading } = useSessionContext();

  const handleStartChange = (e: CustomEvent) => {
    setStart(new Date(e.detail.value));
  };

  const handleEndChange = (e: CustomEvent) => {
    setEnd(new Date(e.detail.value));
  };
  
  if(isLoading) {
    return <></>
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar.events',
        redirectTo: 'http://localhost:8100/home'
        
      }
    });
    if(error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function createCalendarEvent() {
    console.log("Creating calendar event");
    const event = {
      'summary': eventName,
      'description': eventDescription,
      'start': {
        'dateTime': start.toISOString(), // Date.toISOString() ->
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
      },
      'end': {
        'dateTime': end.toISOString(), // Date.toISOString() ->
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
      }
    };

    if (!session || !session.access_token) {
      console.error('No session or access token available');
      return;
    }

    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}` // Template literal used here // Access token for google
      },
      body: JSON.stringify(event)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      alert("Event created, check your Google Calendar!");
    })
    .catch(error => {
      console.error('Error creating calendar event:', error);
    });
  }
    

  console.log(session);
  console.log(start);
  console.log(eventName);
  console.log(eventDescription);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Google Calendar API Integration</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="App" style={{ width: "400px", margin: "30px auto" }}>
          {session ?
            <>
              <h2>Hey there {session.user.email}</h2>
              <p>Start of your event</p>
              <IonDatetime
                presentation="date-time"
                preferWheel={true}
                value={start.toISOString()}
                onIonChange={handleStartChange}
              />
              <p>End of your event</p>
              <IonDatetime
                presentation="date-time"
                preferWheel={true}
                value={end.toISOString()}
                onIonChange={handleEndChange}
              />
              <p>Event name</p>
              <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} />
              <p>Event description</p>
              <input type="text" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
              <hr />
              <IonButton onClick={createCalendarEvent}>Create Calendar Event</IonButton>
              <IonButton onClick={signOut}>Sign Out</IonButton>
            </>
            :
            <IonButton expand="full" onClick={googleSignIn}>Sign In With Google</IonButton>
          }
        </div>
      </IonContent>
    </IonPage>
  );
}


export default Home;