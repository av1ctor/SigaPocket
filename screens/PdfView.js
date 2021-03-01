import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Colors, ProgressBar, Text} from 'react-native-paper';
import Pdf from 'react-native-pdf';
import LoadingIndicator from '../components/LoadingIndicator';
import styles from '../styles/default';

const PdfView = ({api, showMessage, route}) =>
{
	const [url, setUrl] = useState(null);
	const [generated, setGenerated] = useState(0.0);
	const [loaded, setLoaded] = useState(1.0);

	useEffect(() =>
	{
		(async () =>
		{
			const {sigla} = route.params;
			const res = await api.findPdf(sigla, false, (completed) => setGenerated(completed));
			if(res === null)
			{
				showMessage('Falha ao gerar PDF', 'error');
				return;
			}
    
			setUrl(res);
			setGenerated(1.0);
			setLoaded(0.0);
		})();
	}, [route.params.sigla]);

	return (
		<>
			{url?
				loaded > 0.0 &&
					<ProgressBar 
						progress={loaded}
						color={Colors.red800}
						visible={loaded < 1.0} 
					/>
				:
				generated > 0.0 &&
					<ProgressBar 
						progress={generated}
						color={Colors.red800}
						visible={generated < 1.0}
					/>
				
			}
			
			<View style={styles.pdfContainer}>
				{url?
					<>
						{loaded < 1.0 &&
							<Text>
								Carregando: {(loaded * 100).toFixed(0)}%
							</Text>
						}
						<Pdf
							source={{uri: url, cache: true}}
							style={localStyles.pdf}
							onLoadProgress={(percent) => setLoaded(percent)}
							onLoadComplete={() => setLoaded(1.0)}
							onError={() => showMessage('Falha ao carregar PDF', 'error')}
							activityIndicator={<></>}
						/>
					</>:
					<>
						<Text>
							Gerando: {(generated * 100).toFixed(0)}%
						</Text>
					</>
				}
			</View>
			<LoadingIndicator
				loading={!url} />
		</>
	);
};

const localStyles = StyleSheet.create({
	pdf: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	}
});

PdfView.propTypes = {
	api: PropTypes.object,
	showMessage: PropTypes.func,
	route: PropTypes.object,
};
export default PdfView;