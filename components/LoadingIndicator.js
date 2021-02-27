import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Colors, Portal} from 'react-native-paper';
import {View} from 'react-native';
import styles from '../styles/default';

const LoadingIndicator = ({loading}) =>
{
	return (
		<Portal>
			<View style={styles.loadingContainer}>
				<ActivityIndicator 
					animating={loading} 
					color={Colors.red800}
					size={80} />
			</View>
		</Portal>
	);
};

LoadingIndicator.propTypes = {
	loading: PropTypes.bool
};

export default LoadingIndicator;