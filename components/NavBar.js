import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {Alert, BackHandler} from 'react-native';
import {Appbar, Menu, Divider} from 'react-native-paper';
import {UserContext} from '../contexts/User';

const NavBar = ({parent, navigation, previous, scene, menuItems}) => 
{
	const [user, ] = useContext(UserContext);
	const [visible, setVisible] = useState(false);
	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	useEffect(() =>
	{
		const listener = BackHandler.addEventListener('hardwareBackPress', handleExit);
		return () => listener.remove();
	}, []);

	const handleExit = () => 
	{
		if(user.loggedIn)
		{
			if(!previous)
			{
				Alert.alert(
					'Alerta', 
					'Deseja sair ou trocar de usuário?', 
					[
						{
							text: 'CANCELAR',
							onPress: () => null,
							style: 'cancel'
						},
						{ 
							text: 'SIM', 
							onPress: () => parent.doLogout() 
						}
					]);
			}
			else
			{
				navigation.goBack();
			}
		}
		else
		{
			BackHandler.exitApp();
		}

		return true;
	};

	const options = scene.descriptor.options;
	return (
		<Appbar.Header>
			{previous? <Appbar.BackAction onPress={navigation.goBack} /> : null}
			<Appbar.Content title={options.headerTitle} />
			<Menu
				visible={visible}
				onDismiss={closeMenu}
				anchor={
					<Appbar.Action icon="menu" color="white" onPress={openMenu} />
				}>
				{(menuItems || []).map((item, index) => 
					item? 
						<Menu.Item 
							key={index}
							title={item.title}
							icon={item.icon}
							disabled={!item.disabled? 
								false: 
								item.disabled.constructor === Function? 
									item.disabled(): 
									item.disabled
							}
							onPress={() => {
								closeMenu();
								item.onPress && item.onPress();
							}} />:
						<Divider key={index} />
				)}
			</Menu>
		</Appbar.Header>
	);
};

NavBar.propTypes = {
	parent: PropTypes.object,
	navigation: PropTypes.object,
	previous: PropTypes.any,
	scene: PropTypes.object,
	menuItems: PropTypes.array
};

export default NavBar;