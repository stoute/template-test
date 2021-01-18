import {TranslateService} from '@bsmp/core';
import {HttpService} from '@bsmp/rx';
// import * as firebase from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';
import {appStore as store} from '../providers/app-store';
import {entitiesService} from '../providers/entities-service';
const http = HttpService.instance;
const translateService = TranslateService.instance;

export const navigate = async (path: string, routeState: any = undefined) => {
  window.location.href = path;
};

export const setStateItem = (key: string, value: any) => {
    store.setStateItem(key, value)
};

export const submitLoginForm = async (event: CustomEvent) => {
     const loginResult = await loginFirebase(event.detail.data.username, event.detail.data.password)
    .then((response) => {
      if (response && response.message) {
         console.warn('firebase login error',response.message);
        return;
      }
      window.location.href = '/';
      return response;
    });
     return loginResult
};

export const loginFirebase = async (username, password, type = 'email-password') => {
    const res: any = await store.fb.login(username, password, type = 'email-password');
    if (res && res.message) {
        return res;
    }
    if (!store.config.get().dev) {
        store.ability.update(store.state.roles.AUTHENTICATED);
    } else {
        store.ability.update(store.state.roles.DEVELOPER);
    }
    store.setStateItem('user', store.fb.currentUser);
    store.setStateItem('authenticated', true);
    store.setStateItem('showLoginModal', false);
};

export const logoutFirebase = async () => {
    await store.fb.logout().then((response) => {
        store.setStateItem('authenticated', false)
        store.ability.update(store.state.roles.ANONYMOUS);
    })
}

export const getEntities = async (entityId: string) => {
    let url = store.config.get('apiUrl') + '/' + entityId
    if (store.config.get().dev) {
        url += '/index.json';
    }
    const entitiesRes: any[] = await http.get(url).toPromise()
    let entities = store.state.entities;
    entitiesRes.map((entity) => {
        entities[entity.id] = entity;
    })
    store.setState({...store.state, entities})
    let collections = {...store.state.entityCollections, [entityId]: entitiesRes};
    store.setState({...store.state, entityCollections: collections})
    return entitiesRes
};

export const getEntity = async (id, path: string) => {
    let url = store.config.get('apiUrl') + '/' + path + '/' + id;
    if (store.config.get().dev) {
        url += '.json';
    }
    console.log(url);
    const entity = await http.get(url).toPromise().catch(() => {
        console.warn('error loasding entity');
        return;
    });
    let entities = store.state.entities;
    entities[id] = entity;
    store.setState({...store.state, entities})
    return entity;
};

// todo:
export const updateEntity = async (entityState: any, type: string = 'trip') => {
    // let url = store.state.apiUrl + `/${type}/${entityState.id}`;
    // let result = await http.post(url, entityState).toPromise().catch(() => {
    //     console.warn('error updating entity');
    // });
    // store.setStateItem('entity', result);
    let result = entityState;
    //console.log('update',entityState);
    store.setStateItem('entity', result);
    return result;
};

export const fetchData = async (url: string) => {
    store.setStateItem('data', await http.get(url).toPromise());
};

export const getCollection = async (collectionId: string) => {
    let docs = [];
    await firebase.firestore().collection(collectionId).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            docs.push(doc.data())
        });
    });
    return docs
};

export const addUser = (data) => {
    firebase.firestore().collection('users').add(data).then(() => showFlashMessage('user saved', 'success'));
};

export const hideLoginForm = () => {
    store.setStateItem('showLoginModal', false)
};

export const showFlashMessage = (msg: string, type: string = 'primary', duration = 3000) => {
    document.querySelector('bsm-flash-message')['show'](msg, type, duration);
};

export const showLoginModalForm = () => {
    store.setStateItem('showLoginModal', true)
};

export const translate = (string: string) => {
    return translateService.get(string);
};




