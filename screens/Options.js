import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Switch, Text} from 'react-native-paper';
import DialogPanel from '../components/DialogPanel';
import {OptionsContext} from '../contexts/Options';

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
	
	return (
		<DialogPanel
			visible={visible}
			title="Opções"
			icon="format-list-bulleted-square"
			onDismiss={onDismiss}>
			<View style={{flexDirection:'row'}}>
				<Text>Auto sincronizar</Text>
				<Switch 
					value={state.sync} 
					onValueChange={() => setSync(!state.sync)} 
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