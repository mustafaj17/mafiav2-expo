import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import firebase from '../../services/firebase';
import styles from './styles';
import InfoModal from '../../components/infoModal/infoModal'

export default class Main extends React.Component {
    state = {
        currentUser: null,
        showInfoModal: false,
        errorMessage: '',
        showSpinner: false
    }


    componentDidMount() {
        const { currentUser } = firebase.auth();
        this.setState({ currentUser })
    }

    startGameButtonPressed = () => {
        this.setState({joinGameSelected: false})

        setTimeout(() => {
            this.textInput.focus();
        }, 500)

    }

    joinGameButtonPressed = () => {
        this.setState({joinGameSelected: true})
        setTimeout( () => {
            this.textInput.focus();
        }, 500)

    }

    handleBackBtnPress = () => {
        if(this.state.uiInputMode) {
            this.setState({errorMessage: null, showSpinner: true})
            Keyboard.dismiss();
            this.runAnimation();
        }
    }

    startOrJoin = () => {}

    render() {
        const { currentUser } = this.state
        return (
           <View style={styles['lobby-screen']}>
               {this.state.showInfoModal &&
               <InfoModal onPressHandler={ () => this.setState({showInfoModal: false}) } />
               }

               <View style={[styles['button-container'], styles['button-container--top']]}>

                   {this.state.errorMessage && <View style={styles['error-view']}><Text style={styles['error-text']}>{this.props.errorMessage}</Text></View>}
                   {this.state.showSpinner && <View style={styles['error-view']}><Text style={styles['error-text']}>Loading</Text></View>}

                   <TextInput style={styles['input-box']}
                              onChangeText={(text) => this.setState({ gameName : text})}
                              editable={this.state.uiInputMode}
                              disable={!this.state.uiInputMode}
                              value={this.state.gameName}
                              placeholder='Enter game ID'
                              ref={ elem => this.textInput = elem }/>

                   {this.state.uiInputMode &&
                   <View  style={{marginTop:20}}>

                       <TouchableOpacity onPress={this.startOrJoin} editable={!this.state.uiInputMode} disabled={this.props.showSpinner}>
                           <View style={styles['go-btn']}>
                               <Text style={{fontSize: 18, letterSpacing: 2}}>Go</Text>
                           </View>
                       </TouchableOpacity>

                   </View>}



                   <TouchableOpacity style={styles['text-box-touch']} onPress={this.joinGameButtonPressed}>
                       <Text style={styles['text-box']}>Join Game</Text>
                   </TouchableOpacity>



               </View>

               <View style={styles['logo-container']}>

                   <Image style={styles.logo} source={logo}></Image>
                   <Image style={styles['mafia-text']} source={mafiaText}></Image>

               </View>

               <View style={[styles['button-container'], styles['button-container--bottom']]}>
                   <TouchableOpacity style={styles['text-box-touch']} onPress={this.startGameButtonPressed}>
                       <Text style={styles['text-box']}>Start New Game</Text>
                   </TouchableOpacity>
               </View>


               { this.state.uiInputMode
                  ?
                  <TouchableOpacity style={styles['back-btn']} onPress={ this.handleBackBtnPress }>
                      <Image style={styles['back-icon']} source={backBtnIcon}/>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={styles['info']} onPress={ () => this.setState({showInfoModal: true}) }>
                      <Image style={styles['info-img']} source={info}></Image>
                  </TouchableOpacity>
               }
           </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})