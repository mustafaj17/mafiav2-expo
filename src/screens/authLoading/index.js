import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import firebase from '../../services/firebase';
import globalStyles from '../../styles/global';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

class AuthLoading extends React.Component {

    componentDidMount() {
        //
        // this.props.navigation.navigate('Login')
        // return;

        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main' : 'Login')
            if(user){
                this.props.setUser(user)
            }
        })
    }

    render() {
        return (
          <View style={globalStyles.page}>
              <Text>Loading</Text>
              <ActivityIndicator size="large" />
          </View>
        )
    }
}


const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
