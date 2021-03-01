import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Button, Dialog, IconButton, Portal, Text} from 'react-native-paper';
import styles from '../styles/default';

const DialogPanel = ({visible, onDismiss, title, icon, children}) =>
{
	return (
		<Portal>
			<Dialog 
				visible={visible} 
				onDismiss={onDismiss}>
				<Dialog.Title style={styles.dialogTitle}>
					<View style={styles.dialogTitle}>
						<IconButton
							icon={icon}
							size={20}
							style={{padding: 0, margin: 0}}
						/>
						<Text style={{fontSize: 20}}>{title}</Text>
					</View>
				</Dialog.Title>
				<Dialog.Content>
					{children}
				</Dialog.Content>
				<Dialog.Actions>
					<Button 
						onPress={onDismiss}>
						Fechar
					</Button>
				</Dialog.Actions>					
			</Dialog>
		</Portal>
	);
};

DialogPanel.propTypes = {
	visible: PropTypes.bool, 
	onDismiss: PropTypes.func,
	title: PropTypes.string,
	icon: PropTypes.string,
	children: PropTypes.any
};

export default DialogPanel;