/**
 * @format
 */

// SigaPocket - app para acesso ao Sem Papel (www.documentos.spsempapel.sp.gov.br)
// Copyright 2021 André Vicentini (avtvicentini)
// Licenciado sob GNU GPL-2.0-ou-posterior

import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import {OptionsContextProvider} from './contexts/Options';
import {UserContextProvider} from './contexts/User';
import {DocsContextProvider} from './contexts/Docs';
import {name as appName} from './app.json';
import App from './App';

export default function Index() 
{
	return (
		<OptionsContextProvider>
			<UserContextProvider>
				<DocsContextProvider>
					<App />
				</DocsContextProvider>
			</UserContextProvider>
		</OptionsContextProvider>
	);
}

AppRegistry.registerComponent(appName, () => Index);
