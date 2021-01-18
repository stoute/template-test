import { BaseEntity, IBaseEntity, IBaseEntityState, IEntityDefinition } from '@bsmp/core';
import { tripFormatter } from './tripFormatter';
import { tripTranslations } from './tripTranslations';

export interface ITripEntity extends IBaseEntity {
  state: ITripState;
  stateFormatted?: ITripStateFormatted;
  translations?: typeof tripTranslations;
  initialState?; ITripState;
}

export interface ITripState extends IBaseEntityState {
  vehicleId?: number;
  deviceId?: number;
  driverId?: number;
  startTime?: object;
  endTime?: string;
  currentTime?: string;
  description?: string;
  startMileage?: number;
  endMileage?: number;
  distanceInKm?: number;
  endAddress?: string;
  averageSpeed?: number;
  tripType?: string;
  startAddress?: string;
  durationInHour?: number;
  vehicle?: any;
}

export const tripEntityDefinition: IEntityDefinition = {
  type: 'trip',
  name: 'Trip',
  description: '',
  namePlural: 'Trips',
  path: 'trip',
  pathPlural: 'trips',
};

export interface ITripStateFormatted extends ITripState {
  dateDisplay?: string;
  dateDisplayShort?: string;
}

export class TripEntity extends BaseEntity {
  public state: ITripState;
  public stateFormatted: ITripStateFormatted;
  public initialState: ITripState;
  public type: string = 'trip';
  public typeDefinition = tripEntityDefinition;
  public formattedFields = ['dateDisplay', 'dateDisplayShort'];
  public translations = tripTranslations;
  public formatter = tripFormatter;

  constructor(initialState: ITripState) {
    super(initialState);
  }
}

export const tripFormDefinitions = {
  default: {
    data: {
      type: 'trip',
      id: 'trip',
      attributes: {
        username: '',
        password: '',
      },
      meta: {
        definitions: {
          id: {
            hidden: true,
          },
          username: {
            label: 'USERNAME',
            tag: 'input',
            type: 'text',
            constraints: {
              presence: true,
              length: {
                minimum: 3,
                maximum: 70,
              },
            },
            permissions: ['read', 'update'],
          },
          password: {
            label: 'PASSWORD',
            tag: 'input',
            type: 'password',
            placeholder: '',
            constraints: {
              presence: true,
              length: {
                minimum: 8,
                message:
                  '^This field must be at least %{count} characters long',
              },
            },
            permissions: ['read', 'update'],
          },
        },
        permissions: ['read', 'update'],
      },
    },
  },
};

export const tripFragment = `fragment TripFragment on Trip {
  id
  vehicleId
  deviceId
  driverId
  startTime
  endTime
  description
  startMileage
  endMileage
  distanceInKm
  endAddress
  averageSpeed
  tripType
  startAddress
  durationInHour
  vehicle {
    identification
    brand
  }
}`;
