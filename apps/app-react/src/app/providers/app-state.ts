import {configDefaults} from '@bsmp/core';
import { tripEntityDefinition } from '@bsmp/entities';
import { userEntityDefinition } from '@bsmp/entities';

export default class AppState {
  activeId: any;
  activeEntity: any;
  apiUrl = '';
  authenticated = false;
  config = {};
  configUrl = 'assets/config.json';
  data: any;
  entities: any = {};
  entityCollections = {};
  entityDefinitions = {
    trip: tripEntityDefinition,
    user: userEntityDefinition
  };
  firebaseConfig: any;
  firebaseAppId = 'bsmp-workspace';
  language = 'nl';
  initialized = false;
  showLoginModal = false;
  roles = {...configDefaults.roles, ...{
      ANONYMOUS: [
        {
          // 'actions': ['login'],
          'actions': ['read'],
          'subject': ['all']
        }
      ],
      AUTHENTICATED: [
        {
          'actions': ['read','create','update','logout'],
          'subject': ['all']
        }
      ],
  }};
  mainMenu = [];
}
