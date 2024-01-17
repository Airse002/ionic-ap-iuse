import React, { useEffect, useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonDatetime, IonButton, IonInput, IonItem, IonLabel, InputChangeEventDetail } from '@ionic/react';
import { gapi } from "gapi-script";
import Event from "../components/Event.js";
import './Tab3.css';
import { DatetimeChangeEventDetail, IonDatetimeCustomEvent, IonInputCustomEvent } from "@ionic/core";

interface Event {
  id: string;
  summary: string;
  // ... other properties ...
}

function Tab3() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [newEvent, setNewEvent] = useState({ summary: '', start: '', end: '' });

  const calendarID = "j.burda.sin@gmail.com";
  const apiKey = "AIzaSyD4QCWz-9e7Jt_0DAKh3lEYYlg5SXyuAVM"; // Replace with your API key
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

  const handleDateChange = (event: IonDatetimeCustomEvent<DatetimeChangeEventDetail>) => {
    const value = event.detail.value;

    // Check if value is a string before using it
    if (typeof value === 'string') {
      setSelectedDate(value);
    } else {
      // Handle the case when value is not a string
      // For example, you might want to set the selected date to an empty string or a default value
      setSelectedDate('');
    }
  };

  const handleInputChange = (e: IonInputCustomEvent<InputChangeEventDetail>, field: string) => {
    setNewEvent({ ...newEvent, [field]: e.target.value });
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
      <IonTitle>Google Calendar API Integration</IonTitle>
      </IonToolbar>
      </IonHeader>
      <IonContent>
      <div className="App py-8 flex flex-col justify-center">
      <IonDatetime
               firstDayOfWeek={1}
               onIonChange={handleDateChange}
               //displayFormat="MM/DD/YYYY"
               placeholder="Select Date"
               value={selectedDate}
             > </IonDatetime>
      <IonItem>
        <IonLabel position="floating">Event Title</IonLabel>
        
        

        <IonInput value={newEvent.summary} onIonChange={e => handleInputChange(e, 'summary')}></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Start DateTime</IonLabel>
        <IonInput value={newEvent.start} onIonChange={e => handleInputChange(e, 'start')}></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position="floating">End DateTime</IonLabel>
        <IonInput value={newEvent.end} onIonChange={e => handleInputChange(e, 'end')}></IonInput>
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





