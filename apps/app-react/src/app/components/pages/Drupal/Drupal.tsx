// @ts-nocheck
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Modal, Button, ButtonToolbar, OverlayTrigger, Popover} from 'react-bootstrap';
import {Drupal as DrupalClass} from '@bsmp/api';
import {LoginForm} from '@bsmp/react';
import { BsmDrupalNode} from '@bsmp/webcomponents-react';
import {fromEvent, Subscription, timer} from 'rxjs';
import {Toolbar, ToolbarButton, RoundedButton} from '../../common/styledComponents';
import { useAppContext } from "../../../hooks";

const Drupal = (props) => {

    const [currentNode, setCurrentNode] = useState(null);
    const [currentMenu, setCurrentMenu] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [showLoginModal, setShowLogin] = useState(false);
    const [submitError, setSubmitError] = useState();
    const {actions, ability, http, store, t} = useAppContext(props, 'Drupal');
    const drupal: DrupalClass = useContext(React.createContext(new DrupalClass()));
    const drupalId: string = props.match.params.drupalId || 'local.streamer.nl';

    useEffect(() => {
        const config = store.state.config.drupal[drupalId];
        if(document.location.hostname.match('localhost')){
            config.static = false
        }
        drupal.init(config).then(() => {
            getData().then(() => {
                console.log('loaded');
                console.log(drupal);
                setCurrentMenu(drupal.model.menus[drupal.options.main_menu])
            })
        });
        return () => { };
    },[]);

    const getData = async ()=> {
        if (drupalId.match('local.streamer')) {
            // await drupal.jsonApi.getAllCollections();
            await drupal.jsonApi.getCollection('view--view');
            // await drupal.nodeLoad(drupal.options.frontpage_nid);
            await drupal.menuLoad(drupal.options.main_menu, true);
            // await drupal.menuLoad(drupal.options.secondary_menu, true);
            await getNode(drupal.options.frontpage_nid);
        }
        if (drupalId.match('stoute.streamer')) {
            drupal.options.app.menus.forEach(async (menu) => {
                await drupal.menuLoad(menu,true);
            });
            drupal.options.app.books.forEach(async (bid) => {
                await drupal.bookLoad(bid,true);
            });
            drupal.options.app.nodes.forEach(async (nid) => {
                await drupal.nodeLoad(nid);
                // await drupal.jsonApi.getNode(nid)
            });
            if (drupal.options.cache) {
                drupal.saveLocalModel(drupal.model, drupal.options.domain);
            }
            // await drupal.getSiteData(promises).then(() => {
            //     // console.log(drupal.model);
            //     // this.storeDrupalToFirebase();
            // });
            // await getNode(drupal.options.app_nid);
            // await getNode(drupal.options.frontpage_nid)
            // drupal.jsonApi.getNode(drupal.options.frontpage_nid).then((node) => {
            //     console.log(node);
            // })
        }
    };

    const getNode = async(nid, type: string = '') => {
        console.log(nid);
        const node: any = await drupal.jsonApi.getNode(Number(nid), type);
        setCurrentNode(node)
    };

    const login = (event: CustomEvent) => {
        setSubmitError(undefined);
        drupal.login(event.detail.data.username, event.detail.data.password).then((user) => {
            setAuthenticated(true);
            setShowLogin(false)
        }).catch((error) => {
            setSubmitError(error.message)
        })
    };

    const logout = (event: CustomEvent) => {
        drupal.logout().then((response) => {
            console.log(response);
            setAuthenticated(false);
        }).catch((error) => {
            console.error(error.message)
        })
    };

    const onMenuClick = (item: any) => {
        if(item.link.route_parameters.node) {
            getNode(item.link.route_parameters.node);
        }
    };

    // storeDrupalToFirebase(){
    //     this.drupal.cache = true;
    //     this.drupal.static = true;
    //     let changed = Util.getTimeStamp()
    //     let drupalModel: any = JSON.parse(JSON.stringify(_.cloneDeep(this.drupal.model)));
    //     let settings = _.clone(this.drupal.settings);
    //     settings.credentials = {};
    //     this.db.object('/drupal/model').set(JSON.stringify(drupalModel));
    //     this.db.list('/drupal').set('changed', changed);
    //     this.db.list('/drupal').set('siteParams', JSON.stringify(drupalModel.siteParams));
    //     this.db.list('/drupal').set('settings', JSON.stringify(settings));
    //     // for(let k in drupalModel){
    //     //     for(let kk in drupalModel[k]){
    //     //         let item = drupalModel[k][kk]
    //     //             let uuid = kk;
    //     //             this.db.object(`/drupal/model/${k}/${uuid}`).set(JSON.stringify(item))
    //     //     }
    //     // };
    // }
    //
    // loadDrupalFromFirebase( ) {
    //     this.db.object('/drupal/model').subscribe((res) => {
    //         let json = res.$value;
    //         let params = JSON.parse(json).siteParams;
    //         json = ReplaceAllPipe.prototype.transform(json,params.file_baseUrl, 'files/');
    //         json = ReplaceAllPipe.prototype.transform(json,params.baseUrl, '');
    //         let model = JSON.parse(json);
    //         model.siteParams.baseUrl = '/';
    //         model.siteParams.base_root = '';
    //         model.siteParams.base_path = '/';
    //         model.siteParams.site_path = '';
    //         this.drupal.model = model;
    //         this.drupal.siteParams = model.siteParams;
    //
    //         this.render();
    //     })
    // }

    return (
        <div>
            { currentNode &&
            <div className={'container pt-5 d-flex flex-column text-center'}>
                <BsmDrupalNode data-json={JSON.stringify(currentNode)}></BsmDrupalNode>
            </div>
            }

            {/*{authenticated ?*/}
            {/*    <ToolbarButton onClick={(e) => { logout(e) }}>*/}
            {/*        <ion-icon name="log-out" size={'large'}></ion-icon>*/}
            {/*    </ToolbarButton>*/}
            {/*    :*/}
            {/*    <ToolbarButton onClick={() => setShowLogin(true)}>*/}
            {/*        <ion-icon name="log-in" size={'large'}></ion-icon>*/}
            {/*    </ToolbarButton>*/}
            {/*}*/}

            <Toolbar position={'top-left'}>
                <ButtonToolbar>
                    <OverlayTrigger
                        trigger="hover"
                        key={'right'}
                        placement={'right'}
                        overlay={
                            <Popover id={'popover-positioned-right'}>
                                <strong>{authenticated ? 'Logout' : 'Login'}</strong>
                            </Popover>
                        }
                    >
                        {authenticated ?
                            <ToolbarButton onClick={(e) => { logout(e) }}>
                                <ion-icon name="log-out" size={'large'}></ion-icon>
                            </ToolbarButton>
                            :
                            <ToolbarButton onClick={() => setShowLogin(true)}>
                                <ion-icon name="log-in" size={'large'}></ion-icon>
                            </ToolbarButton>
                        }
                    </OverlayTrigger>
                </ButtonToolbar>
            </Toolbar>

            <Modal show={showLoginModal} onHide={() => setShowLogin(false) }>
                <Modal.Header closeButton>
                    <Modal.Title>{t('core:LOGIN')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm
                        formSubmit={login}
                        submitError={submitError}
                        language={store.state.language}
                        loginType={'name-password'}
                    />
                </Modal.Body>
            </Modal>

            <footer>
                {currentMenu &&
                <nav className="navbar navbar-expand-md fixed-bottom">
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav">
                            {/*todo: footer menu {JSON.stringify(currentMenu)}*/}
                            {currentMenu.map((item, i) =>
                                <li key={i}>
                                    <a onClick={(e) => onMenuClick(item)}
                                       className="nav-link">{item.link.title}
                                        {/*{ item.link.weight }}-{{ item.link.title }*/}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
                }
            </footer>

        </div>

    );
};

export default Drupal;
