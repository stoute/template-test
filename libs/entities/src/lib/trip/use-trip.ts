import { useEffect, useState } from 'react';
import { Util } from '@bsmp/core';
import {
  TripEntity,
  ITripState,
  ITripStateFormatted,
} from './trip-entity';

export const useTrip = (
  initialState: ITripState = null,
  // updateAction: typeof Function = null,
  updateAction,
  entityRef: TripEntity = null
) => {
  const entity: TripEntity = entityRef || new TripEntity(initialState);
  const [state, setState] = useState<ITripState>(initialState);
  const [
    stateFormatted,
    setStateFormatted,
  ] = useState<ITripStateFormatted | null>(entity.stateFormatted);

  useEffect(() => {
    entity.initialState = state;
    entity.setState(state)
    return () => {
      exitEntity();
    };
  }, []);

  useEffect(() => {
    if (state) entity.setState(state);
    setStateFormatted(entity.stateFormatted);
  }, [state]);

  const updateEntity = async (updatedEntity: ITripState) => {
    let response;
    entity.setState({ ...entity.state, ...{ timestamp: Util.getTimeStamp() } });
    if (updateAction) response = await updateAction(updatedEntity);
    entity.setState({ ...entity.state, ...updatedEntity });
    setState({ ...state, ...updatedEntity });
    if (response) entity.setState({ ...entity.state, ...response });
    setState({ ...state, ...response });
    setStateFormatted(entity.stateFormatted);
  };

  const updateEntityItem = async (field: string, value: any) => {
    await updateEntity({
      id: entity.state.id,
      type: entity.state.type,
      [field]: value,
    });
  };

  const exitEntity = async () => {
    updateEntityItem('endTime', String(new Date()));
    updateEntityItem('currentTime', String(new Date()));
  };

  return {
    ...entity,
    ...{
      state,
      setState,
      stateFormatted,
      updateEntity,
      updateEntityItem,
    },
  };
};
