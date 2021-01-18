import React, { useEffect, useState } from 'react';
import Trip from '../../common/Trip';
import { useAppContext } from '../../../hooks';
import { BsmCollapsible, BsmLoadingSpinner } from '@bsmp/webcomponents-react';
import { DataForm } from '@bsmp/react';
import { tripFormDefinitions } from '@bsmp/entities';

export default ({ id, type, editable, viewMode }) => {
  const { store, actions, t } = useAppContext('EntitiesPage');
  const [state, setState] = useState();

  useEffect(() => {
    actions
      .getEntity(id, store.state.entityDefinitions[type].pathPlural)
      .then((res) => setState(res));
  }, []);

  if (state) {
    if (type === 'trip')
      return (
        <div className={'container'}>
          <Trip data={state} id={id} updateAction={actions.updateEntity}></Trip>
          {editable === true && (
            <BsmCollapsible label={t('core:EDIT')} collapsed={true}>
              <DataForm
                data={state}
                onFormSubmit={actions.updateEntity}
                formDefinitions={tripFormDefinitions.default}
              ></DataForm>
            </BsmCollapsible>
          )}
        </div>
      );
  }
  return (
    <div className={'text-center'}>
      <BsmLoadingSpinner type={'ios'} />
    </div>
  );
};
