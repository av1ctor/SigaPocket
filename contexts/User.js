import React, {useReducer, createContext} from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext();

const initState = {
	user: {},
	loggedIn: false
};

const reducer = (state, action) => 
{
	switch(action.type) 
	{
	case 'LOGON':
		return {
			user: action.payload,
			loggedIn: true,
		};

	case 'LOGOUT':
		return {
			user: {},
			loggedIn: false,
		};

	default:
		throw new Error();
	}
};

export const UserContextProvider = (props) => 
{
	const [state, dispatch] = useReducer(reducer, initState);

	return (
		<UserContext.Provider 
			value={[state, dispatch]}>
			{props.children}
		</UserContext.Provider>
	);
};

UserContextProvider.propTypes = {
	children: PropTypes.any
};