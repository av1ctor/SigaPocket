import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Chip, List, Text, TextInput, Divider, Colors, ActivityIndicator} from 'react-native-paper';
import {DocsContext} from '../contexts/Docs';
import styles from '../styles/default';

const Doc = ({api, navigation, route}) =>
{
	const [state, ] = useContext(DocsContext);
	const [parts, setParts] = useState();

	const {groupId, docId} = route.params;
	const group = state.groups.find(g => g.grupo === groupId) || {};
	const doc = (group.grupoDocs || []).find(d => d.codigo === docId) || {};

	useEffect(() => 
	{
		listParts();
	}, [route.params.docId]);

	const listParts = async () =>
	{
		setParts(await api.findDocParts(doc.sigla));
	};
	
	const renderParts = (parts) =>
	{
		if(!parts)
		{
			return <ActivityIndicator
				animating
				color={Colors.red800}
				size={20} />;
		}

		return (
			parts.map((part, index) => 
				<List.Item 
					key={index}
					id={index}
					title={part.title}
					left={props => <List.Icon {...props} icon="file-pdf" />} 
					right={props => <List.Icon {...props} icon="chevron-right" />}
					onPress={() => navigation.navigate('PdfView', {sigla: part.sigla})}
				/>
			)
		);
	};

	const renderStates = (states) =>
	{
		return (
			states.map((state, index) => 
				<Chip 
					key={index}
					mode="outlined">
					{state.nome}
				</Chip>
			)
		);
	};

	return(
		<SafeAreaView style={styles.safeAreaView}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.view}>
					<TextInput
						label="Nome"
						value={doc.sigla}
						editable={false}
					/>
				</View>
				<View style={styles.view}>
					<TextInput
						label="Descrição"
						value={doc.descr}
						editable={false}
						multiline
					/>
				</View>
				<View style={styles.view}>
					<TextInput
						label="Origem"
						value={doc.origem}
						editable={false}
					/>
				</View>
				<View style={styles.view}>
					<TextInput
						label="Tempo"
						value={doc.tempoRelativo}
						editable={false}
					/>
				</View>
				<View style={styles.stateContainer}>
					<Text style={{paddingRight: 4}}>
						Situação
					</Text>
					{renderStates(doc.list || [])}
				</View>
				<View style={styles.view}>
					<Divider />
					<Text>
						Documentos
					</Text>
					{renderParts(parts)}
				</View>
			</ScrollView>              
		</SafeAreaView>
	);
};

Doc.propTypes = {
	api: PropTypes.object,
	navigation: PropTypes.object,
	route: PropTypes.object,
};

export default Doc;