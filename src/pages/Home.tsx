import { useEffect, useState, useContext } from 'react';

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import DateTimePicker from 'react-datetime-picker';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';

import { SupabaseClientContext } from './SupabaseClientContext';

import { useHistory } from 'react-router-dom';



function Home() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

 
  
  const session = useSession(); // directly get the session

  const supabase = useContext(SupabaseClientContext);

  const history = useHistory();
  
  /*useEffect(() => {
    if (!session) {
      // If there is no session, redirect to the login page or handle accordingly
      history.push('/tab3');
    } else {
      history.push('/home');
    }
  }, [session, history]);*/
  

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',
        // Set the redirect URL to a deep link that your app can handle
        //redirectTo: 'georgesappzeus://'
      }
    });
    if (error) {
      console.error('Error logging in:', error.message);
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
  }

  async function createCalendarEvent() {
    if (!session) {
      console.error('No active session found');
      return;
    }

    const event = {
      'summary': eventName,
      'description': eventDescription,
      'start': {
        'dateTime': start.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'end': {
        'dateTime': end.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    };

    const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + session.access_token // Access token for Google API
      },
      body: JSON.stringify(event)
    });

    if (!response.ok) {
      console.error('Error creating calendar event:', response.statusText);
      return;
    }

    const data = await response.json();
    console.log('Event created:', data);
    alert("Event created, check your Google Calendar!");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Google Calendar API Integration</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ width: "400px", margin: "30px auto" }}>
          {session? 
            <>
              <h2>Hey there {session.user.email}</h2>
              <p>Start of your event</p>
              <DateTimePicker onChange={(value: Date | null) => { if (value) { setStart(value); }}}value={start}/>
              <p>End of your event</p>
              <DateTimePicker onChange={(value: Date | null) => { if (value) { setEnd(value); }}}value={end}/>
              <p>Event name</p>
              <input type="text" onChange={(e) => setEventName(e.target.value)} value={eventName} />
              <p>Event description</p>
              <input type="text" onChange={(e) => setEventDescription(e.target.value)} value={eventDescription} />
              <hr />
              <IonButton onClick={createCalendarEvent}>Create Calendar Event</IonButton>
              <IonButton onClick={signOut}>Sign Out</IonButton>
            </>
            :
            <IonButton onClick={googleSignIn}>Sign In With Google</IonButton>
          }
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Home;




/*import logo from './logo.svg';
//import './App.css';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';

function Home() {
  const [ start, setStart ] = useState(new Date());
  const [ end, setEnd ] = useState(new Date());
  const [ eventName, setEventName ] = useState("");
  const [ eventDescription, setEventDescription ] = useState("");

  const session = useSession(); // tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase!
  const { isLoading } = useSessionContext();
  
  if(isLoading) {
    return <></>
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',
       redirectTo: 'georgesappzeus://localhost/home'
        
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
    }
    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        'Authorization':'Bearer ' + session.provider_token // Access token for google
      },
      body: JSON.stringify(event)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      alert("Event created, check your Google Calendar!");
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
    <div className="App">
      <div style={{width: "400px", margin: "30px auto"}}>
        {session ?
          <>
            <h2>Hey there {session.user.email}</h2>
            <p>Start of your event</p>

    <DateTimePicker onChange={(value: Date | null) => { if (value) { setStart(value); }}}value={start}/>
            <p>End of your event</p>
            <DateTimePicker onChange={(value: Date | null) => { if (value) { setEnd(value); }}}value={end}/>
      
            <p>Event name</p>
            <input type="text" onChange={(e) => setEventName(e.target.value)} />
            <p>Event description</p>
            <input type="text" onChange={(e) => setEventDescription(e.target.value)} />
            <hr />
            <IonButton onClick={() => createCalendarEvent()}>Create Calendar Event</IonButton>
            <p></p>
            <IonButton onClick={() => signOut()}>Sign Out</IonButton>
          </>
          :
          <>
            <IonButton onClick={() => googleSignIn()}>Sign In With Google</IonButton>
          </>
        }
      </div>
    </div>
     </IonContent>
     </IonPage>
  );
}

export default Home;*/