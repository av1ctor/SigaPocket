import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import {DocsContext} from '../contexts/Docs';
import styles from '../styles/default';

const Docs = ({navigation, route}) =>
{
	const [state, ] = useContext(DocsContext);

	const renderDoc = (groupId, doc) =>
	{
		return (
			<List.Item
				key={doc.codigo}
				title={doc.sigla}
				description={doc.descr}
				left={props => <List.Icon {...props} icon="file-document" />}
				onPress={() => navigation.navigate('Doc', {groupId: groupId, docId: doc.codigo})}
			/>
		);
	};

	const {groupId} = route.params;
	const group = state.groups.find(g => g.grupo === groupId) || {};

	return(
		<SafeAreaView style={styles.safeAreaView}>
			<ScrollView style={styles.scrollView}>
				{(group.grupoDocs || []).map(doc => renderDoc(groupId, doc))}
			</ScrollView>              
		</SafeAreaView>
	);
};

Docs.propTypes = {
	navigation: PropTypes.object,
	route: PropTypes.object
};

export default Docs;