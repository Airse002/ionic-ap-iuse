import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonDatetime, IonButton, IonInput, IonItem, IonLabel, InputChangeEventDetail, IonModal } from '@ionic/react';
import { gapi } from "gapi-script";
import Event from "../components/Event.js";
import './Tab3.css';


import AppLogo from '../components/AppLogo/AppLogo';
import AppMenuButton from '../components/AppMenuButton/AppMenuButton';
import './Home.css';
import AppIntroText from '../components/AppIntroText/AppIntroText';

import { DatetimeChangeEventDetail, IonDatetimeCustomEvent, IonInputCustomEvent } from "@ionic/core";
// At the top of your component file
//import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
//import { Capacitor } from '@capacitor/core';

//const sqliteConnection = new SQLiteConnection(CapacitorSQLite);



interface Event {
  id: string;
  summary: string;
  // ... other properties ...
}

function Tab3() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [newEvent, setNewEvent] = useState({ summary: '', start: '', end: '' });
  
  
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Additional state to store whether the picker is shown or not
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');

  const calendarID = "j.burda.sin@gmail.com";
  const apiKey = "AIzaSyD4QCWz-9e7Jt_0DAKh3lEYYlg5SXyuAVM"; // Replace with your API key
  

    // Function to open the date-time picker for event start
    const openStartPicker = () => {
      setShowStartPicker(true);
    };
  
      // Function to open the date-time picker for event end
  const openEndPicker = () => {
    setShowEndPicker(true);
  };


