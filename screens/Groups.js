import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, ScrollView} from 'react-native';
import {List, Text} from 'react-native-paper';
import {Mutex} from 'async-mutex';
import {DocsContext} from '../contexts/Docs';
import styles from '../styles/default';

const Groups = ({api, showMessage, navigation}) =>
{
	const [state, dispatch] = useContext(DocsContext);

	const config = {
		check: {
			timer: null,
			mutex: new Mutex()
		},
		load: {
			timer: null,
			mutex: new Mutex(),
			groups: null
		}
	};

	useEffect(() => 
	{
		loadGroups();
		config.load.timer = setInterval(() => loadGroups(), 1000*60*1);
		
		checkIfUpdated();
		config.check.timer = setInterval(() => checkIfUpdated(), 1000*3);
		
		return () => {
			clearInterval(config.load.timer); 
			clearInterval(config.check.timer);
		};
	}, []);

	const checkIfUpdated = async () =>
	{
		if(config.check.mutex.isLocked())
		{
			return;
		}

		const release = await config.check.mutex.acquire();

		try
		{
			const groups = await AsyncStorage.getItem('@groups');
			if(groups)
			{
				await AsyncStorage.removeItem('@groups');
				updateGroups(JSON.parse(groups));
			}
		}
		finally
		{
			release();
		}
	};

	const updateGroups = (groups) =>
	{
		config.load.groups = groups;
		dispatch({
			type: 'SET_GROUPS',
			payload: groups || [],
		});
	};

	const loadGroups = async () =>
	{
		if(config.load.mutex.isLocked())
		{
			return;
		}

		const release = await config.load.mutex.acquire();

		try
		{
			const groups = await api.loadGroups();
			if(!groups)
			{
				if(!config.load.groups)
				{
					showMessage(['Erro ao carregar grupos de documentos'], 'error');
				}
			}
			else
			{
				if(!api.compareGroups(config.load.groups, groups))
				{
					updateGroups(groups);
				}
			}
		}
		finally
		{
			release();
		}
	};

	const renderGroup = (group) =>
	{
		const cnt = group.grupoCounterAtivo;
		if(cnt === 0)
		{
			return null;
		}

		return (
			<List.Item 
				key={group.grupo}
				title={
					<Text>
						{group.grupoNome + ` (${cnt})`}
					</Text>
				} 
				id={group.grupo}
				left={props => <List.Icon {...props} icon="folder" />}
				onPress={() => navigation.navigate('Docs', {group: group})}>
			</List.Item>
		);
	};

	const {groups} = state;
		
	return (
		<SafeAreaView style={styles.safeAreaView}>
			<ScrollView style={styles.scrollView}>
				{groups.map(group => renderGroup(group))}
			</ScrollView>              
		</SafeAreaView>
	);
};

Groups.propTypes = {
	api: PropTypes.object,
	showMessage: PropTypes.func,
	navigation: PropTypes.object,
};

export default Groups;