import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Chip, List, Text, TextInput, Divider, Colors, ActivityIndicator} from 'react-native-paper';
import {DocsContext} from '../contexts/Docs';
import styles from '../styles/default';

const RELOAD_INTERVAL = 60 * 1000;

const Doc = ({api, showMessage, navigation, route}) =>
{
	const [state, dispatch] = useContext(DocsContext);

	const {groupId, docId} = route.params;
	const group = state.groups.find(g => g.grupo === groupId) || {};
	const doc = (group.grupoDocs || []).find(d => d.codigo === docId) || {};

	useEffect(() => 
	{
		loadParts();
	}, [route.params.docId]);

	const loadParts = async () =>
	{
		if(!doc.parts || !doc.parts.list /*|| Date.now() > doc.parts.date + RELOAD_INTERVAL*/)
		{
			const parts = await api.findDocParts(doc.sigla);
			if(parts)
			{
				dispatch({
					type: 'SET_DOC_PARTS',
					groupId: groupId,
					docId: docId,
					payload: parts
				});
			}
			else
			{
				showMessage('Falha ao carregar lista de documentos', 'error');
			}
		}
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
					onPress={() => navigation.navigate('PdfView', {groupId: groupId, docId: docId, partId: part.sigla})}
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
					{renderParts(doc.parts && doc.parts.list)}
				</View>
			</ScrollView>              
		</SafeAreaView>
	);
};

Doc.propTypes = {
	api: PropTypes.object,
	showMessage: PropTypes.func,
	navigation: PropTypes.object,
	route: PropTypes.object,
};

export default Doc;