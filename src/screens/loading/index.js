import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import firebase from '../../services/firebase';
import styles from '../../styles/global';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/userActions';

class Loading extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Main' : 'SignUp')
            if(user){
                this.props.setUser(user)
            }
        })
    }

    render() {
        return (
           <View style={styles.page}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Loading);