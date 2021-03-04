import React from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog, Portal} from 'react-native-paper';
import styles from '../styles/default';

const DialogPanel = ({visible, onDismiss, title, children}) =>
{
	return (
		<Portal>
			<Dialog 
				visible={visible} 
				onDismiss={onDismiss}>
				<Dialog.Title style={styles.dialogTitle}>
					{title}
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
	children: PropTypes.any
};

export default DialogPanel;