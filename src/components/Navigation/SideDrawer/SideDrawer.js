import React from 'react'
import classes from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import Auxiliary from '../../../hoc/auxiliary'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'


const sideDrawer = (props)=>{

    let  sideDrawer = [classes.SideDrawer,classes.Close]

    if(props.open){
        sideDrawer = [classes.SideDrawer, classes.Open]
    }


    return(
    <Auxiliary>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={sideDrawer.join(' ')} onClick={props.closed}>
           <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems isAuth={props.auth}/>
            </nav>
        </div>   
    </Auxiliary>
        
    )
}

export default sideDrawer