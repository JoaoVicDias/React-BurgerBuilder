import React from 'react'
import burguerLogo  from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'


const logo = ()=>{
    return(
        <div className={classes.Logo}>
            <img src={burguerLogo} alt='MyBurger' />
        </div>
    )
}


export default logo