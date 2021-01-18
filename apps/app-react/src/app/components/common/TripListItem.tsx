import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../hooks';
import {
  ITripState,
  useTrip,
} from '@bsmp/entities';
import { Icon, Flex } from '@bsmp/react';
import { BsmLoadingSpinner } from '@bsmp/webcomponents-react';

type props = {
  data: ITripState;
};

const TripListItem = ({ data }: props) => {
  const { t } = useAppContext();
  const {
    state,
    stateFormatted,
  } = useTrip(data, null);

  if (!stateFormatted) return <BsmLoadingSpinner type={'ios'} />;

  return (
    <div>
      {state && state.id && (
        <div className={'container'}>
          <div>
            <h5 className={'text-center pt-3'}>{stateFormatted.dateDisplay}</h5>
            <br />
            <ul
              className={'list-unstyled text-center'}
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <li style={{ flex: 0.333 }} key={2}>
                <Icon name={'time'} />
                <div>{stateFormatted.startTime}</div>
              </li>
              <li style={{ flex: 0.333 }} key={3}>
                <Icon name={'arrow-forward-circle'} />
                <div>{stateFormatted.distanceInKm}</div>
              </li>
              <li style={{ flex: 0.333 }} key={4}>
                <Icon name={'car'} />
                <div>
                  {stateFormatted.averageSpeed + ' ' + t('trip:km/hour')}
                </div>
              </li>
            </ul>
          </div>
          <hr />
        </div>
      )}
    </div>
  );
};

export default TripListItem;
