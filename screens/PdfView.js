import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Colors, ProgressBar, Text} from 'react-native-paper';
import Pdf from 'react-native-pdf';
import {DocsContext} from '../contexts/Docs';
import LoadingIndicator from '../components/LoadingIndicator';
import styles from '../styles/default';

const PdfView = ({api, showMessage, route}) =>
{
	const [state, dispatch] = useContext(DocsContext);
	const [generated, setGenerated] = useState(0.0);
	const [loaded, setLoaded] = useState(1.0);

	const {groupId, docId, partId} = route.params;
	const group = state.groups.find(g => g.grupo === groupId) || {};
	const doc = (group.grupoDocs || []).find(d => d.codigo === docId) || {};
	const part = ((doc.parts && doc.parts.list) || []).find(p => p.sigla === partId) || {};

	useEffect(() =>
	{
		loadPdf(route.params.partId);
	}, [route.params.partId]);

	const loadPdf = async (sigla) =>
	{
		if(!sigla || part.url)
		{
			return;
		}

		const url = await api.findPdf(sigla, false, (completed) => setGenerated(completed));
		if(url === null)
		{
			showMessage('Falha ao gerar PDF', 'error');
			return;
		}

		dispatch({
			type: 'SET_DOC_PART_URL',
			groupId: groupId,
			docId: docId,
			partId: sigla,
			payload: url
		});

		setGenerated(1.0);
		setLoaded(0.0);
	};

	return (
		<>
			{part.url?
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
				{part.url?
					<>
						{loaded < 1.0 &&
							<Text>
								Carregando: {(loaded * 100).toFixed(0)}%
							</Text>
						}
						<Pdf
							source={{uri: part.url, cache: true}}
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
				loading={!part.url} />
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