import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import firebase from '../../services/firebase';
import globalStyles from '../../styles/global';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';
import LoadingScreen from '../../components/loadingScreen';

class AuthLoading extends React.Component {

    componentDidMount() {

        // this.props.navigation.navigate('Landing')
        // return;

        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main' : 'Landing')
            if(user){
                this.props.setUser(user)
            }
        })
    }

    render() {
        return (<LoadingScreen />);

    }
}


const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
