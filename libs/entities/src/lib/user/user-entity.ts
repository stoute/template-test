import { BaseEntity, IBaseEntity, IBaseEntityState, IEntityDefinition } from '@bsmp/core';
import { userFormatter } from './userFormatter';
import { userTranslations } from './userTranslations';

export interface IUserEntity extends IBaseEntity {
  state: IUserState;
  stateFormatted?: IUserStateFormatted;
  translations?: typeof userTranslations;
  initialState?; IUserState;
}

export interface IUserState extends IBaseEntityState{
  name: string;
  email: string;
  roles?: unknown;
  authenticated?: boolean;
  avatar?: unknown;
}

export interface IUserStateFormatted extends IUserState {
  avatarDisplay?: string;
}

export const userEntityDefinition = {
  type: 'user',
  description: 'common:USER',
  name: 'User',
  namePlural: 'Users',
  path: 'user',
  pathPlural: 'users',
}

export class UserEntity extends BaseEntity {
  public state: IUserState;
  public stateFormatted: IUserStateFormatted;
  public initialState: IUserState;
  public type: string = 'user';
  public typeDefinition = userEntityDefinition;
  public formattedFields = ['avatarDisplay'];
  public translations = userTranslations;
  public formatter = userFormatter;

  constructor(initialState: IUserState) {
    super(initialState);
  }
}

export const userFormDefinitions = {

  default: {
    "data": {
      "type":"user",
      "id":"userForm",
      "attributes":{
        "username":"",
        "password":""
      },
      "meta":{
        "definitions":{
          "username":{
            "label":"USERNAME",
            "tag":"input",
            "type":"text",
            "constraints":{
              "presence": true,
              "length":{
                "minimum": 3,
                "maximum": 70
              }
            },
            "permissions": ["read","update"]
          },
          "password":{
            "label":"PASSWORD",
            "tag":"input",
            "type":"password",
            "placeholder":"",
            "constraints":{
              "presence": true,
              "length":{
                "minimum": 8,
                "message":"^This field must be at least %{count} characters long"
              }
            },
            "permissions": ["read","update"]
          }
        },
        "permissions":[
          "read",
          "update"
        ]
      }
    }
  }

};

export const userFragment = `fragment UserFragment on User {
  id
  email
  name
  profile {
    name
    address
  }
}`;

