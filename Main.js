/**
 * @format
 * @flow strict-local
 */

import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors, IconButton, Snackbar} from 'react-native-paper';
import {UserContext} from './contexts/User';
import Logon from './screens/Logon';
import Groups from './screens/Groups';
import Docs from './screens/Docs';
import Doc from './screens/Doc';
import PdfView from './screens/PdfView';
import About from './screens/About';
import Options from './screens/Options';
import MenuPanel from './components/MenuPanel';
import styles from './styles/default';

const Stack = createStackNavigator();

const Main = ({api}) =>
{
	const [userState, userDispatch] = useContext(UserContext);
	const [menuVisible, setMenuVisible] = useState(false);
	const [aboutVisible, setAboutVisible] = useState(false);
	const [optionsVisible, setOptionsVisible] = useState(false);
	const [alertMsg, setAlertMsg] = useState({text: '', kind: ''});

	useEffect(() =>
	{
		console.log(userState.loggedIn);
	}, [userState.loggedIn]);
	
	const showMessage = (msg, kind) =>
	{
		if(msg)
		{
			setAlertMsg({
				text: msg.constructor !== Array? 
					msg.constructor !== String?
						JSON.stringify(msg):
						msg: 
					msg.reduce((text, m, index) => text += (index > 0? ', ':'') + m),
				kind: kind,
			});
		}
		else
		{
			setAlertMsg({
				text: '',
				kind: ''
			});
		}
	};

	const handleLogout = () =>
	{
		userDispatch({
			type: 'LOGOUT',
		});
	};

	const items = [
		{
			title: 'Opções',
			icon: 'cog-outline',
			onPress: () => setOptionsVisible(true)
		},		
		{
			title: 'Sobre',
			icon: 'information',
			onPress: () => setAboutVisible(true)
		},		
		{
			title: 'Sair',
			icon: 'logout',
			onPress: () => handleLogout()
		}
	];

	const options = {
		headerRight: 
			// eslint-disable-next-line react/display-name
			(props) => 
				<IconButton 
					{...props} 
					icon="menu"
					color={Colors.black}
					size={22}
					onPress={() => setMenuVisible(true)} />
	};

	return (
		<>
			<MenuPanel 
				items={items} 
				visible={menuVisible}
				onDismiss={() => setMenuVisible(false)} />

			<Options
				visible={optionsVisible}
				onDismiss={() => setOptionsVisible(false)} />

			<About
				visible={aboutVisible}
				onDismiss={() => setAboutVisible(false)} />
			
			<Snackbar 
				visible={alertMsg.text !== ''}
				style={alertMsg.kind === 'error'? styles.alertError: styles.alertGeneral}
				onDismiss={() => showMessage()}
			>
				{alertMsg.text}
			</Snackbar>

			<Stack.Navigator>
				{!userState.loggedIn?
					<Stack.Screen
						name="Logon"
						options={{headerTitle: 'Logon'}}
					>
						{props => 
							<Logon 
								{...props} 
								api={api} 
								showMessage={showMessage} 
							/>
						}
					</Stack.Screen>:
					[
						<Stack.Screen
							key={0}
							name="Groups"
							options={{...options, headerTitle: 'Grupos'}}
						>
							{props => 
								<Groups 
									{...props} 
									api={api} 
									showMessage={showMessage} 
								/>
							}
						</Stack.Screen>,
						<Stack.Screen
							key={1}
							name="Docs"
							options={{...options, headerTitle: 'Expedientes'}}
						>
							{props => 
								<Docs 
									{...props} 
									api={api} 
									showMessage={showMessage} 
								/>
							}
						</Stack.Screen>,
						<Stack.Screen
							key={2}
							name="Doc"
							options={{...options, headerTitle: 'Expediente'}}
						>
							{props => 
								<Doc 
									{...props} 
									api={api} 
									showMessage={showMessage} 
								/>
							}
						</Stack.Screen>,
						<Stack.Screen
							key={3}
							name="PdfView"
							options={{...options, headerTitle: 'PDF'}}
						>
							{props => 
								<PdfView 
									{...props} 
									api={api} 
									showMessage={showMessage} 
								/>
							}
						</Stack.Screen>
					]
				}	
			</Stack.Navigator>
		</>
	);
};

Main.propTypes = {
	api: PropTypes.object
};

export default Main;