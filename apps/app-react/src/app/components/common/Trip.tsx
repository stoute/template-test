import React, { useEffect, useState } from 'react';
import * as actions from '../../actions/actions';
import { useAppContext } from '../../hooks';
import {
  ITripState,
  useTrip,
} from '@bsmp/entities';
import { Icon, Flex } from '@bsmp/react';
import { BsmCollapsible, BsmLoadingSpinner } from '@bsmp/webcomponents-react';
import { interval } from 'rxjs';

type props = {
  id?: string;
  data: ITripState;
  match?: any;
  onSave?: any;
  updateAction?: Function;
};

const Trip = ({ data, updateAction }: props) => {
  const { util, t } = useAppContext();
  const {
    state,
    stateFormatted,
    type,
    updateEntityItem,
  } = useTrip(data, updateAction as Function);

  useEffect(() => {
    updateEntityItem('startTime', String(new Date()));
    const int = interval(1000).subscribe(() => {
      updateEntityItem('currentTime', String(new Date()));
    });
    return () => {
      console.log('component exit state', state);
      int.unsubscribe();
    };
  }, []);

  if (!stateFormatted) return <BsmLoadingSpinner type={'ios'} />;

  return (
    <div>
      {state && state.id && (
        <div className={'container'}>
          {/*<div>*/}
          {/*    <div className={''} history={history} text={t('common:'+type+'_plural').toUpperCase()} onClick={() => {*/}
          {/*        navigate('/trips')*/}
          {/*    }} />*/}
          {/*</div>*/}
          <div>
            <h6 className={'text-center pt-4'}>{stateFormatted.tripType}</h6>
            <h5 className={'text-center pt-1'}>{stateFormatted.dateDisplay}</h5>
            <hr />
            <ul
              className={'list-unstyled text-center'}
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              <li style={{ flex: 0.333 }} key={1}>
                <Icon name={'time'} />
                <div>{stateFormatted.currentTime}</div>
              </li>
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
            {/*<li itemDivider id={util.getUUID()}>*/}
            {/*    <div>{t('common:from').toUpperCase() + ' / ' +t('common:to').toUpperCase()}</div>*/}
            {/*</li>*/}
            <div className={'card text-center'}>
              <div className="card-body">
                <div>
                  <Icon name={'pin'} />
                  <div style={{ paddingLeft: 5 }}>
                    <div>{state.startAddress.split(', ')[0]}</div>
                    <div>
                      {state.startAddress.split(', ')[2] +
                        ', ' +
                        state.startAddress.split(', ')[3]}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">

                  <Icon name={'pin'} />
                  <div style={{ paddingLeft: 5 }}>
                    <div>{state.endAddress.split(', ')[0]}</div>
                    <div>
                      {state.endAddress.split(', ')[2] +
                        ', ' +
                        state.endAddress.split(', ')[3]}
                    </div>
                  </div>
              </div>
              </div>
            </div>
            {/*<ul className={'list-unstyled text-center'}>*/}
            {/*  <li key={util.getUUID()}>*/}
            {/*    <div>{t(type + ':tripType').toUpperCase()}</div>*/}
            {/*  </li>*/}
            {/*  <li*/}
            {/*    key={util.getUUID()}*/}
            {/*    // selected={state.tripType === 'ZAKELIJK'}*/}
            {/*    // onClick={() => {*/}
            {/*    //   updateEntityItem(*/}
            {/*    //     'tripType',*/}
            {/*    //     'ZAKELIJK',*/}
            {/*    //     actions.updateEntity(state, type)*/}
            {/*    //   );*/}
            {/*    // }}*/}
            {/*  >*/}
            {/*    <div>*/}
            {/*      <div>{t(type + ':ZAKELIJK')}</div>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*      /!*<Radio selected={state.tripType === 'ZAKELIJK'} />*!/*/}
            {/*    </div>*/}
            {/*  </li>*/}
            {/*  <li*/}
            {/*    key={util.getUUID()}*/}
            {/*    // selected={state.tripType === 'PRIVE'}*/}
            {/*    // onClick={() => {*/}
            {/*    //   updateEntityItem(*/}
            {/*    //     'tripType',*/}
            {/*    //     'PRIVE',*/}
            {/*    //     actions.updateEntity()*/}
            {/*    //   );*/}
            {/*    // }}*/}
            {/*  >*/}
            {/*    <div>*/}
            {/*      <div>{t(type + ':PRIVE')}</div>*/}
            {/*    </div>*/}
            {/*    <div>/!*<Radio selected={state.tripType === 'PRIVE'} />*!/</div>*/}
            {/*  </li>*/}
            {/*</ul>*/}
          {/*</div>*/}
        </div>
      )}
    </div>
  );
};

export default Trip;
