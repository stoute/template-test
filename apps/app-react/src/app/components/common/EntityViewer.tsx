import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BsmCollapsible,
  BsmLoadingSpinner,
} from '@bsmp/webcomponents-react/dist/index';
import { DataForm } from '@bsmp/react';
import {
  TripEntity,
  ITripState,
  useTrip,
  ITripEntity,
  tripFormDefinitions
} from '@bsmp/entities';

type props = {
  id?: string;
  data?: ITripState;
  type?: string;
  fields?: string[];
  editable?: boolean;
  updateAction?: any;
  formDefinitions?: any;
};

const EntityViewer = ({
  data,
  updateAction,
  fields,
  editable,
  formDefinitions,
}: props) => {
  const {
    state,
    setState,
    stateFormatted,
    type,
    updateEntityItem,
    updateEntity,
  } = useTrip(data, updateAction as Function);
  const { t } = useTranslation();
  let rows;

  useEffect(() => {
    if (data) setState(data);
  }, [data]);

  if (!stateFormatted)
    return <BsmLoadingSpinner type={'ios'} />;

  let obj = Object.keys(stateFormatted);
  if (fields) {
    obj = fields;
  }
  rows = obj.map((key) => {
    return (
      <tr key={key}>
        <td>{t(type + ':' + key)}</td>
        <td>{stateFormatted[key]}</td>
      </tr>
    );
  });

  return (
    <div className={'pt-2'}>
      <table style={{ width: '80%' }} className={'table'}>
        <tbody>{rows}</tbody>
      </table>
      {editable === true && (
        <BsmCollapsible label="Edit" collapsed={true}>
          {/*<BsmJsonViewer data-json={JSON.stringify(state)}></BsmJsonViewer>*/}
          <DataForm
            data={state}
            onFormSubmit={updateAction}
            formDefinitions={tripFormDefinitions.default}
          ></DataForm>
        </BsmCollapsible>
      )}
    </div>
  );
};

export default EntityViewer;
