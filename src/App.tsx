import React from 'react';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, people, help } from 'ionicons/icons';
import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from './pages/Home';
import RegistrationPage from './components/Register';
import GuidelinePage from './pages/Guideline';
import AssignmentPage from './pages/Assignments';
import LoginPage from './components/Login';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

import '@ionic/react/css/core.css';

import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <IonTabs>
            <IonRouterOutlet>
              <Switch>
                <Route exact path="/register" component={RegistrationPage} />
                <Route path="/login" component={LoginPage} />
                <PrivateRoute exact path="/assignments" component={AssignmentPage} />
                <Route exact path="/guidelines" component={GuidelinePage} />
                <PrivateRoute exact path="/" component={HomePage} />
                <Route path="*">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/">
                <IonIcon icon={home} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="assignments" href="/assignments">
                <IonIcon icon={people} />
                <IonLabel>Assignments</IonLabel>
              </IonTabButton>
              <IonTabButton tab="guidelines" href="/guidelines">
                <IonIcon icon={help} />
                <IonLabel>Guidelines</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
