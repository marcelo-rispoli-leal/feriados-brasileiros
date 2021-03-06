export const swaggerDoc = {
  swagger: '2.0',
  info: {
    description:
      'This is a Brazilian Holidays API. See more information to use this in next sections',
    version: '1.0.0',
    title: 'Brazilian Holidays API',
    contact: {
      email: 'marcelorispoli@gmail.com',
    },
  },
  host: global.HOST,
  tags: [
    {
      name: 'estados',
      description:
        'GET the IBGE code of the Brazilian states and cities to help in holiday search',
    },
    {
      name: 'feriados',
      description: 'GET, PUT and DELETE Brazilian holidays',
    },
  ],
  parameters: {
    ibgeCode: {
      name: 'ibgeCode',
      in: 'path',
      description: 'IBGE code for a State or City',
      required: true,
      type: 'string',
    },
    holidayDate: {
      name: 'holidayDate',
      in: 'path',
      description:
        "Mobile holidays 'carnaval' or 'corpus-christi' or a fixed date of a holiday in MM-DD format of the city or state calendar",
      required: true,
      type: 'string',
      enum: [
        'carnaval',
        'corpus-christi',
        '01-01',
        '01-02',
        '01-03',
        '01-04',
        '01-05',
        '01-06',
        '01-07',
        '01-08',
        '01-09',
        '01-10',
        '01-11',
        '01-12',
        '01-13',
        '01-14',
        '01-15',
        '01-16',
        '01-17',
        '01-18',
        '01-19',
        '01-20',
        '01-21',
        '01-22',
        '01-23',
        '01-24',
        '01-25',
        '01-26',
        '01-27',
        '01-28',
        '01-29',
        '01-30',
        '01-31',
        '02-01',
        '02-02',
        '02-03',
        '02-04',
        '02-05',
        '02-06',
        '02-07',
        '02-08',
        '02-09',
        '02-10',
        '02-11',
        '02-12',
        '02-13',
        '02-14',
        '02-15',
        '02-16',
        '02-17',
        '02-18',
        '02-19',
        '02-20',
        '02-21',
        '02-22',
        '02-23',
        '02-24',
        '02-25',
        '02-26',
        '02-27',
        '02-28',
        '02-29',
        '03-01',
        '03-02',
        '03-03',
        '03-04',
        '03-05',
        '03-06',
        '03-07',
        '03-08',
        '03-09',
        '03-10',
        '03-11',
        '03-12',
        '03-13',
        '03-14',
        '03-15',
        '03-16',
        '03-17',
        '03-18',
        '03-19',
        '03-20',
        '03-21',
        '03-22',
        '03-23',
        '03-24',
        '03-25',
        '03-26',
        '03-27',
        '03-28',
        '03-29',
        '03-30',
        '03-31',
        '04-01',
        '04-02',
        '04-03',
        '04-04',
        '04-05',
        '04-06',
        '04-07',
        '04-08',
        '04-09',
        '04-10',
        '04-11',
        '04-12',
        '04-13',
        '04-14',
        '04-15',
        '04-16',
        '04-17',
        '04-18',
        '04-19',
        '04-20',
        '04-21',
        '04-22',
        '04-23',
        '04-24',
        '04-25',
        '04-26',
        '04-27',
        '04-28',
        '04-29',
        '04-30',
        '05-01',
        '05-02',
        '05-03',
        '05-04',
        '05-05',
        '05-06',
        '05-07',
        '05-08',
        '05-09',
        '05-10',
        '05-11',
        '05-12',
        '05-13',
        '05-14',
        '05-15',
        '05-16',
        '05-17',
        '05-18',
        '05-19',
        '05-20',
        '05-21',
        '05-22',
        '05-23',
        '05-24',
        '05-25',
        '05-26',
        '05-27',
        '05-28',
        '05-29',
        '05-30',
        '05-31',
        '06-01',
        '06-02',
        '06-03',
        '06-04',
        '06-05',
        '06-06',
        '06-07',
        '06-08',
        '06-09',
        '06-10',
        '06-11',
        '06-12',
        '06-13',
        '06-14',
        '06-15',
        '06-16',
        '06-17',
        '06-18',
        '06-19',
        '06-20',
        '06-21',
        '06-22',
        '06-23',
        '06-24',
        '06-25',
        '06-26',
        '06-27',
        '06-28',
        '06-29',
        '06-30',
        '07-01',
        '07-02',
        '07-03',
        '07-04',
        '07-05',
        '07-06',
        '07-07',
        '07-08',
        '07-09',
        '07-10',
        '07-11',
        '07-12',
        '07-13',
        '07-14',
        '07-15',
        '07-16',
        '07-17',
        '07-18',
        '07-19',
        '07-20',
        '07-21',
        '07-22',
        '07-23',
        '07-24',
        '07-25',
        '07-26',
        '07-27',
        '07-28',
        '07-29',
        '07-30',
        '07-31',
        '08-01',
        '08-02',
        '08-03',
        '08-04',
        '08-05',
        '08-06',
        '08-07',
        '08-08',
        '08-09',
        '08-10',
        '08-11',
        '08-12',
        '08-13',
        '08-14',
        '08-15',
        '08-16',
        '08-17',
        '08-18',
        '08-19',
        '08-20',
        '08-21',
        '08-22',
        '08-23',
        '08-24',
        '08-25',
        '08-26',
        '08-27',
        '08-28',
        '08-29',
        '08-30',
        '08-31',
        '09-01',
        '09-02',
        '09-03',
        '09-04',
        '09-05',
        '09-06',
        '09-07',
        '09-08',
        '09-09',
        '09-10',
        '09-11',
        '09-12',
        '09-13',
        '09-14',
        '09-15',
        '09-16',
        '09-17',
        '09-18',
        '09-19',
        '09-20',
        '09-21',
        '09-22',
        '09-23',
        '09-24',
        '09-25',
        '09-26',
        '09-27',
        '09-28',
        '09-29',
        '09-30',
        '10-01',
        '10-02',
        '10-03',
        '10-04',
        '10-05',
        '10-06',
        '10-07',
        '10-08',
        '10-09',
        '10-10',
        '10-11',
        '10-12',
        '10-13',
        '10-14',
        '10-15',
        '10-16',
        '10-17',
        '10-18',
        '10-19',
        '10-20',
        '10-21',
        '10-22',
        '10-23',
        '10-24',
        '10-25',
        '10-26',
        '10-27',
        '10-28',
        '10-29',
        '10-30',
        '10-31',
        '11-01',
        '11-02',
        '11-03',
        '11-04',
        '11-05',
        '11-06',
        '11-07',
        '11-08',
        '11-09',
        '11-10',
        '11-11',
        '11-12',
        '11-13',
        '11-14',
        '11-15',
        '11-16',
        '11-17',
        '11-18',
        '11-19',
        '11-20',
        '11-21',
        '11-22',
        '11-23',
        '11-24',
        '11-25',
        '11-26',
        '11-27',
        '11-28',
        '11-29',
        '11-30',
        '12-01',
        '12-02',
        '12-03',
        '12-04',
        '12-05',
        '12-06',
        '12-07',
        '12-08',
        '12-09',
        '12-10',
        '12-11',
        '12-12',
        '12-13',
        '12-14',
        '12-15',
        '12-16',
        '12-17',
        '12-18',
        '12-19',
        '12-20',
        '12-21',
        '12-22',
        '12-23',
        '12-24',
        '12-25',
        '12-26',
        '12-27',
        '12-28',
        '12-29',
        '12-30',
        '12-31',
      ],
    },
  },
  paths: {
    '/estados': {
      get: {
        tags: ['estados'],
        summary: 'Returns data from Brazilian states.',
        description:
          'Get the initials, the IBGE code and the name of the Brazilian states.',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'Data returned.',
            type: 'object',
            properties: {
              uf: {
                name: 'uf',
                description: 'The initials of a state',
                type: 'string',
              },
              ibge: {
                name: 'ibge',
                description: 'The IBGE code of a state.',
                type: 'string',
              },
              name: {
                name: 'name',
                description: 'The name of a state.',
                type: 'string',
              },
            },
          },
          '400': {
            description: 'An unexpected error has occurred',
            type: 'object',
            properties: {
              error: {
                name: 'error',
                description: 'The error message',
                type: 'string',
              },
            },
          },
        },
      },
    },
    '/estados/{uf}': {
      get: {
        tags: ['estados'],
        summary: 'Returns data from cities of a Brazilian state.',
        description:
          'Get the IBGE code and the name of the cities of a Brazilian state.',
        produces: ['application/json'],
        required: true,
        parameters: [
          {
            name: 'uf',
            in: 'path',
            description: 'The inicials of a Brazilian state',
            type: 'string',
            enum: [
              'AC',
              'AL',
              'AM',
              'AP',
              'BA',
              'CE',
              'DF',
              'ES',
              'GO',
              'MA',
              'MG',
              'MS',
              'MT',
              'PA',
              'PB',
              'PE',
              'PI',
              'PR',
              'RJ',
              'RN',
              'RO',
              'RR',
              'RS',
              'SC',
              'SE',
              'SP',
              'TO',
            ],
          },
        ],
        responses: {
          '200': {
            description: 'Data returned',
            type: 'object',
            properties: {
              ibge: {
                name: 'ibge',
                description: 'The IBGE code of a city.',
                type: 'string',
              },
              name: {
                name: 'name',
                description: 'The name of a city.',
                type: 'string',
              },
            },
          },
          '400': {
            description: 'An unexpected error has occurred',
            type: 'object',
            properties: {
              error: {
                name: 'error',
                description: 'The error message',
                type: 'string',
              },
            },
          },
          '404': {
            description: 'Validation exception',
            schema: {
              $ref: '#/definitions/StateError',
            },
          },
        },
      },
    },
    '/feriados/{ibgeCode}/{holidayDate}': {
      get: {
        tags: ['feriados'],
        summary:
          'Return a name of a Brazian holiday in a state or city calendar',
        description:
          'Get a name of a holiday for the IBGE code of the state or city and date in format YYYY-MM-DD.',
        produces: ['application/json'],
        parameters: [
          {
            $ref: '#/parameters/ibgeCode',
          },
          {
            name: 'holidayDate',
            in: 'path',
            description:
              'A full-date of a holiday in YYYY-MM-DD format to be seached',
            required: true,
            type: 'string',
            format: 'date',
          },
        ],
        responses: {
          '200': {
            description: 'Holiday name returned',
            schema: {
              $ref: '#/definitions/GetName',
            },
          },
          '400': {
            description: 'Validation exception',
            schema: {
              $ref: '#/definitions/DateError',
            },
          },
          '404': {
            description: 'Holiday not found',
            schema: {
              $ref: '#/definitions/GetError',
            },
          },
        },
      },
      put: {
        tags: ['feriados'],
        summary:
          'Inserts the carnival tuesday, corpus christi or a fixed date into the state or city holiday calendar',
        description:
          "Enter the IBGE code of the state or city and date 'carnaval' or 'corpus-christi' to register the holiday. If entered a date in format MM-DD is required the name of holiday in body request.",
        produces: ['application/json'],
        parameters: [
          {
            $ref: '#/parameters/ibgeCode',
          },
          {
            $ref: '#/parameters/holidayDate',
          },
          {
            in: 'body',
            name: 'name',
            description: 'Name of the holiday',
            required: false,
            schema: {
              $ref: '#/definitions/PutName',
            },
          },
        ],
        responses: {
          '200': {
            description:
              'Holiday already registered in the state or city calendar. Holiday name updated if used a date in MM-DD format',
            schema: {
              $ref: '#/definitions/Holiday',
            },
          },
          '201': {
            description: 'Holiday inserted in the state or city calendar',
            schema: {
              $ref: '#/definitions/Holiday',
            },
          },
          '400': {
            description: 'Validation exception',
            schema: {
              $ref: '#/definitions/PutError',
            },
          },
        },
      },
      delete: {
        tags: ['feriados'],
        summary:
          'Deletes the carnival tuesday, corpus christi or a fixed date of the state or city holiday calendar',
        description:
          "Enter the IBGE code of the state or city and date 'carnaval', 'corpus-christi' or a date in format MM-DD to deletes the holiday.",
        parameters: [
          {
            $ref: '#/parameters/ibgeCode',
          },
          {
            $ref: '#/parameters/holidayDate',
          },
        ],
        responses: {
          '204': {
            description: 'Holiday deleted of the state or city calendar.',
          },
          '400': {
            description: 'Validation exception',
            schema: {
              $ref: '#/definitions/IbgeError',
            },
          },
          '403': {
            description:
              'Invalid operation. A state holiday is not deleted if the date is a national holiday and a municipal holiday is not deleted if the date is a national or state holiday',
            schema: {
              $ref: '#/definitions/Holiday',
            },
          },
          '404': {
            description: 'Holiday not found',
            schema: {
              $ref: '#/definitions/DeleteError',
            },
          },
        },
      },
    },
  },
  definitions: {
    GetName: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name and sphere of a holiday',
          example: 'Feriado Nacional de Tiradentes',
        },
      },
      xml: {
        name: 'GetName',
      },
    },
    PutName: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of a holiday.',
          example: 'Revolução Farroupilha',
        },
      },
      xml: {
        name: 'PutName',
      },
    },
    Holiday: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
          example: 1,
        },
        ibge: {
          type: 'string',
          example: '43',
        },
        date: {
          type: 'string',
          example: '09-20',
        },
        name: {
          type: 'string',
          example: 'Revolução Farroupilha',
        },
      },
      xml: {
        name: 'Holiday',
      },
    },
    GetError: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'Holiday not found.',
          example:
            'Não há feriado cadastrado na data 2001-09-20 para o código do IBGE 43',
        },
      },
    },
    PutError: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'Name required',
          example:
            "É obrigatório 'name' quando a data é diferente de 'carnaval' ou 'corpus-cristi'.",
        },
      },
      xml: {
        name: 'PutError',
      },
    },
    DeleteError: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'Holiday not found.',
          example:
            'Não há feriado cadastrado na data 09-20 para o código do IBGE 43',
        },
      },
      xml: {
        name: 'DeleteError',
      },
    },
    StateError: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'Invalid state initials.',
          example: "Não há estado brasileiro com a sigla 'UF'",
        },
      },
      xml: {
        name: 'StateError',
      },
    },
    IbgeError: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'Invalid IBGE code.',
          example: "Código do IBGE '44' não encontrado.",
        },
      },
      xml: {
        name: 'IbgeError',
      },
    },
    DateError: {
      type: 'object',
      properties: {
        error: {
          type: 'string',
          description: 'Invalid date',
          example: "Data '2001-02-29' não é válida, usar o formato aaaa-mm-dd.",
        },
      },
      xml: {
        name: 'DateError',
      },
    },
  },
};
