import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {NativeEventEmitter, NativeModules, RefreshControl, SafeAreaView, ScrollView} from 'react-native';
import {List, Text} from 'react-native-paper';
import {Mutex} from 'async-mutex';
import {OptionsContext} from '../contexts/Options';
import {DocsContext} from '../contexts/Docs';
import Notificator from '../components/Notificator';
import styles from '../styles/default';

const {SigaPocketModule} = NativeModules;
const eventEmitter = new NativeEventEmitter(SigaPocketModule);

const {CHANNEL_ID} = SigaPocketModule.getConstants();

const Groups = ({api, parent, navigation}) =>
{
	const [options, ] = useContext(OptionsContext);
	const [state, dispatch] = useContext(DocsContext);
	const [refreshing, setRefreshing] = useState(false);

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

	const countInboxPending = (groups) =>
	{
		const inbox = (groups || []).find(group => group.grupo === 'CAIXA_DE_ENTRADA');
		if(!inbox || !inbox.grupoDocs || inbox.grupoDocs.length === 0)
		{
			return 0;
		}

		return inbox.grupoDocs.reduce((cnt, docs) => {
			return cnt + (docs.list || []).reduce((cnt2, stat) => {
				return stat.daPessoa && stat.nome.toLowerCase() === 'a receber'? 
					cnt2 + 1: 
					cnt2;
			}, 0);
		}, 0);
	};

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
			setRefreshing(true);

			const groups = await api.findGroups(options.lota);
			if(!groups)
			{
				if(!config.groups)
				{
					parent.showMessage('Falha ao carregar grupos de documentos', 'error');
				}
			}
			else
			{
				if(!api.compareGroups(config.groups, groups))
				{
					const pendingBefore = countInboxPending(config.groups);
					const pendingNow = countInboxPending(groups);
					updateGroups(groups);

					if(pendingNow > 0 && pendingNow !== pendingBefore && options.sync)
					{
						if(!await SigaPocketModule.isAppOnForeground())
						{
							Notificator.notify(`${pendingNow} expediente(s) a receber`, CHANNEL_ID);
						}
					}
				}
			}
		}
		finally
		{
			setRefreshing(false);
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
			<SafeAreaView 
				style={styles.safeAreaView}>
				<ScrollView 
					style={styles.scrollView}
					refreshControl={<RefreshControl
						refreshing={refreshing} 
						onRefresh={() => loadGroups()} />}>
					{groups.map(group => renderGroup(group))}
				</ScrollView>              
			</SafeAreaView>
		</>
	);
};

Groups.propTypes = {
	api: PropTypes.object,
	parent: PropTypes.object,
	navigation: PropTypes.object,
};

export default Groups;