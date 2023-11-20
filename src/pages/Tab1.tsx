import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonLabel } from '@ionic/react';
import './Tab1.css';

const Tab1: React.FC = () => {

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-text-center ion-justify-content-center">
        {/* First Button */}

        
        <div className="button-container">
        <IonLabel>Dnes je datum: {formattedDate}</IonLabel>
          <p> Visit calendar </p>
          <IonButton routerLink="/tab2">Button 1</IonButton>
        </div>

        {/* Second Button */}
        <div className="button-container">
          <p>Go to Page Three</p>
          <IonButton routerLink="/tab3">Button 2</IonButton>
        </div>

        {/* Third Button */}
        <div className="button-container">
          <p>Go to Page one</p>
          <IonButton routerLink="/tab1">Button 3</IonButton>
        </div>

        {/* Fourth Button */}
        <div className="button-container">
          <p>Go to Page Five</p>
          <IonButton routerLink="/tab2">Button 4</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
