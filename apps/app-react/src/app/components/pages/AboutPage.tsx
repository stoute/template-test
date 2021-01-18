import React, {useContext, useEffect, useState} from 'react';
import { CSSTransition } from 'react-transition-group';
import {About as SkAbout} from '../../../assets/sketch/index';

const AboutPage = () => {

    const [start,setStart] = useState(false)
    const delay = 300;

    useEffect(() => {
        setTimeout(() => {
            setStart(true)
        }, delay)
    },[]);

    return (
        <div className={'container pt-5 d-flex flex-column text-center'}>
            {start === true &&
                // @ts-ignore
                <CSSTransition
                    classNames="fade-transition"
                    appear={true}
                    timeout={0}
                    // timeout={{
                    //     // appear: delay,
                    //     enter: delay,
                    //     // exit: 500,
                    // }}
                    // unmountOnExit
                    // onEnter={() => setShowButton(false)}
                    // onExited={() => setShowButton(true)}
                >
                    <SkAbout version={'0.0.1'} />
                </CSSTransition>
            }
        </div>
    );
};

export default AboutPage;
