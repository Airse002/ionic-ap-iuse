import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import DashboardIframe from './DashboardIframe';


const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>News</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="Tab2">
     
       
      <div className="App">
      <DashboardIframe />
    </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
