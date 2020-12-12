import React from 'react'
import BurguerIngredients from '../Burguer/BurgerIngredients/BurgerIngredients'
import classes from './Burguer.module.css'


const burguer = (props)=>{
    let arrayIngredients = Object.keys(props.ingredients).map(igkey => {
        
        return [...Array(props.ingredients[igkey])].map((_,i)=>{
            return <BurguerIngredients key={igkey + i} type={igkey} />
        })  
    }).reduce((arr,el)=>{
        return arr.concat(el)
    },[])
    
  

    if(arrayIngredients.length === 0){
        arrayIngredients = <p>Please start adding ingredients!</p>
    }


    return(
        <div className={classes.Burguer}>
            <BurguerIngredients type="bread-top" />
            {arrayIngredients}
            <BurguerIngredients type="bread-bottom" />
        </div>
    )
}

export default burguer