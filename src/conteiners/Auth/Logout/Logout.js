import React,{Component} from 'react'
import {connect} from 'react-redux'
import * as actionsTypes from '../../../store/actions/index'
import {Redirect} from 'react-router-dom'

class Logout extends Component{

    componentDidMount(){
        this.props.onLogout()
    }

    render(){

        return <Redirect to="/"/>
    }
}

const mapStateToProps = state =>{
    return{

    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onLogout: ()=>dispatch(actionsTypes.logout())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Logout)