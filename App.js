/**
 * @format
 */

import React, {useContext} from 'react';
import {Provider as PaperProvider, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme} from 'react-native-paper';
import {NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import merge from 'deepmerge';
import {OptionsContext} from './contexts/Options';
import SigaApi from './components/SigaApi';
import Main from './Main';

const api = new SigaApi();

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export default function App() 
{
	const [options, ] = useContext(OptionsContext);
	const theme = options.dark?
		CombinedDarkTheme:
		CombinedDefaultTheme;

	return (
		<PaperProvider theme={theme}>
			<NavigationContainer theme={theme}>
				<Main api={api} />
			</NavigationContainer>
		</PaperProvider>
	);
}
