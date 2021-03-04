import React, {useReducer, createContext} from 'react';
import PropTypes from 'prop-types';

export const OptionsContext = createContext();

const initState = {
	sync: true,
	lota: false,
	dark: false
};

const reducer = (state, action) => 
{
	switch(action.type) 
	{
	case 'SET_SYNC':
		return {
			...state,
			sync: action.payload
		};

	case 'SET_LOTA':
		return {
			...state,
			lota: action.payload
		};

	case 'SET_DARK':
		return {
			...state,
			dark: action.payload
		};

	default:
		throw new Error();
	}
};

export const OptionsContextProvider = (props) => 
{
	const [state, dispatch] = useReducer(reducer, initState);

	return (
		<OptionsContext.Provider 
			value={[state, dispatch]}>
			{props.children}
		</OptionsContext.Provider>
	);
};

OptionsContextProvider.propTypes = {
	children: PropTypes.any
};