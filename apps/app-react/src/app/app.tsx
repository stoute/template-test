// @ts-nocheck
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch,
} from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { BsmLoadingSpinner, BsmFlashMessage } from '@bsmp/webcomponents-react';
import { NavBar, LoginForm, useObserve } from '@bsmp/react';
import '@ionic/react/css/core.css';

import { AppContext } from './hooks/use-app-context';
import { useAbilityContext } from './hooks';
import { useAppContext } from './hooks';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import EntitiesPage from './components/pages/entities/EntitiesPage';
import TestPage from './components/pages/test/TestPage';
import Drupal from './components/pages/Drupal/Drupal';
import UserPage from './components/pages/UserPage';
import IframePage from './components/pages/IframePage';
import Trip from './components/common/Trip';
import './app.scss';

export const App = () => {
  const { ability, AbilityContext, Can } = useAbilityContext();
  const { actions, store, t } = useAppContext(undefined, 'App');
  const [submitError, setSubmitError] = useState();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    store.state$.subscribe((state) => {
      setInitialized(state.initialized);
      setShowLoginModal(state.showLoginModal);
    });
  }, []);

  const onLoginFormSubmit = async (event: CustomEvent) => {
    await actions.submitLoginForm(event).then((result: any) => {
      if (result && result.message) setSubmitError(t(result.message));
    });
  };

  if (!initialized) {
    return <BsmLoadingSpinner type={'ios'}></BsmLoadingSpinner>;
  }
  return (
    <AppContext.Provider value={store}>
      <AbilityContext.Provider value={ability}>
        <Router>
          <Can do={'read'} on={'all'}>
            <header>
              {!store.state.authenticated && (
                <NavBar
                  menuItems={store.config.get().menus?.mainMenu}
                  position={'fixed-scroll'}
                  logo={'assets/sketch/logo/images/logo.svg'}
                />
              )}
              {store.state.authenticated && (
                <NavBar
                  menuItems={[
                    ...store.config.get().menus.mainMenu,
                    ...store.config.get().menus?.userMenu,
                  ]}
                  position={'fixed-scroll'}
                  logo={'assets/sketch/logo/images/logo.svg'}
                />
              )}
            </header>
          </Can>
          <main>
            <div className="content">
              <Can do={'read'} on={'all'}>
                <Switch>
                  <Route path="/about" component={AboutPage} />
                  <Route path="/iframe/:src/:protocol" component={IframePage} />
                  <Route path="/trips/:id" component={Trip} />
                  <Route path="/trip/:id" component={Trip} />
                  <Route path="/entities/:type/:id" component={EntitiesPage} />
                  <Route path="/entities/:type" component={EntitiesPage} />
                  <Route path="/user" component={UserPage} />
                  <Route path="/test" component={TestPage} />
                  <Route path="/drupal/:drupalId" component={Drupal} />
                  <Route path="/" component={HomePage} />
                </Switch>
              </Can>
              <Can do={'login'} on={'all'}>
                <Route path="/user" component={UserPage} />
                <Redirect to="/user" />
              </Can>
            </div>
          </main>

          <BsmFlashMessage></BsmFlashMessage>

          <Modal
            show={store.state.showLoginModal}
            onHide={() => store.setStateItem('showLoginModal', false)}
          >
            <Modal.Header closeButton>
              <div className={'pl-2'}>
                <ion-icon name="log-in" size={'large'}></ion-icon>
              </div>
            </Modal.Header>
            <Modal.Body>
              <LoginForm
                formSubmit={onLoginFormSubmit}
                submitError={submitError}
                language={store.state.config.language}
                loginType={'email-password'}
              />
            </Modal.Body>
          </Modal>
        </Router>
      </AbilityContext.Provider>
    </AppContext.Provider>
  );
};
