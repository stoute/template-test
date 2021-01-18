import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import {
  configDefaults,
  HttpService,
  PermissionsService,
  Util,
} from '@bsmp/core';
import { appStore } from '../providers/app-store';
import { ability } from '../hooks/use-ability-context';
import AppState from '../providers/app-state';
import * as actions from '../actions/actions';
import { useTranslation } from 'react-i18next';

export const AppContext = React.createContext(appStore);

export const useAppContext = (
  componentProps: any = undefined,
  componentId = ''
) => {
  const app = useContext(AppContext);
  const id = componentId;
  const props = componentProps;
  const permissions = PermissionsService.instance;
  const { t } = useTranslation();
  let storeSubscription;

  useEffect(() => {
    permissions.registerAbilityInstance(ability);
    permissions.defineRoles(app.state.roles);
    storeSubscription = app.state$.subscribe((value: AppState) => {});
    if (id === 'App') {
      app.translate.registerTranslateComponents();
    }
    return () => {
      storeSubscription.unsubscribe();
    };
  }, []);

  return {
    ability,
    actions,
    permissions,
    t,
    navigate: actions.navigate,
    config: app.config,
    store: app,
    dispatch: app.dispatch,
    http: HttpService.instance,
    util: Util,
  };
};
