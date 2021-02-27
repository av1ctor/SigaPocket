import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Divider, Text, Switch} from 'react-native-paper';
import DialogPanel from '../components/DialogPanel';
import {OptionsContext} from '../contexts/Options';
import styles from '../styles/default';

const Options = ({visible, onDismiss}) =>
{
	const [state, dispatch] = useContext(OptionsContext);

	const setSync = (value) =>
	{
		dispatch({
			type: 'SET_SYNC',
			payload: value
		});
	};
	
	const setLota = (value) =>
	{
		dispatch({
			type: 'SET_LOTA',
			payload: value
		});
	};
	
	return (
		<DialogPanel
			visible={visible}
			title="Opções"
			icon="format-list-bulleted-square"
			onDismiss={onDismiss}>
			<View style={styles.switchContainer}>
				<Text>Exibir expedientes da unidade</Text>
				<Switch
					value={state.lota} 
					style={{marginLeft: 32}}
					onValueChange={(value) => setLota(value)}
				/>
			</View>
			<Divider />
			<View style={styles.switchContainer}>
				<Text>Sincronizar automaticamente</Text>
				<Switch 
					value={state.sync} 
					style={{marginLeft: 32}}
					onValueChange={(value) => setSync(value)} 
				/>
			</View>
		</DialogPanel>        
	);
};

Options.propTypes = {
	visible: PropTypes.bool,
	onDismiss: PropTypes.func,
};

export default Options;