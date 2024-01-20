import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import React, { useEffect, useState } from 'react';
import { ApiService } from '../services/svatkyApi';
import './Tab3.css';

const Svatky: React.FC = () => {

        const [data, setData] = useState<any>(null);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const result = await ApiService.fetchData();
              setData(result);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchData();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <div>
      <h2>Data Display</h2>
      {data ? (
        <div>
          {/* Adjust the way you display the data based on its structure */}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
        <ExploreContainer name="Tab 3 page" />
      </IonContent>
    </IonPage>
  );
};

export default Svatky;

