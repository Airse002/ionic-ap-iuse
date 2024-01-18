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




import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import Tab5 from './pages/Tab5';





import React from 'react';


import { IonReactRouter } from '@ionic/react-router';
import Home from './pages copy/Home';
import { Capacitor } from '@capacitor/core';
import SqliteService from './services/sqliteService';
import DbVersionService from './services/dbVersionService';
import StorageService  from './services/storageService';
import AppInitializer from './components copy/AppInitializer/AppInitializer';

import UsersPage from './pages copy/UsersPage/UsersPage';
import AppMenu from './components copy/AppMenu/AppMenu';



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



setupIonicReact();

const App: React.FC = () => {



    return (
      <SqliteServiceContext.Provider value={SqliteService}>
      <DbVersionServiceContext.Provider value={DbVersionService}>
        <StorageServiceContext.Provider value={new StorageService(SqliteService,DbVersionService)}>
          <AppInitializer>
            <IonApp>
              <IonReactRouter>
                <AppMenu />
                <IonTabs>
                  <IonRouterOutlet id="main-content">
                    <Route exact path="/home">
                      <Tab5 />
                    </Route>
                    <Route exact path="/">
                      <Redirect to="/home" />
                    </Route>
                    <Route path="/users" component={UsersPage} />
          
                    
                    <Route exact path="/tab1">
                      <Tab1 />
                    </Route>
                    <Route exact path="/tab2">
                      <Tab2 />
                    </Route>
                    <Route path="/tab3">
                      <Tab3 />
                    </Route>
                    <Route path="/tab4">
                      <Tab4 />
                    </Route>
                    <Route path="/tab5">
                      <Tab5 />
                    </Route>
                  </IonRouterOutlet>
                  <IonTabBar slot="bottom">
                    <IonTabButton tab="tab1" href="/tab1">
                      <IonIcon aria-hidden="true" icon={triangle} />
                      <IonLabel>Tab 1</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab2" href="/tab2">
                      <IonIcon aria-hidden="true" icon={ellipse} />
                      <IonLabel>Tab 2</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab3" href="/tab3">
                      <IonIcon aria-hidden="true" icon={square} />
                      <IonLabel>Tab 3</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab4" href="/tab4">
                      <IonIcon aria-hidden="true" icon={ellipse} />
                      <IonLabel>Tab 4</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab5" href="/tab5">
                      <IonIcon aria-hidden="true" icon={ellipse} />
                      <IonLabel>Tab 5</IonLabel>
                    </IonTabButton>
                  </IonTabBar>
                </IonTabs>
              </IonReactRouter>
            </IonApp>
          </AppInitializer>
        </StorageServiceContext.Provider>
        </DbVersionServiceContext.Provider>
      </SqliteServiceContext.Provider>
    )
  };









/*
  <SqliteServiceContext.Provider value={SqliteService}>
  <DbVersionServiceContext.Provider value={DbVersionService}>
    <StorageServiceContext.Provider value={new StorageService(SqliteService,DbVersionService)}>
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>

          <Route path="/tab4">
            <Tab4 />
            </Route>

            <Route path="/tab5">
            <Tab5 />
            </Route>


          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Tab 1</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>

          <IonTabButton tab="tab4" href="/tab4">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Tab 4</IonLabel>
          </IonTabButton>

          <IonTabButton tab="tab5" href="/tab5">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Tab 5</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  <SqliteServiceContext.Provider value={SqliteService}/>
      <DbVersionServiceContext.Provider value={DbVersionService}/>
        <StorageServiceContext.Provider value={new StorageService(SqliteService,DbVersionService)}/>
       ) }
;*/

export default App;
