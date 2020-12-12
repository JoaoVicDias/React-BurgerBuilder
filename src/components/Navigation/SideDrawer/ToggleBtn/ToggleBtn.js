import React from 'react'
import classes from './ToggleBtn.module.css'

const toggleBtn = (props)=>{
    return(
        <div className={classes.DrawerToggle} onClick={props.clicked}>
              <div></div>
              <div></div>
              <div></div>
        </div>
    )
}


export default toggleBtn