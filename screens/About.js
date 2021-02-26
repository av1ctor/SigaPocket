import React from 'react';
import PropTypes from 'prop-types';
import {Paragraph, Subheading} from 'react-native-paper';
import DialogPanel from '../components/DialogPanel';

const About = ({visible, onDismiss}) =>
{
	return (
		<DialogPanel
			visible={visible}
			title="Sobre"
			icon="information"
			onDismiss={onDismiss}>
			<Subheading>SigaPocket</Subheading>
			<Paragraph>Copyright 2021 André Vicentini (av1ctor@gmail.com)</Paragraph>
			<Paragraph>Licenciado sob GNU GPL-2.0 ou posterior</Paragraph>
		</DialogPanel>        
	);
};

About.propTypes = {
	visible: PropTypes.bool,
	onDismiss: PropTypes.func,
};

export default About;