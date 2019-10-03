// import React from 'react';
// import { TYPE } from '../../constants';
// import { View, StyleSheet, Image } from 'react-native';
// import ProfilePicture  from '../profilePicture';
// import { getCurrentPlayer } from '../../redux/selectors';
// import { connect } from 'react-redux';
// import Text from '../text';
// import { FontAwesome } from '@expo/vector-icons'
// import mafiaIcon from '../../../assets/mafia-icon3.png';
// import civIcon from '../../../assets/civilian-icon.png';
// import AnimatedType from '../animatedType';
//
// export const Player = (props) => {
//
//
//   const { showType, player, currentPlayer,showPlayerReady } = props;
//   const currentPlayerIsCivilian = currentPlayer.type === TYPE.CIVILIAN;
//   const playerMatch = currentPlayer && (currentPlayer.uid === player.uid);
//
//   const getPlayerType = () => {
//     if(showType){
//       return (
//         <View style={{
//           marginLeft: 'auto',
//           marginRight: 10,
//         }}>
//           <AnimatedType alwaysAnimate={true}>
//             <Image source={player.type === TYPE.CIVILIAN ? civIcon : mafiaIcon}
//                    resizeMode='contain'
//                    style= {{flex:1 , width: '100%' }}/>
//           </AnimatedType>
//         </View>)
//     }
//
//     const playerType=
//       <AnimatedType>
//         <Image source={player.type === TYPE.CIVILIAN ? civIcon : mafiaIcon}
//                resizeMode='contain'
//                style= {{flex:1 , width: '100%' }}/>
//       </AnimatedType>
//
//     if(currentPlayerIsCivilian) {
//       if(playerMatch) {
//         return (<View style={{
//           marginLeft: 'auto',
//           marginRight: 10
//
//         }}>{playerType}</View>)
//       }
//       return null;
//     }
//
//     if(player.type !== TYPE.CIVILIAN) {
//       return (<View style={{
//         marginLeft: 'auto',
//         marginRight: 10,
//       }}>{playerType}</View>)
//     }else{
//       return null;
//     }
//   }
//
//   return(
//     <View key={player.uid} style={styles.player}>
//       <ProfilePicture imageUri={player.photoURL} size={50}/>
//       <Text style={{marginLeft: 10}} color='black'>{player.displayName}</Text>
//
//       {showPlayerReady && player.ready &&
//       <View
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           position: 'absolute',
//           left: 40,
//           bottom: 5,
//           backgroundColor: '#008165',
//           borderRadius: 15
//
//         }}>
//         <FontAwesome name='check-circle' color='#00FFC2' size={24}/>
//       </View>}
//
//       {getPlayerType()}
//     </View>
//   )
// }
//
// const mapStateToProps = state => {
//   return {
//     currentPlayer: getCurrentPlayer(state),
//     showPlayerTypes: state.game.showPlayerTypes
//   }
// }
//
// Player.defaultProps = {
//   currentPlayer: false,
//   showPlayerReady: false,
//   showType: false
//
// }
//
// export default connect(mapStateToProps)(Player);
//
//
// const styles =  StyleSheet.create({
//   player: {
//     display: 'flex',
//     flex: 1,
//     height: 60,
//     alignItems: 'center',
//     flexDirection: 'row',
//     paddingLeft: 5,
//     margin: 10,
//     borderWidth: 1,
//     borderColor: '#8b8b8b',
//     overflow: 'hidden'
//   },
// });
