import {useEffect, useState} from 'react';
import {Observable, Subscription} from 'rxjs';
import {entitiesService} from '../providers/entities-service';
import {appStore as store} from '../providers/app-store';

interface Entity {
   id: any;
   type: string;
}
interface EntityState {
    entities: any[],
    active: Entity | null;
    subscriptions: Subscription[]
}

function onEmit<T>(source$:Observable<T>, nextFn:(value: T) => void): Subscription {
    return source$.subscribe(nextFn, console.error);
}

/**
 * Custom Hook to manage a viewModel for Entities view components
 */
export function useEntities(type: string): [EntityState, ((activeid) => void), ((newEntity) => void)] {
    // const setActive = (id: ID) => entitiesService.setActive(id);
    // const setActive = (id: ID) => entitiesService.loadEntity$(id);
    const setActiveId = (activeId) => {
      console.log('setActiveId',activeId);
      entitiesService.loadEntity$(activeId)
    };
    const setActiveEntity = (newEntity) => {
      // console.log('setEntity',newEntity);
      // entitiesService.setActive(newEntity.id)
    };
    const [state, setState] = useState({ entities: [], active: null } as EntityState);
    /**
     * Load all entities and build selectors for `entities` or `active` state changes
     * Manage subscriptions with auto-cleanup
     */
    useEffect(() => {
      entitiesService.loadEntities$(type);
      const subscriptions: Subscription[] = [
        onEmit<Entity[]>(entitiesService.loadEntities$(type), entities => setState(state => ({ ...state, entities  })) ),
        onEmit<Entity>(entitiesService.loadEntity$(), active => setState(state => ({ ...state, active })) )
      ];
        return () => { subscriptions.map(it => it.unsubscribe()) };
    },[]);

    useEffect(() => {
        // store.setState({...store.state, ...state})
        console.log('useEntities=.sate',state);
        console.log('useEntities.active=',state.active);
        console.log('store.state.active=',store.state.activeEntity);
    }, [state])

    return [state, setActiveId, setActiveEntity]
}