// Update the start time and hide the picker
const handleStartChange = (event: CustomEvent) => {
  setSelectedStartTime(event.detail.value);
  setShowStartPicker(false);
};

  // Update the end time and hide the picker
  const handleEndChange = (event: CustomEvent) => {
    setSelectedEndTime(event.detail.value);
    setShowEndPicker(false);
  };

  const handleDateChange = (event: CustomEvent) => {
    setSelectedDate(event.detail.value);
  };
  






  useEffect(() => {
    // Function to initialize the Google API client
    const initiate = () => {
      gapi.client
        .init({
          apiKey: apiKey,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
        })
        .then(() => {
          // After successful initialization, load the calendar API
          return gapi.client.load('calendar', 'v3');
        })
        .then(() => {
          // After loading calendar API, fetch events for the initially selected date
          getEvents(calendarID, apiKey, selectedDate);
        }, (error: any) => {
          console.error("Error loading GAPI client for API", error);
        });
    };
  
    // Load the Google API client
    gapi.load('client', initiate);
  }, []); // The empty array ensures this effect runs only once
  
  useEffect(() => {
    // Fetch events whenever selectedDate changes
    getEvents(calendarID, apiKey, selectedDate);
  }, [selectedDate]); // This effect runs every time selectedDate changes
  
  
  const getEvents = (calendarID: string, apiKey: string, date: string) => {
    // Format the date as required by Google Calendar API
    const formattedDate = date.split("T")[0]; // Example: '2024-01-16'

    function initiate() {
      gapi.client
        .init({ apiKey: apiKey })
        .then(() => {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?timeMin=${formattedDate}T00:00:00Z&timeMax=${formattedDate}T23:59:59Z`,
          });
        })
        .then(
          (response: { result: { items: any; }; }) => {
            let events = response.result.items;
            setEvents(events);
          },
          (err: any) => [false, err]
        );
    }

    gapi.load("client", initiate);
  };



  const handleInputChange = (event: CustomEvent, field: string) => {
    const inputEvent = event as CustomEvent<InputChangeEventDetail>;
    if (inputEvent.detail && inputEvent.detail.value !== undefined) {
      setNewEvent({ ...newEvent, [field]: inputEvent.detail.value });
    }
  };
  

  const addEvent = () => {
    const event = {
      'summary': newEvent.summary,
      'start': {
        'dateTime': newEvent.start,
        'timeZone': 'America/Los_Angeles' // Adjust the time zone
      },
      'end': {
        'dateTime': newEvent.end,
        'timeZone': 'America/Los_Angeles' // Adjust the time zone
      }
    };

    const request = gapi.client.calendar.events.insert({
      'calendarId': calendarID,
      'resource': event
    });

    request.execute((event: { htmlLink: string; }) => {
      console.log('Event created: ' + event.htmlLink);
      // Update events list after adding
      
      getEvents(calendarID, apiKey, selectedDate);
      });
      };
      
      return (
      <IonPage>
      <IonHeader>
      <IonToolbar>
          <AppMenuButton />
          <IonTitle>To do List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <div className="App py-8 flex flex-col justify-center">
      <IonDatetime
               firstDayOfWeek={1}
               onIonChange={handleDateChange}
               //locale = ""
               
               value={selectedDate}
             > </IonDatetime>
             <IonItem>
      <IonButton onClick={openStartPicker}>Event Start</IonButton>
            <IonModal isOpen={showStartPicker} onDidDismiss={() => setShowStartPicker(false)}>
              <IonDatetime
                presentation="date-time"
                preferWheel={true}
                value={newEvent.start}
                onIonChange={handleStartChange}
              />
              <IonButton onClick={() => setShowStartPicker(false)}>Done</IonButton>
            </IonModal>
            {/* Display the selected start time */}
            {!showStartPicker && selectedStartTime && (
              <p>Start: {selectedStartTime}</p>
            )}
          </IonItem>
          <IonItem>
            <IonButton onClick={openEndPicker}>Event End</IonButton>
            <IonModal isOpen={showEndPicker} onDidDismiss={() => setShowEndPicker(false)}>
              <IonDatetime
                presentation="date-time"
                preferWheel={true}
                value={newEvent.end}
                onIonChange={handleEndChange}
              />
              <IonButton onClick={() => setShowEndPicker(false)}>Done</IonButton>
            </IonModal>
            {/* Display the selected end time */}
            {!showEndPicker && selectedEndTime && (
              <p>End: {selectedEndTime}</p>
            )}
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Event Description</IonLabel>
            <IonInput value={newEvent.summary} onIonChange={e => handleInputChange(e, 'summary')}></IonInput>
          </IonItem>
          <IonButton onClick={addEvent}>Add Event</IonButton>

      <h1>
        <ul>
          {events.map((event) => (
            <li key={event.id} className="flex justify-center">
              <Event description={event.summary} />
            </li>
          ))}
        </ul>
      </h1>
    </div>

  </IonContent>
</IonPage>
);
}

export default Tab3;

















/*
import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonDatetime } from '@ionic/react';
import { gapi } from "gapi-script";
import Event from "../components/Event.js";
import './Tab3.css';

function Tab3() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());

  const calendarID = "j.burda.sin@gmail.com";
  const apiKey = "AIzaSyD4QCWz-9e7Jt_0DAKh3lEYYlg5SXyuAVM"; // Replace with your API key

  const getEvents = (calendarID, apiKey, date) => {
    // Format the date as required by Google Calendar API
    const formattedDate = date.split("T")[0]; // Example: '2024-01-16'

    function initiate() {
      gapi.client
        .init({ apiKey: apiKey })
        .then(() => {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?timeMin=${formattedDate}T00:00:00Z&timeMax=${formattedDate}T23:59:59Z`,
          });
        })
        .then(
          (response) => {
            let events = response.result.items;
            setEvents(events);
          },
          (err) => [false, err]
        );
    }

    gapi.load("client", initiate);
  };

  useEffect(() => {
    getEvents(calendarID, apiKey, selectedDate);
  }, [selectedDate]); // Fetch events when selectedDate changes

  const handleDateChange = (e) => {
    setSelectedDate(e.detail.value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Google Calendar API Integration</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="App py-8 flex flex-col justify-center">
          <IonDatetime firstDayOfWeek={1}
            onIonChange={handleDateChange}
            displayFormat="MM/DD/YYYY"
            placeholder="Select Date"
            value={selectedDate}
          ></IonDatetime>
          
          <h1 >
            <ul>
              {events.map((event) => (
                <li key={event.id} className="flex justify-center">
                  <Event description={event.summary} />
                </li>
              ))}
            </ul>
          </h1>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Tab3;*/





