import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Portal, Menu} from 'react-native-paper';

const MenuPanel = ({visible, onDismiss, items}) =>
{
	const containerStyle = {backgroundColor: 'white', padding: 20};

	return (
		<Portal>
			<Modal 
				visible={visible} 
				onDismiss={onDismiss} 
				contentContainerStyle={containerStyle}>
				{items.map((item, index) => 
					<Menu.Item 
						key={index}
						title={item.title}
						icon={item.icon}
						onPress={() => {
							onDismiss(); 
							item.onPress && item.onPress();
						}} />
				)}
			</Modal>
		</Portal>
	);
};

MenuPanel.propTypes = {
	items: PropTypes.array,
	visible: PropTypes.bool, 
	onDismiss: PropTypes.func,
};

export default MenuPanel;