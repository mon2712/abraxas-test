import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import styles from './NavBar.module.scss'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import { parse } from '../../utils/querystring';
import { RadioGroup, Radio, FormControlLabel } from '@material-ui/core';

import { ReactComponent as Menu } from './img/menu.svg';
import { ReactComponent as Close } from './img/close.svg';

const BlueRadio = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  formControlLabel: {
    color: "#FFF",
    fontSize: "14px !important"
  },
}));

export function NavBar(props) {
  const city = parse(props.location.search).city || 'gdl';
  const {children} = props;
  const [sector, setSector] = useState(city);
  const [collapseMenu, setCollapseMenu] = useState(true);

  const toogleMenu = () => setCollapseMenu(!collapseMenu);

  const toogleSector = (event) => {
    setSector(event.target.value);
    props.history.push(`/map?city=${event.target.value}`);
  }

  const classes = useStyles();

  return(
    <div className={styles.appContainer}>
    <aside className={styles.navBar}>
      {
        collapseMenu && 
        <div className={styles.navBarOptions}>
          <img src={"https://static.wixstatic.com/media/ba96d4_fd542c6c2110496a87c737bc1fe0bdb4~mv2.png/v1/fill/w_183,h_55,al_c,q_85,usm_0.66_1.00_0.01/abraxas-ventures-blanco--iso-amarillo_pn.webp"} alt="logo"/>

          <div className={styles.sectors}>
            <h2 className={styles.title}>Sectores</h2>
            <div className={styles.divisor}/>
            <div className={styles.radioContainer}>
              <RadioGroup aria-label="quiz" name="quiz" value={sector} onChange={toogleSector}>
                <div className={styles.radio}>
                  <FormControlLabel className={classes.formControlLabel} value="cdmx" control={<BlueRadio color="#FFF"/>} label="Sector 1" />
                </div>
                <div className={styles.radio}>
                  <FormControlLabel className={classes.formControlLabel} value="gdl" control={<BlueRadio color="#FFF" />} label="Sector 2" /> 
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      }
      <button className={styles.buttonMenu} onClick={toogleMenu}>
         {!collapseMenu ?
            <div className={styles.openIconContainer}> 
              <Menu alt="menu-img" />
              <p>
                Menu
              </p>
            </div> 
          : 
          <div className={styles.closeIconContainer}> 
            <Close alt="close-img" />
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

export default withRouter(NavBar);