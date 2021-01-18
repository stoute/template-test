import React, { useContext, useEffect, useState } from 'react';
import EntityList from './EntityList';
import EntityDetails from './EntityDetails';
import { useEntities } from '../../../hooks/use-entities';
import { useAppContext } from '../../../hooks';
import {tripEntityDefinition} from '@bsmp/entities';

/**
 * Note the Entities facade provides:
 *   1) eventHandlers used to trigger logic activity an [later] push data updates
 *   2) Internal state hooks to trigger view rendering
 *   3) Async, internal data pushes
 */
const EntitiesPage = ({ match }) => {
  const { actions, store, navigate } = useAppContext('EntitiesPage');
  const [state, setActiveId, setActiveEntity ] = useEntities(
    match.params.type
  );

  useEffect(() => {
      console.log('EntitiesPage.entities',state.entities);
      console.log('EntitiesPage.active',state.active);
  },[state])
  // useEffect(() => {
  //     console.log('%%%%%%%%%%%');
  // },[state])

  if (match.params.id) {
    return (
      <EntityDetails
        id={match.params.id}
        type={match.params.type}
        editable={true}
        viewMode={'full'}
      />
    );
  };

  return (
    <div>
      <EntityList
        entities={state.entities}
        onSelect={setActiveId}
        type={match.params.type}
      />
    </div>
  );
};
export default EntitiesPage;
