import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1
	},
	scrollView: {
		margin: 10,
	},
	body: {
		backgroundColor: '#fff',
	},
	logo: {
		width: 120,
		height: 55,
		resizeMode: 'center',
		alignSelf: 'center'
	},
	view: {
		paddingTop: 4,
	},
	pdfContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 25,
	},
	stateContainer: {
		paddingTop: 8,
		paddingBottom: 8,
		flexDirection: 'row',
		alignItems: 'center'
	},
	switchContainer: {
		marginTop: 8,
		marginBottom: 8,
		flexDirection: 'row',
		alignItems: 'center'
	},
	loadingContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});

export default styles;