import React,{Component} from 'react'
import Auxiliary from '../../hoc/auxiliary'
import classes from '../Layout/Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'


class Layout extends Component{
    state = {
        showSideDrawer: false
    }
    
    sideDrawerClosedHandler = ()=>{
        this.setState({showSideDrawer: false})
    }

    toggleBtnOpenHandler = ()=>{
     this.setState(( prevState ) => {
         return {showSideDrawer:!prevState.showSideDrawer}
     })
    }

        
    
    render(){
        return (
            <Auxiliary>
                 <div> 
                     <Toolbar auth={this.props.isAuthenticated} open={this.toggleBtnOpenHandler}/>
                     <SideDrawer auth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                 </div>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
   
}
const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token !== null
    }
}


export default  connect(mapStateToProps)(Layout)