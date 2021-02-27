import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {NativeEventEmitter, NativeModules, SafeAreaView, ScrollView} from 'react-native';
import {List, Text} from 'react-native-paper';
import {Mutex} from 'async-mutex';
import {OptionsContext} from '../contexts/Options';
import {DocsContext} from '../contexts/Docs';
import LoadingIndicator from '../components/LoadingIndicator';
import Notificator from '../components/Notificator';
import styles from '../styles/default';

const {SigaPocketModule} = NativeModules;
const eventEmitter = new NativeEventEmitter(SigaPocketModule);

const {CHANNEL_ID} = SigaPocketModule.getConstants();

const Groups = ({api, showMessage, navigation}) =>
{
	const [options, ] = useContext(OptionsContext);
	const [state, dispatch] = useContext(DocsContext);
	const [loading, setLoading] = useState(false);

	const config = {
		mutex: new Mutex(),
		groups: null
	};

	useEffect(() => 
	{
		loadGroups();
	}, [options.lota]);

	useEffect(() => 
	{
		if(options.sync)
		{
			const subs = eventEmitter.addListener('DocsSyncEvent', () => loadGroups());
			return () => eventEmitter.removeSubscription(subs);
		}
	}, [options.sync]);

	const updateGroups = (groups) =>
	{
		config.groups = groups;
		dispatch({
			type: 'SET_GROUPS',
			payload: groups || [],
		});
	};

	const loadGroups = async () =>
	{
		if(config.mutex.isLocked())
		{
			return;
		}

		const release = await config.mutex.acquire();

		try
		{
			setLoading(true);

			const groups = await api.findGroups(options.lota);
			if(!groups)
			{
				if(!config.groups)
				{
					showMessage(['Erro ao carregar grupos de documentos'], 'error');
				}
			}
			else
			{
				if(!api.compareGroups(config.groups, groups))
				{
					const firstRun = config.groups === null;
					updateGroups(groups);

					if(!firstRun && options.sync)
					{
						if(!await SigaPocketModule.isAppOnForeground())
						{
							Notificator.notify('Atualização ocorrida na mesa', CHANNEL_ID);
						}
					}
				}
			}
		}
		finally
		{
			setLoading(false);
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
				left={props => <List.Icon {...props} icon={group.grupoIcone} />}
				right={props => <List.Icon {...props} icon="chevron-right" />}
				onPress={() => navigation.navigate('Docs', {groupId: group.grupo})} />
		);
	};

	const {groups} = state;
		
	return (
		<>
			<SafeAreaView style={styles.safeAreaView}>
				<ScrollView style={styles.scrollView}>
					{groups.map(group => renderGroup(group))}
				</ScrollView>              
			</SafeAreaView>
			{groups.length === 0 && 
				<LoadingIndicator
					loading={loading} />
			}
		</>
	);
};

Groups.propTypes = {
	api: PropTypes.object,
	showMessage: PropTypes.func,
	navigation: PropTypes.object,
};

export default Groups;