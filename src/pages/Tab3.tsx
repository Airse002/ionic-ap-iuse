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
 
  const calendarID = 'j.burda.sin@gmail.com';
  const apiKey = "AIzaSyA1KCGoetZi-OC_WmSn3o-wOT75RDxb-5g";
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

export default Tab3;
