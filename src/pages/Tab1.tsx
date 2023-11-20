import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonNavLink , IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import Tab2 from './Tab2';


const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton routerLink="/tab2">Go to Page Two</IonButton>

        <IonToolbar>
          <IonTitle size="large">Tab 1</IonTitle>
        </IonToolbar>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
