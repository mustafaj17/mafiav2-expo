import React from 'react'
import firebase from '../../services/firebase';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';
import LoadingScreen from '../../components/loadingScreen';

class AuthLoading extends React.Component {

    componentDidMount() {


        // firebase.auth().signOut();

        firebase.auth().onAuthStateChanged(async (user) => {
            if(user){
                this.props.setUser(user);
            }
            this.props.navigation.navigate(user ? 'Main' : 'Landing')
            // this.props.navigation.navigate('Landing')
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
