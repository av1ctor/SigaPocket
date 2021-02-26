const groups = [
	{
		'grupo': 'PRONTO_PARA_ASSINAR',
		'grupoNome': 'Pronto para Assinar',
		'grupoIcone': 'fas fa-inbox',
		'grupoCounterUser': 0,
		'grupoCounterLota': 0,
		'grupoCounterAtivo': 0,
		'grupoQtd': 0,
		'grupoQtdPag': 500,
		'grupoOrdem': '1',
		'grupoCollapsed': true,
		'grupoHide': false,
		'grupoMarcadores': [
			71
		]
	},
	{
		'grupo': 'ALERTA',
		'grupoNome': 'Alertas',
		'grupoIcone': 'fas fa-hourglass-end',
		'grupoCounterUser': 0,
		'grupoCounterLota': 1,
		'grupoCounterAtivo': 0,
		'grupoQtd': 500,
		'grupoQtdPag': 500,
		'grupoOrdem': '2',
		'grupoCollapsed': false,
		'grupoHide': false,
		'grupoMarcadores': [
			4,
			29,
			30,
			38,
			58,
			59,
			60,
			65,
			69,
			1000,
			1001,
			1002,
			1003,
			1004,
			1008,
			1009,
			1010
		]
	},
	{
		'grupo': 'A_REVISAR',
		'grupoNome': 'Pendente de Revisão',
		'grupoIcone': 'fas fa-glasses',
		'grupoCounterUser': 0,
		'grupoCounterLota': 0,
		'grupoCounterAtivo': 0,
		'grupoQtd': 0,
		'grupoQtdPag': 500,
		'grupoOrdem': '3',
		'grupoCollapsed': true,
		'grupoHide': false,
		'grupoMarcadores': [
			72
		]
	},
	{
		'grupo': 'A_ASSINAR',
		'grupoNome': 'Pendente de Assinatura',
		'grupoIcone': 'fas fa-key',
		'grupoCounterUser': 0,
		'grupoCounterLota': 0,
		'grupoCounterAtivo': 0,
		'grupoQtd': 500,
		'grupoQtdPag': 500,
		'grupoOrdem': '4',
		'grupoCollapsed': false,
		'grupoHide': false,
		'grupoMarcadores': [
			25
		]
	},
	{
		'grupo': 'CAIXA_DE_ENTRADA',
		'grupoNome': 'Caixa de Entrada',
		'grupoIcone': 'fas fa-inbox',
		'grupoCounterUser': 2,
		'grupoCounterLota': 12,
		'grupoCounterAtivo': 2,
		'grupoQtd': 500,
		'grupoQtdPag': 500,
		'grupoOrdem': '5',
		'grupoCollapsed': false,
		'grupoHide': false,
		'grupoDocs': [
			{
				'grupoOrdem': '5',
				'tipo': 'Documento',
				'datahora': '2021-02-25T18:44:38.000-03:00',
				'datahoraDDMMYYYHHMM': '25/02/2021 18:44:38',
				'tempoRelativo': '16h',
				'codigo': 'SFPPRC1234V1',
				'sigla': 'SFP-PRC-2020/1234-V01',
				'descr': 'Complemento do Assunto: PROCEDIMENTO ADMINISTRATIVO DE CONSTATAÇÃO DE NULIDADE DE INSCRIÇÃO - PCN',
				'origem': 'SFP / 1234',
				'dataDevolucao': 'ocultar',
				'tipoDoc': 'Avulso',
				'list': [
					{
						'pessoa': '1234',
						'lotacao': '1234',
						'nome': 'A Receber',
						'icone': 'fas fa-inbox',
						'titulo': '16h',
						'inicio': '2021-02-25T18:44:38.000-03:00',
						'daPessoa': true,
						'daLotacao': true
					}
				]
			},
			{
				'grupoOrdem': '5',
				'tipo': 'Documento',
				'datahora': '2021-02-25T18:43:39.000-03:00',
				'datahoraDDMMYYYHHMM': '25/02/2021 18:43:39',
				'tempoRelativo': '16h',
				'codigo': 'SFPPRC1234V01',
				'sigla': 'SFP-PRC-2021/1234-V01',
				'descr': 'Complemento do Assunto: PROCEDIMENTO ADMINISTRATIVO DE CASSAÇÃO DE EFICÁCIA DE INSCRIÇÃO ESTADUAL',
				'origem': 'SFP / 1234',
				'dataDevolucao': 'ocultar',
				'tipoDoc': 'Avulso',
				'list': [
					{
						'pessoa': '1234',
						'lotacao': '1234',
						'nome': 'A Receber',
						'icone': 'fas fa-inbox',
						'titulo': '16h',
						'inicio': '2021-02-25T18:43:39.000-03:00',
						'daPessoa': true,
						'daLotacao': true
					}
				]
			}
		],
		'grupoMarcadores': [
			3,
			14,
			41,
			67
		]
	},
	{
		'grupo': 'EM_ELABORACAO',
		'grupoNome': 'Em Elaboração',
		'grupoIcone': 'fas fa-lightbulb',
		'grupoCounterUser': 0,
		'grupoCounterLota': 4,
		'grupoCounterAtivo': 0,
		'grupoQtd': 500,
		'grupoQtdPag': 500,
		'grupoOrdem': '6',
		'grupoCollapsed': false,
		'grupoHide': false,
		'grupoMarcadores': [
			1
		]
	},
	{
		'grupo': 'AGUARDANDO_ANDAMENTO',
		'grupoNome': 'Aguardando Andamento',
		'grupoIcone': 'fas fa-clock',
		'grupoCounterUser': 3,
		'grupoCounterLota': 101,
		'grupoCounterAtivo': 3,
		'grupoQtd': 500,
		'grupoQtdPag': 500,
		'grupoOrdem': '7',
		'grupoCollapsed': false,
		'grupoHide': false,
		'grupoDocs': [
			{
				'grupoOrdem': '7',
				'tipo': 'Documento',
				'datahora': '2021-02-25T16:56:07.000-03:00',
				'datahoraDDMMYYYHHMM': '25/02/2021 16:56:07',
				'tempoRelativo': '18h',
				'codigo': 'SFPPRC202026231V01',
				'sigla': 'SFP-PRC-2020/26231-V01',
				'descr': 'Complemento do Assunto: TERMO DE EXCLUSÃO DO SIMPLES NACIONAL',
				'origem': 'SFP / 1234',
				'dataDevolucao': 'ocultar',
				'tipoDoc': 'Avulso',
				'list': [
					{
						'pessoa': '1234',
						'lotacao': '1234',
						'nome': 'Em Trâmite',
						'icone': 'fas fa-shipping-fast',
						'titulo': '18h',
						'inicio': '2021-02-25T16:56:07.000-03:00',
						'daPessoa': true,
						'daLotacao': true
					}
				]
			},
			{
				'grupoOrdem': '7',
				'tipo': 'Documento',
				'datahora': '2021-02-23T17:13:22.000-03:00',
				'datahoraDDMMYYYHHMM': '23/02/2021 17:13:22',
				'tempoRelativo': '3 dias',
				'codigo': 'SFPEXP1234A',
				'sigla': 'SFP-EXP-2021/1234-A',
				'descr': 'Complemento do Assunto: DEMONSTRATIVO - SUSPENSÃO PREVENTIVA',
				'origem': 'SFP / 1234',
				'dataDevolucao': 'ocultar',
				'tipoDoc': 'Avulso',
				'list': [
					{
						'pessoa': '1234',
						'lotacao': '1234',
						'nome': 'Aguardando Andamento',
						'icone': 'fas fa-clock',
						'titulo': '3 dias',
						'inicio': '2021-02-23T17:13:22.000-03:00',
						'daPessoa': true,
						'daLotacao': true
					}
				]
			},
			{
				'grupoOrdem': '7',
				'tipo': 'Documento',
				'datahora': '2021-01-26T13:45:16.000-03:00',
				'datahoraDDMMYYYHHMM': '26/01/2021 13:45:16',
				'tempoRelativo': '1 mês',
				'codigo': 'SFPEXP1234A',
				'sigla': 'SFP-EXP-2020/1234-A',
				'descr': 'Complemento do Assunto: CREDENCIAMENTO DE FILIAL COMO OPERADOR LOGISTICO',
				'origem': 'SFP / 1234',
				'dataDevolucao': 'ocultar',
				'tipoDoc': 'Avulso',
				'list': [
					{
						'pessoa': '1234',
						'lotacao': '1234',
						'nome': 'Aguardando Andamento',
						'icone': 'fas fa-clock',
						'titulo': '1 mês',
						'inicio': '2021-01-26T13:45:16.000-03:00',
						'daPessoa': true,
						'daLotacao': true
					}
				]
			},
			{
				'grupoOrdem': '7',
				'tipo': 'Documento',
				'datahora': '2021-01-22T16:48:55.000-03:00',
				'datahoraDDMMYYYHHMM': '22/01/2021 16:48:55',
				'tempoRelativo': '1 mês',
				'codigo': 'SFPEXP1234A',
				'sigla': 'SFP-EXP-2020/1234-A',
				'descr': 'Complemento do Assunto: cisão de patrimonio - abertura de nova filial',
				'origem': 'SFP / 1234',
				'dataDevolucao': 'ocultar',
				'tipoDoc': 'Avulso',
				'list': [
					{
						'pessoa': '1234',
						'lotacao': '1234',
						'nome': 'Aguardando Andamento',
						'icone': 'fas fa-clock',
						'titulo': '1 mês',
						'inicio': '2021-01-22T16:48:55.000-03:00',
						'daPessoa': true,
						'daLotacao': true
					}
				]
			}
		],
		'grupoMarcadores': [
			2,
			15,
			17,
			24,
			26,
			36,
			37,
			39,
			40,
			42,
			46,
			47,
			48,
			49,
			52,
			53,
			54,
			56,
			57,
			61,
			66,
			68,
			1005
		]
	},
	{
		'grupo': 'ACOMPANHANDO',
		'grupoNome': 'Acompanhando',
		'grupoIcone': 'fas fa-tags',
		'grupoCounterUser': 2,
		'grupoCounterLota': 3,
		'grupoCounterAtivo': 2,
		'grupoQtd': 500,
		'grupoQtdPag': 500,
		'grupoOrdem': '9',
		'grupoCollapsed': false,
		'grupoHide': false,
		'grupoDocs': [
			{
				'grupoOrdem': '9',
				'tipo': 'Documento',
				'datahora': '2021-02-25T14:14:43.000-03:00',
				'datahoraDDMMYYYHHMM': '25/02/2021 14:14:43',
				'tempoRelativo': '20h',
				'codigo': 'SFPEXP1234A',
				'sigla': 'SFP-EXP-2020/1234-A',
				'descr': 'Complemento do Assunto: Denegação emissão NFe - Limite SN',
				'origem': 'SFP / 1234',
				'dataDevolucao': 'ocultar',
				'tipoDoc': 'Avulso',
				'list': [
					{
						'pessoa': '1234',
						'lotacao': '1234',
						'nome': 'Sobrestado',
						'icone': 'fas fa-hourglass-start',
						'titulo': '20h',
						'inicio': '2021-02-25T14:14:43.000-03:00',
						'daPessoa': true,
						'daLotacao': true
					}
				]
			},
			{
				'grupoOrdem': '9',
				'tipo': 'Documento',
				'datahora': '2021-02-25T13:31:26.000-03:00',
				'datahoraDDMMYYYHHMM': '25/02/2021 13:31:26',
				'tempoRelativo': '21h',
				'codigo': 'SFPEXP1234A',
				'sigla': 'SFP-EXP-2020/1234-A',
				'descr': 'Complemento do Assunto: DEMONSTRATIVO DE NÃO LOCALIZAÇÃO PREVENTIVO 2.05P',
				'origem': 'SFP / 1234',
				'dataDevolucao': 'ocultar',
				'tipoDoc': 'Avulso',
				'list': [
					{
						'pessoa': '1234',
						'lotacao': '1234',
						'nome': 'Sobrestado',
						'icone': 'fas fa-hourglass-start',
						'titulo': '21h',
						'inicio': '2021-02-25T13:31:26.000-03:00',
						'daPessoa': true,
						'daLotacao': true
					}
				]
			}
		],
		'grupoMarcadores': [
			27,
			28,
			31,
			70
		]
	},
	{
		'grupo': 'MONITORANDO',
		'grupoNome': 'Monitorando',
		'grupoIcone': 'fas fa-hourglass-half',
		'grupoCounterUser': 0,
		'grupoCounterLota': 0,
		'grupoCounterAtivo': 0,
		'grupoQtd': 0,
		'grupoQtdPag': 500,
		'grupoOrdem': '10',
		'grupoCollapsed': true,
		'grupoHide': false,
		'grupoMarcadores': []
	},
	{
		'grupo': 'AGUARDANDO_ACAO_DE_TEMPORALIDADE',
		'grupoNome': 'Aguardando Ação de Temporalidade',
		'grupoIcone': 'fas fa-hourglass-half',
		'grupoCounterUser': 0,
		'grupoCounterLota': 0,
		'grupoCounterAtivo': 0,
		'grupoQtd': 0,
		'grupoQtdPag': 500,
		'grupoOrdem': '11',
		'grupoCollapsed': true,
		'grupoHide': true,
		'grupoMarcadores': [
			7,
			50,
			51
		]
	},
	{
		'grupo': 'OUTROS',
		'grupoNome': 'Outros',
		'grupoIcone': 'fas fa-inbox',
		'grupoCounterUser': 0,
		'grupoCounterLota': 0,
		'grupoCounterAtivo': 0,
		'grupoQtd': 0,
		'grupoQtdPag': 500,
		'grupoOrdem': '12',
		'grupoCollapsed': true,
		'grupoHide': false,
		'grupoMarcadores': [
			5,
			6,
			8,
			9,
			16,
			10,
			11,
			12,
			13,
			16,
			18,
			19,
			20,
			21,
			22,
			43,
			44
		]
	}
];

module.exports = groups;