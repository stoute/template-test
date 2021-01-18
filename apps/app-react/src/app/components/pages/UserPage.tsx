import React, { useContext, useEffect, useRef, useState } from 'react';
import { Icon, Spacer, useObserve } from '@bsmp/react';
import { Redirect } from 'react-router-dom';
import { Fade } from 'react-animation-components';
import Flexbox from 'flexbox-react';

import { useAbilityContext, useAppContext } from "../../hooks";
import { PageTitle, RoundedButton } from '../common/styledComponents';

const UserPage = (props) => {
  const { ability, Can, AbilityContext  } = useAbilityContext();
  const { actions, dispatch, store, t } = useAppContext(props, 'UserPage');
  const authenticated = useObserve(store.state$, 'authenticated');

  useEffect(() => {}, [authenticated]);

  return (
    <Fade in className={'text-center'}>
      <Flexbox
        flexDirection="column"
        minWidth="100vw"
        minHeight="50vh"
        alignItems={'center'}
      >
        <Can do={'login'} on={'all'}>
          <PageTitle>User</PageTitle>
          <Spacer height={20}  />
          <Fade in delay={100} duration={1000}>
            <RoundedButton onClick={() => actions.showLoginModalForm()}>
              <Icon name="log-in" size={'medium'}></Icon>
              <br />
              {t('core:EDIT')}
            </RoundedButton>
          </Fade>
        </Can>
        <Can do={'logout'} on={'all'}>
          <PageTitle>User</PageTitle>
          <Fade in delay={100} duration={1000}>
            <RoundedButton onClick={() => {
              // actions.logoutFirebase()
            }}>
              <Icon name="log-out" size={'medium'}></Icon>
              <br />
              {t('core:EDIT')}
            </RoundedButton>
          </Fade>
        </Can>

        {/*<Flexbox flexGrow={1}>*/}
        {/*  <div className={'container'}>*/}
        {/*    <div className={'row '}>*/}
        {/*      <div className={'col-md-6'}>*/}
        {/*        <h6 className={'pl-3 pl-md-2'}>Succesfully logged in</h6>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    <div className={'row '}>*/}
        {/*      <div className={'col-md-6'}>*/}
        {/*        <RoundedButton onClick={() => actions.logoutFirebase()}>*/}
        {/*          /!*<RoundedButton onClick={() => dispatch(actions.logoutFirebase())}>*!/*/}
        {/*          <ion-icon name="log-out" size={'large'}></ion-icon>*/}
        {/*          <br/>*/}
        {/*          <bsm-translate string={'LOGOUT'}></bsm-translate>*/}
        {/*        </RoundedButton>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</Flexbox>*/}

        {/*<Flexbox element="footer" height="60px">*/}
        {/*  Footer*/}
        {/*</Flexbox>*/}
      </Flexbox>
    </Fade>
  );
};

export default UserPage;
