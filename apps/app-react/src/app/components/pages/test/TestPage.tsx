import React, { useContext, useEffect, useState } from 'react';
import { BaseEntity } from '@bsmp/core';
import { Fade, Stagger } from 'react-animation-components';
import { Button, Modal, ModalDialog } from 'react-bootstrap';
import { interval } from 'rxjs';
import {
  BsmCollapsible,
  BsmIframe,
  BsmJsonViewer,
} from '@bsmp/webcomponents-react';

import * as actions from '../../../actions/actions';
import { useAbilityContext, useAppContext } from '../../../hooks';
import DataViewer from '../../common/DataViewer';

import FlexTest from './FlexTest';
import IconTest from './IconTest';
import { RoundedButton } from '../../common/styledComponents';
import EntityViewer from '../../common/EntityViewer';
import { useTranslation } from 'react-i18next';
import { Css } from '@bsmp/core';
import { Flex } from '@bsmp/react';
import { tripFormDefinitions } from '@bsmp/entities';

const TestPage = (props) => {
  const { ability, Can } = useAbilityContext();
  const { actions, http, navigate, store, util } = useAppContext(
    props,
    'Test'
  );
  const [state, setState] = useState({});
  const { t } = useTranslation();
  // const ability = useContext(AbilityContext);
  const config = store.state.config;
  const data = store.state.data;
  let subscription;

  useEffect(() => {
    setState({ ...state, ...store.state });
    subscription = store.state$.subscribe((appState) => {
      setState({ ...state, ...appState });
    });
    if (!data) {
      // actions.getEntities('trips').then((data) => {
      //   // setState({ ...state, data: store.state.collections['trips'] });
      // });
    }


    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const test1 = (p?: any) => {
    actions.setStateItem('test', Math.random());
    actions.setStateItem('random', Math.random());
    // @ts-ignore
    store.setConfigItem('test', 'test' + Math.random());
    console.log(store.state);
    console.log(store.config.get('test'));
  };

  const test2 = (p?: any) => {
    // actions.addUser({
    //   id: util.getUUID(),
    //   email: 'stoute@planet.nl',
    //   fullname: 'bobby',
    // });
    const entity = new BaseEntity({ foo: 'bar' });
    console.log('##############', entity);
    console.log('entity', entity);

    console.log(entity.id);
    console.log('entity', entity);
  };

  return (
    <div className={'container'}>
      <Flex
        className={'text-center'}
        flexDirection={'row'}
        padding={'0'}
        alignItems={'center'}
        justifyContent={'space-around'}
      >
        <RoundedButton
          className={'m-1'}
          onClick={() => {
            test1()
          }}
        >
          Update app.state
        </RoundedButton>
        <RoundedButton className={'m-1'} onClick={test2()}>
          Test
        </RoundedButton>
      </Flex>

      <DataViewer label={'store.state'} collapsed={false} data={state} />

      <BsmCollapsible label={'Icon + IconButton components'} collapsed={true}>
        <IconTest />
      </BsmCollapsible>

      <BsmCollapsible label={'Flex component'} collapsed={false}>
        <FlexTest />x
      </BsmCollapsible>

      {store.state.entityCollections['trips'] && (
        <BsmCollapsible label={'Entity'} collapsed={true}>
          <EntityViewer
            // id={store.state.collections['trips'][0].id}
            data={store.state.entityCollections['trips'][0]}
            type={'trip'}
            formDefinitions={tripFormDefinitions.default}
            updateAction={actions.updateEntity}
          />
        </BsmCollapsible>
      )}

      <div className={'p-3 d-flex flex-column text-center'}></div>

      {/*<Stagger in={store.state.test}>*/}
      {/*    {items.map(item => (*/}
      {/*            <Fade>*/}
      {/*                <RoundedButton>Each {item} will transition in with an incrementally larger delay than the previous</RoundedButton>*/}
      {/*            </Fade>*/}
      {/*        )*/}
      {/*    )}*/}
      {/*</Stagger>*/}

      {/*{data.map((collection) => {*/}
      {/*    <div>{collection}</div>*/}
      {/*})}*/}

      {/*<Logo data={{title: 'dynamic title'}} />*/}
      {/*  <bsm-slider></bsm-slider>*/}

      {/*<Iframe src={'https://variations.firebaseapp.com'}  />*/}
    </div>
  );
};

export default TestPage;
