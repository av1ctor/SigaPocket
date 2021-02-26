const express = require('express');
const app = express();
const port = 8888;

app.post('/siga/public/app/login', (req, res) => 
{
	console.log('/siga/public/app/login');
	res.send('"app/principal"');
});

app.get('/siga/api/v1/pessoas', (req, res) => 
{
	console.log('/siga/api/v1/pessoas');
	res.send({list: [
		{
			sigla: 'SFP1234',
			nome: 'FOO BAR'
		}
	]});
});

const groups = require('./data/groups');

let counter = 0;

app.post('/sigaex/app/mesa2.json', (req, res) => 
{
	counter = ((counter + 1) % 4)|0;
	console.log(`/sigaex/app/mesa2.json:${counter}`);
	
	const mutated = counter === 0? 
		groups.map(g => 
		{
			if(g.grupo === 'CAIXA_DE_ENTRADA')
			{
				g = JSON.parse(JSON.stringify(g));
				g.grupoDocs[0].list[0].nome = 'Blah blah blah';
			}

			return g;
		}):
		groups;

	res.send(mutated);
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});