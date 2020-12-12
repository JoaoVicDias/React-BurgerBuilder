import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavgationItems from '../NavigationItems/NavigationItems'
import ToggleBtn from '../SideDrawer/ToggleBtn/ToggleBtn'

const toolbar = (props)=>{
    return (
        <header className={classes.Toolbar}>
        <div>
            <ToggleBtn clicked={props.open}/>
        </div>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavgationItems isAuth={props.auth}/>   
        </nav>
        </header>
        ) 
}


export default toolbar

