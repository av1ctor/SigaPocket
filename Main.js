/**
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors, IconButton} from 'react-native-paper';
import Logon from './screens/Logon';
import Groups from './screens/Groups';
import Docs from './screens/Docs';
import Doc from './screens/Doc';
import PdfView from './screens/PdfView';
import About from './screens/About';
import Options from './screens/Options';
import MenuPanel from './components/MenuPanel';

const Stack = createStackNavigator();

const Main = ({api}) =>
{
	const [menuVisible, setMenuVisible] = useState(false);
	const [aboutVisible, setAboutVisible] = useState(false);
	const [optionsVisible, setOptionsVisible] = useState(false);
	
	const showMessage = (msg, kind) =>
	{
		alert(msg);
	};

	const items = [
		{
			title: 'Opções',
			icon: 'format-list-bulleted-square',
			onPress: () => setOptionsVisible(true)
		},		
		{
			title: 'Sobre',
			icon: 'information',
			onPress: () => setAboutVisible(true)
		},
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

			<Stack.Navigator initialRouteName="Logon">
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
				</Stack.Screen>
				<Stack.Screen
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
				</Stack.Screen>
				<Stack.Screen
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
				</Stack.Screen>
				<Stack.Screen
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
				</Stack.Screen>
				<Stack.Screen
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
			</Stack.Navigator>
		</>
	);
};

Main.propTypes = {
	api: PropTypes.object
};

export default Main;