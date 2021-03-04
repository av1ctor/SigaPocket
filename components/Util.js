

export function memoize(method, options = {ttl: null}) 
{
	const values = new Map();
	const times = new Map();
    
	return async function() 
	{
		const key = JSON.stringify(arguments);
		const exists = values.has(key);
		const valid = exists && (!options.ttl || Date.now() <= times.get(key) + options.ttl);

		const value = valid? 
			values.get(key): 
			method.apply(this, arguments);
		
		if(!valid)
		{
			values.set(key, value);
			times.set(key, Date.now());
		}
		
		return value;
	};
}