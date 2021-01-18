import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import { AbilityBuilder } from '@casl/ability';

export const ability = AbilityBuilder.define((can, cannot) => {
  // can('read', 'all')
  // can('manage', 'Post', { author: loggedInUser.id })
  // cannot('delete', 'Post', { 'comments.0': { $exists: true } })
});
export const AbilityContext = createContext(ability);
export const Can = createContextualCan(AbilityContext.Consumer);

export const useAbilityContext = () => {
  return {
    ability,
    AbilityContext,
    Can,
  };
};
