import React from 'react';
import PropTypes from 'prop-types';
import {Appbar, Menu, Divider} from 'react-native-paper';

const NavBar = ({navigation, previous, scene, menuItems}) => 
{
	const [visible, setVisible] = React.useState(false);
	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

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
	navigation: PropTypes.object,
	previous: PropTypes.any,
	scene: PropTypes.object,
	menuItems: PropTypes.array
};

export default NavBar;