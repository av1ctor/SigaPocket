import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Button, Chip, List, Text, TextInput, Divider, Colors, ActivityIndicator} from 'react-native-paper';
import {DocsContext} from '../contexts/Docs';
import styles from '../styles/default';

const RELOAD_INTERVAL = 60 * 1000;

const Doc = ({api, parent, navigation, route}) =>
{
	const [state, dispatch] = useContext(DocsContext);
	const [user, setUser] = useState({});

	const {groupId, docId} = route.params;
	const group = state.groups.find(g => g.grupo === groupId) || {};
	const doc = (group.grupoDocs || []).find(d => d.codigo === docId) || {};

	useEffect(() => 
	{
		navigation.setOptions({headerTitle: doc.sigla});
		loadParts();
		loadUser(getPessoa());
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
				parent.showMessage('Falha ao carregar lista de documentos', 'error');
			}
		}
	};

	const getPessoa = () =>
	{
		if(!doc.list || doc.list.length === 0)
		{
			return 0;
		}
		return doc.list[doc.list.length-1].pessoa;
	};

	const loadUser = async (id) => {
		const user = await api.findUser(id);
		setUser(user);
	};

	const handleSend = async () => {
		alert('Ainda não implementado :/');
	};

	const handleReceive = async () => {
		alert('Ainda não implementado :/');
	};

	const Part = ({part, index}) =>
	{
		return (
			<List.Item 
				key={index}
				id={index}
				title={part.title}
				left={props => <List.Icon {...props} icon="file-pdf" />} 
				right={props => <List.Icon {...props} icon="chevron-right" />}
				onPress={() => navigation.navigate('PdfView', {groupId: groupId, docId: docId, partId: part.sigla})}
			/>			
		);
	};

	Part.propTypes = {
		part: PropTypes.object,
		index: PropTypes.number
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

		const complete = parts.find(p => p.isFullDoc === true);

		return (
			parts.map((p, index) => 
				p.isFullDoc?
					undefined:
					<Part 
						key={index} 
						index={index} 
						part={p} />
			
			).concat(
				<Part 
					key={0} 
					index={0} 
					part={complete} />				
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

	const isPending = (states) =>
	{
		return states
			.find(state => 
				state.nome.toLowerCase() === 'a receber' && state.daPessoa)?
			true: 
			false;
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
				<View style={styles.view}>
					<TextInput
						label="Pessoa"
						value={user.nome}
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
				<View style={styles.view}>
					<Divider />
					{isPending(doc.list || [])?
						<Button
							mode="contained"
							icon="download"
							onPress={handleReceive}
						>
							<Text style={{color: '#fff'}}>Receber</Text>
						</Button>:
						<Button
							mode="contained"
							icon="send"
							onPress={handleSend}
						>
							<Text style={{color: '#fff'}}>Tramitar</Text>
						</Button>
					}
				</View>
			</ScrollView>              
		</SafeAreaView>
	);
};

Doc.propTypes = {
	api: PropTypes.object,
	parent: PropTypes.object,
	navigation: PropTypes.object,
	route: PropTypes.object,
};

export default Doc;