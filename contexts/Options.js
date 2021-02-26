import React, {useReducer, createContext} from 'react';
import PropTypes from 'prop-types';

export const OptionsContext = createContext();

const initState = {
	sync: true
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