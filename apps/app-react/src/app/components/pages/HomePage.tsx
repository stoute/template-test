import React, {useContext, useEffect, useState} from 'react';
import {IonIcon,IonButton,IonRow,IonCol} from '@ionic/react';
// import { happy } from 'ionicons/icons';
import Flexbox from 'flexbox-react';
import {interval, timer} from 'rxjs'
import {Fade} from 'react-animation-components';
import {useObserve} from '@bsmp/react';

import { useAbilityContext, useAppContext } from "../../hooks";
import {Splash} from '../../../assets/sketch/index';
import {PageTitle, RoundedButton} from '../common/styledComponents';

const HomePage = (props) => {
    const { Can } = useAbilityContext();
    const {actions, store, t} = useAppContext(props, 'Test');
    const delay = 40;
    const authenticated = useObserve(store.state$, 'authenticated')

    return (
        <div className={' d-flex flex-column text-center'}>
            {/*<Flexbox alignContent={'center'} flexDirection={'column'} justifyContent={'space-around'} minHeight={'100vh'}>*/}
                <Fade in delay={delay*5}>
                    <PageTitle>{t('app.name')} </PageTitle>
                </Fade>
                <Fade in delay={delay*0}>
                    <Splash className={'d-block'} />
                    <h5>{t('app.description')} </h5>
                </Fade>
                {/*<IonIcon name={'pin'} size={'big'}></IonIcon>*/}
            {/*</Flexbox>*/}
        </div>
    );
};

export default HomePage;
