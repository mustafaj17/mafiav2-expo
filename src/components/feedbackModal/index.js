import React from 'react';
import { KeyboardAvoidingView, Modal, TouchableOpacity, View, ActivityIndicator, Keyboard } from 'react-native';
import MafiaBackground from '../mafiaBackground';
import Text from '../text';
import Button from '../button';
import { connect } from 'react-redux';
import { TextInput } from 'react-native';
import { firestore } from '../../services/firebase';
import { COLLECTIONS } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import ErrorMessage from '../errorMessage';
import { getStatusBarHeight } from "react-native-status-bar-height";


const generateDateString = () => {
  const today = new Date();
  return `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}--${today.getHours()}:${today.getMinutes()}`
}

class FeedbackModal extends React.Component{

  state = {
    feedback : ''
  }

  submitInput  = async () => {
    const { user, closeModal } = this.props;
    const { feedback } = this.state;

    Keyboard.dismiss()
    this.setState({loading: true})

    const docId = `${user.email}-${generateDateString()}`

    try {
      await firestore.collection(COLLECTIONS.FEEDBACK).doc(docId).set({
        feedback
      })
    } catch (e) {
      this.setState({error:e, loading: false})
    }
    this.setState({
      feedBackSubmitted: true,
      loading: false,
      error: ''
    })

    setTimeout( () => {
      closeModal();
      this.setState({
        feedBackSubmitted: false,
        feedback: ''
      })
    } , 1500)

  }

  render(){

    const { feedback, loading, feedBackSubmitted, error } = this.state;
    const { visible, closeModal } = this.props;

    return(
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>

          <View style={{
            flex: 1,
            width: '100%',
          }}>

            <MafiaBackground>

              <KeyboardAvoidingView style={{
                position: 'relative',
                borderRadius: 2,
                borderWidth: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                padding: 20,
                paddingTop: 40
              }}>

                { !feedBackSubmitted && <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: 10 + getStatusBarHeight()
                  }}
                  onPress={closeModal}>
                  <Ionicons name="md-close" size={32} color="white" />
                </TouchableOpacity>}


                <View style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  width: '100%',
                  flex: 1,
                  paddingTop: 10
                }}>

                  { !(feedBackSubmitted || loading) &&
                  <Text size='small' style={{textAlign: 'center'}}>
                    We would love to hear your feedback - write anything you would like us to know.
                  </Text>}
                  { !(feedBackSubmitted || loading) && <Text size='xxsmall'
                                                color='#15D600'
                                                style={{marginTop: 5,marginBottom: 20, textAlign: 'center'}}>
                    Max 300 character
                  </Text>}



                  {loading && <ActivityIndicator color='#15D600'/>}
                  {feedBackSubmitted && <Text color='#15D600'>Feedback Submitted</Text>}
                  {!loading && !feedBackSubmitted && <TextInput
                    value={feedback}
                    onChangeText={feedback => this.setState({ feedback })}
                    multiline
                    style={{
                      fontSize: 18,
                      borderWidth: 1,
                      borderColor: '#15D600',
                      padding: 10,
                      fontFamily: 'oxygen-regular',
                      borderRadius: 2,
                      height: 300,
                      width: '100%',
                      backgroundColor: 'white',
                      textAlignVertical: "top"
                    }}
                    autoCorrect={true}
                    spellCheck={true}
                    placeholder={'enter feedback'}
                    placeholderTextColor="grey"
                  />
                  }
                  <ErrorMessage>Too many chars</ErrorMessage>
                </View>

                {!feedBackSubmitted && <Button onPress={this.submitInput} disabled={(feedback.trim().length < 5) || loading}>
                  <Text>Submit Feedback</Text>
                </Button>
                }


              </KeyboardAvoidingView>
            </MafiaBackground>
          </View>
        </View>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps
)(FeedbackModal);


