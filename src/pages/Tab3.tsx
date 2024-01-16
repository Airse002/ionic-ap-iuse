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
          <h1 className="text-2xl font-bold mb-4">
            React App with Google Calendar API!
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
import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { GoogleApis } from 'googleapis';
import Event from "../components/Event.js";
// src/pages/Tab3.tsx


import React, { useEffect, useState } from "react";
//import "./App.css";
import { gapi } from "gapi-script";
//import Event from "./components/Event.js";
 
function Tab3() {
  const [events, setEvents] = useState([]);
 
  const calendarID = "j.burda.sin@gmail.com";
  const apiKey = "AIzaSyD4QCWz-9e7Jt_0DAKh3lEYYlg5SXyuAVM";
  //onst accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;
 
  const getEvents = (calendarID: string | undefined, apiKey: string | undefined) => {
    function initiate() {
      gapi.client
        .init({
          apiKey: apiKey,
        })
        .then(function () {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
          });
        })
        .then(
          (response: { result: { items: any; }; }) => {
            let events = response.result.items;
            setEvents(events);
          },
          function (err: any) {
            return [false, err];
          }
        );
    }
    gapi.load("client", initiate);
  };
 
  useEffect(() => {
    const events = getEvents(calendarID, apiKey);
    setEvents(events);
  }, []);
 
  return (
    

    
    
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Google Calendar API Integration</IonTitle>
        </IonToolbar>
        </IonHeader>
        <IonContent>
          
        <div className="App py-8 flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-4">
        React App with Google Calendar API!
        <ul>
          {events?.map((event) => (
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
};

export default Tab3;*/
