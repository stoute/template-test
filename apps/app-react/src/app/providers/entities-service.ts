import { Observable, of } from 'rxjs';
import { HttpService } from '@bsmp/rx';
import { appStore as store } from './app-store';
import { Util } from '@bsmp/core';
import { tripEntityDefinition, userEntityDefinition } from '@bsmp/entities';
import { IEntityDefinition } from '@bsmp/core';

interface IEntity {
  id: any;
  type: string;
}

const http = HttpService.instance;

class EntitiesService {
  private _entities: IEntity[] = [];
  private _entitiy: IEntity;
  private _entityCollections: {};
  private _type: any;
  private _activeId: any;
  private _entityDefinitions = {
    trip: tripEntityDefinition,
    user: userEntityDefinition,
  };
  public currentEntityDefinition: IEntityDefinition;
  public apiUrl: string = '';

  get entities(): IEntity[] {
    return [...this._entities];
  }
  get activeEntity(): IEntity | null {
    return this.findEntityByany(this._activeId);
  }
  get entityTypes() {
    return this._entityDefinitions;
  }

  constructor() {
    this._entityDefinitions = {...this._entityDefinitions, ...store.state.entityDefinitions}
  }

  loadEntities$(type): Observable<IEntity[]> {
    console.log('EntitiesService.loadEntities$: ' + type);
    this.currentEntityDefinition = this._entityDefinitions[type];
    const entityDefinition: IEntityDefinition = this._entityDefinitions[type];
    let typePath = entityDefinition.type;
    if (!this._type) {
      this._type = entityDefinition.type;
    }
    if (entityDefinition.pathPlural) {
      typePath = entityDefinition.pathPlural;
    }
    let url = store.state.apiUrl + `/${typePath}`;
    if (store.config.get().dev) {
      url = store.state.apiUrl + `/${typePath}/index.json`;
    }
    return http.get(url);
  }

  loadEntity$(
    id: any = undefined,
    entityDefinition = this.currentEntityDefinition
  ): Observable<IEntity> {
    console.log('EntitiesService.loadEntity$: ' + id);
    if (!id) {
      return of({ id: Util.getUUID(), type: entityDefinition.type });
    }
    if (!this.currentEntityDefinition) {
      this.currentEntityDefinition = entityDefinition;
    }
    if (!id && this.entities.length) {
      id = this.entities[0].id;
    }
    this._activeId = id;
    console.log('loadEntity$ id= ' + this._activeId);
    let url = store.state.apiUrl + `/${entityDefinition.path}/${id}`;
    if (store.config.get('dev')) {
      // url = store.state.apiUrl + `/assets/data/mock/${entityType.path}/8794043.json`;
      url = store.state.apiUrl + `/${entityDefinition.path}/${id}.json`;
    }
    // if(this.findEntityByany(id && store.state.cache)) {
    //     // todo: make cache obdservable
    //     console.log('cached: '+id);
    //     // return of(this.loadEntity$(this.findEntityByany(id)))
    // }
    console.log(url);
    return http.get(url);
  }

  setActive(id: any, entityType): Observable<IEntity> {
    // return of(this.loadEntity$(id ,entityType))
    return this.loadEntity$(id, entityType);
  }

  updateEntity(newEntity: IEntity): IEntity | null {
    let result: IEntity | null = null;
    this._entities = this._entities.map((it) => {
      if (it.id === newEntity.id) {
        result = { ...it, ...newEntity };
        return result;
      }
      return it;
    });
    return result;
  }

  findEntityByany(id: any): IEntity | null {
    return this.entities.reduce((result, it: IEntity) => {
      return result || (it.id === id ? it : null);
    }, null);
  }
}

export const entitiesService = new EntitiesService();
