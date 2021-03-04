/**
 * @format
 * @flow strict-local
 */

import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, View, SafeAreaView, ScrollView} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {USERNAME_, PASSWORD_} from '@env';
import styles from '../styles/default';
import {UserContext} from '../contexts/User';
import LoadingIndicator from '../components/LoadingIndicator';

const Logon = ({api, parent, navigation}) =>
{
	const [username, setUsername] = useState(USERNAME_ || '');
	const [password, setPassword] = useState(PASSWORD_ || '');
	const [loading, setLoading] = useState(false);
	const [, dispatch] = useContext(UserContext);

	useEffect(() =>
	{
		(async() => {
			const user = await loadUser();
			if(user.username)
			{
				setUsername(user.username);
				setPassword(user.password);
			}
		})();
	}, []);

	const validateForm = () =>
	{
		if(!username)
		{
			parent.showMessage('CPF ou matrícula obrigatório', 'error');
			return false;
		}
		
		if(!password)
		{
			parent.showMessage('Senha obrigatória', 'error');
			return false;
		}

		return true;
	};

	const storeUser = (username, password) =>
	{
		AsyncStorage.multiSet([
			['@username', username],
			['@password', password]
		]);
	};

	const loadUser = async () =>
	{
		const username = await AsyncStorage.getItem('@username');
		const password = await AsyncStorage.getItem('@password');
		return {username, password};
	};

	const doLogon = async () =>
	{
		try
		{
			if(!validateForm())
			{
				return;
			}
			
			setLoading(true);

			const res = await api.logon(username, password);
			if(res.errors !== null)
			{
				parent.showMessage(res.errors, 'error');
				return;
			}

			dispatch({
				type: 'LOGON',
				payload: {
					...res.data,
					loggedIn: true,
				}
			});

			storeUser(username, password);

			navigation.navigate('Groups');
		}
		finally
		{
			setLoading(false);
		}
	};

	return (
		<>
			<SafeAreaView style={styles.safeAreaView}>
				<ScrollView style={styles.scrollView}>
					<View style={styles.view}>
						<Image 
							style={styles.logo}
							// eslint-disable-next-line no-undef
							source={require('../assets/logo-sem-papel-cor.png')}
						/>
					</View>

					<View style={styles.view}>
						<TextInput
							label="Usuário"
							placeholder="Digite seu CPF ou matrícula"
							onChangeText={setUsername}
							value={username}
						/>
					</View>

					<View style={styles.view}>
						<TextInput
							secureTextEntry
							label="Senha"
							placeholder="Senha"
							onChangeText={setPassword}
							value={password}
						/>
					</View>

					<View style={styles.view}>
						<Button
							mode="contained"
							icon="login"
							disabled={loading}
							onPress={doLogon}
						>
							<Text style={{color: '#fff'}}>Entrar</Text>
						</Button>
					</View>
				</ScrollView>
			</SafeAreaView>
			<LoadingIndicator
				loading={loading} />
		</>
	);
};

Logon.propTypes = {
	api: PropTypes.object,
	parent: PropTypes.object,
	navigation: PropTypes.object,
};

export default Logon;