import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavBar.module.scss'

import icon from './img/icon.png'
import menu from './img/menu.svg'
import close from './img/close.svg'

export function NavBar(props) {
  const {children} = props;
  const [collapseMenu, setCollapseMenu] = useState(true);

  const toogleMenu = () => setCollapseMenu(!collapseMenu);

  return(
    <div className={styles.appContainer}>
    <aside className={styles.navBar}>
      {
        collapseMenu && 
        <div className={styles.navBarOptions}>
          <img src={icon} alt="logo"/>

          <div>
            <h2>Sectores</h2>
            <div />
            <div>
              <NavLink to={'/map?city=gdl'}>
                Sector 1
              </NavLink>
              <NavLink to={'/map?city=cdmx'}>
                Sector 2
              </NavLink>
            </div>

          </div>
        </div>
      }
      <button className={styles.buttonMenu} onClick={toogleMenu}>
         {!collapseMenu ?
            <div className={styles.openIconContainer}> 
              <img src={menu} alt="menu-img" />
              <p>
                Menu
              </p>
            </div> 
          : 
          <div className={styles.closeIconContainer}> 
            <img src={close} alt="close-img" />
            <p>
              Cerrar
            </p>
          </div>
        }
      </button>
    </aside>
    <div className={styles.content}>
    {children}
    </div>
    </div>
  )
}

export default NavBar;