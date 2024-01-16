import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import React from 'react';
import { render } from 'react-dom';
import DemoApp from '../components/DemoApp';
import '../components/index.css';
import { IonDatetime } from '@ionic/react';


const Tab5: React.FC = () => {
    
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Tab5</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonDatetime firstDayOfWeek={1}>
          </IonDatetime>
        </IonContent>
      </IonPage>
    );
  }

  export default Tab5;



/*export default function Tab5() {
  return (
    <DemoApp />
  );
}

document.addEventListener('DOMContentLoaded', function() {
  render(
    <Tab5 />,
    document.body.appendChild(document.createElement('div'))
  );
});*/
