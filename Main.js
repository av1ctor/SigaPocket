/**
 * @format
 * @flow strict-local
 */

import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {createStackNavigator} from '@react-navigation/stack';
import {Snackbar} from 'react-native-paper';
import {UserContext} from './contexts/User';
import Logon from './screens/Logon';
import Groups from './screens/Groups';
import Docs from './screens/Docs';
import Doc from './screens/Doc';
import PdfView from './screens/PdfView';
import About from './screens/About';
import Options from './screens/Options';
import styles from './styles/default';
import NavBar from './components/NavBar';

const Stack = createStackNavigator();

const Main = ({api}) =>
{
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

	const [userState, userDispatch] = useContext(UserContext);
	const [menuItems, setMenuItems] = useState(items);
	const [aboutVisible, setAboutVisible] = useState(false);
	const [optionsVisible, setOptionsVisible] = useState(false);
	const [alertMsg, setAlertMsg] = useState({text: '', kind: ''});

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

	const appendMenu = (subitems) =>
	{
		setMenuItems([
			...items,
			null,
			...subitems
		]);
	};

	const restoreMenu = () =>
	{
		setMenuItems([
			...items,
		]);
	};

	const handleLogout = () =>
	{
		userDispatch({
			type: 'LOGOUT',
		});
	};

	const parent = {
		appendMenu,
		restoreMenu,
		showMessage
	};

	return (
		<>
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

			<Stack.Navigator
				screenOptions={{
					// eslint-disable-next-line react/display-name
					header: (props) => 
						<NavBar 
							{...props}
							menuItems={menuItems} 
						/>,
				}}
			>
				{!userState.loggedIn?
					<Stack.Screen
						name="Logon"
						options={{headerTitle: 'Logon'}}
					>
						{props => 
							<Logon 
								{...props} 
								api={api} 
								parent={parent} 
							/>
						}
					</Stack.Screen>:
					[
						<Stack.Screen
							key={0}
							name="Groups"
							options={{headerTitle: 'Mesa'}}
						>
							{props => 
								<Groups 
									{...props} 
									api={api} 
									parent={parent} 
								/>
							}
						</Stack.Screen>,
						<Stack.Screen
							key={1}
							name="Docs"
							options={{headerTitle: 'Expedientes'}}
						>
							{props => 
								<Docs 
									{...props} 
									api={api} 
									parent={parent} 
								/>
							}
						</Stack.Screen>,
						<Stack.Screen
							key={2}
							name="Doc"
							options={{headerTitle: 'Expediente'}}
						>
							{props => 
								<Doc 
									{...props} 
									api={api} 
									parent={parent} 
								/>
							}
						</Stack.Screen>,
						<Stack.Screen
							key={3}
							name="PdfView"
							options={{headerTitle: 'PDF'}}
						>
							{props => 
								<PdfView 
									{...props} 
									api={api} 
									parent={parent} 
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