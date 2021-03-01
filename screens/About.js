import React from 'react';
import PropTypes from 'prop-types';
import {Linking, View} from 'react-native';
import {IconButton, Paragraph, Subheading} from 'react-native-paper';
import DialogPanel from '../components/DialogPanel';
import styles from '../styles/default';

const About = ({visible, onDismiss}) =>
{
	return (
		<DialogPanel
			visible={visible}
			title="Sobre"
			icon="information"
			onDismiss={onDismiss}>
			<View style={styles.rowContainer}>
				<Subheading>SigaPocket</Subheading>
				<IconButton 
					icon="link" 
					size={15} 
					onPress={() => Linking.openURL('https://github.com/av1ctor/SigaPocket')} 
				/>
			</View>
			<View>
				<Paragraph>Copyright © 2021 André Vicentini</Paragraph>
			</View>
			<Paragraph>Licenciado sob GNU GPL-2.0 ou posterior</Paragraph>
		</DialogPanel>        
	);
};

About.propTypes = {
	visible: PropTypes.bool,
	onDismiss: PropTypes.func,
};

export default About;