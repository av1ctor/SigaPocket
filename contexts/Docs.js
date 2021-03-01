import React, {useReducer, createContext} from 'react';
import PropTypes from 'prop-types';

export const DocsContext = createContext();

const initState = {
	groups: []
};

const reducer = (state, action) =>
{
	switch(action.type)
	{
	case 'SET_GROUPS':
		return {
			groups: action.payload
		};

	case 'SET_DOC_PARTS':
		return {
			groups: state.groups.map(group => 
				group.grupo !== action.groupId? 
					group: 
					{
						...group, 
						grupoDocs: group.grupoDocs.map(doc => 
							doc.codigo !== action.docId? 
								doc: 
								{
									...doc, 
									parts: {
										list: action.payload, 
										date: Date.now()
									}
								}
						)
					}
			)
		};

	case 'SET_DOC_PART_URL':
		return {
			groups: state.groups.map(group => 
				group.grupo !== action.groupId? 
					group: 
					{
						...group, 
						grupoDocs: group.grupoDocs.map(doc => 
							doc.codigo !== action.docId? 
								doc: 
								{
									...doc, 
									parts: {
										...doc.parts,
										list: doc.parts.list.map(part => 
											part.sigla !== action.partId?
												part:
												{
													...part,
													url: action.payload
												}
										)
									}
								}
						)
					}
			)
		};

	default:
		throw new Error();
	}
};

export const DocsContextProvider = (props) =>
{
	const [state, dispatch] = useReducer(reducer, initState);
    
	return (
		<DocsContext.Provider 
			value={[state, dispatch]}>
			{props.children}
		</DocsContext.Provider>
	);
};

DocsContextProvider.propTypes = {
	children: PropTypes.any
};