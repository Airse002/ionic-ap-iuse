import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';




import { ellipse, search, square, star, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Home from './pages/Home';
import Svatky from './pages/Svatky';








import { IonReactRouter } from '@ionic/react-router';
//import Home from './pages copy/Home';
import { Capacitor } from '@capacitor/core';
import SqliteService from './services/sqliteService';
import DbVersionService from './services/dbVersionService';
import StorageService  from './services/storageService';
import AppInitializer from './components/AppInitializer/AppInitializer';

import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

import UsersPage from './pagesCopy/UsersPage/UsersPage';
import AppMenu from './components/AppMenu/AppMenu';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


export const platform = Capacitor.getPlatform();

// Singleton Services
export const SqliteServiceContext = React.createContext(SqliteService);
export const DbVersionServiceContext = React.createContext(DbVersionService);
export const StorageServiceContext = React.createContext(new StorageService(SqliteService,DbVersionService));


const supabaseUrl = "https://jroifzzyuxcexxazzsjy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impyb2lmenp5dXhjZXh4YXp6c2p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3Njc0MTAsImV4cCI6MjAyMTM0MzQxMH0.v6iJukk6khR41HDkuPQMxK-fAJRDNMA2pOrsQEvsTS4";
const supabase = createClient(supabaseUrl, supabaseAnonKey);


setupIonicReact();

const App: React.FC = () => {



    return (

    <SqliteServiceContext.Provider value={SqliteService}>
      <DbVersionServiceContext.Provider value={DbVersionService}>
        <StorageServiceContext.Provider value={new StorageService(SqliteService, DbVersionService)}>
          <AppInitializer>
            <IonApp>
              <IonReactRouter>
                <AppMenu />
                <IonTabs>
                  <IonRouterOutlet id="main-content">
                    <Route exact path="/">
                      <Redirect to="/home" />
                    </Route>
                    <Route exact path="/home">
                      <SessionContextProvider supabaseClient={supabase}>
                        <Home />
                      </SessionContextProvider>
                    </Route>
                    {/* Other routes */}
                    <Route path="/users" component={UsersPage} />
                    <Route exact path="/tab1" component={Tab1} />
                    <Route exact path="/tab2" component={Tab2} />
                    <Route path="/tab3" component={Tab3} />
                    <Route path="/svatky" component={Svatky} />
                    {/* ... other routes ... */}
                  </IonRouterOutlet>
                  {/* ... IonTabButton components ... */}

                  <IonTabBar slot="bottom">
                    
                    <IonTabButton tab="tab2" href="/tab2">
                      <IonIcon aria-hidden="true" icon={search} />
                      <IonLabel>News</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab3" href="/tab3">
                      <IonIcon aria-hidden="true" icon={ellipse} />
                      <IonLabel>To do List</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab4" href="/home">
                      <IonIcon aria-hidden="true" icon={star} />
                      <IonLabel>Google Calendar</IonLabel>
                    </IonTabButton>
           
                    
                  
                  
                  </IonTabBar>

                </IonTabs>
              </IonReactRouter>
            </IonApp>
          </AppInitializer>
        </StorageServiceContext.Provider>
      </DbVersionServiceContext.Provider>
    </SqliteServiceContext.Provider>
  );
};
      
     



export default App;
