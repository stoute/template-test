import { RxAppStore, HttpService } from '@bsmp/rx';
import {
  configDefaults,
  PermissionsService,
  TranslateService,
} from '@bsmp/core';
import { Firebase } from '@bsmp/api';
// import * as firebase from 'firebase/firebase-app';
// import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';
import { pluck } from 'rxjs/operators';
import { ability } from '../hooks/use-ability-context';
import AppState from './app-state';
import i18n from '../../i18n'

class AppStore extends RxAppStore<AppState> {
  private http: HttpService = HttpService.instance;
  private permissions: PermissionsService = PermissionsService.instance;
  public fb: Firebase;
  public translate = TranslateService.instance;
  public ability = ability;

  constructor() {
    super(new AppState());
    this.initApp(this.state.configUrl);
  }

  private async initApp(configUrl: string) {
    this.config.setDefaults(configDefaults);
    this.http.optionsDefault.mode = 'cors';
    await this.config.fetch(configUrl, true);
    this.setStateItem('language', i18n.language)
    await this.translate.use(this.state.language);
    this.setStateItem('apiUrl',this.config.get('apiUrl'))
    await this.initFirebae();
    this.initPermissions();
    this.initAuth();
    this.initState();
    // @ts-ignore
    this.state$.pipe(pluck('authenticated')).subscribe((value) => { });
  }

  private initState = () => {
    const initState = {
      config: this.config.get(),
      initialized: true,
    };
    this.setState({ ...this.state, ...initState });
  };

  private initFirebae = async () => {
    this.state.firebaseConfig = this.config.get('firebaseApps')[
      this.state.firebaseAppId
      ];
    this.fb = new Firebase(this.state.firebaseConfig);
    await this.fb.init();
  }

  private initAuth = () => {
    if (localStorage && localStorage.getItem('auth_app_token')) {
      if (!this.config.get().dev) {
        this.ability.update(this.state.roles.AUTHENTICATED);
      } else {
        this.ability.update(this.state.roles.DEVELOPER);
      }
      this.setStateItem(
        'user',
        JSON.parse(localStorage.getItem('auth_app_token'))
      );
      this.setStateItem('authenticated', true);
    }
  };

  private initPermissions = () => {
    ability.update(this.state.roles.ANONYMOUS);
    this.permissions.registerAbilityInstance(ability);
    this.permissions.defineRoles(this.config.get('roles'));
    if (location.host.match('localhost:')) {
      this.config.set('dev', true);
      if (this.config.get('apiUrlDev')) {
        this.state.apiUrl = this.config.get('apiUrlDev');
      }
    }

    // await this.initState();
    // // auth app
    // if (appConfig.authType && appConfig.authType === 'oauth') {
    //   await this.initAuth();
    // }
    // await this.initApi();
    // if (!appConfig.authType || appConfig.authType === 'none') {
    //   // public app
    //   ability.update(this.state.roles.AUTHENTICATED);
    //   this.setStateItem('redirect', appConfig.loginDestination);
    // } else {
    //   // auth app
    //   await this.login();
    // }
  };
}

export const appStore = new AppStore();

