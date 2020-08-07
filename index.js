import express from 'express';
import winston from 'winston';
import cors from 'cors';
import holidaysRouter from './feriados/feriados.js';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

global.estados = 'estados.json';
global.cidades = 'cidades.json';

global.nacional = 'nacional.json';
global.estadual = 'estadual.json';
global.municipal = 'municipal.json';
global.carnaval = 'carnaval.json';
global.cchristi = 'corpus-christi.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'feriados-api.log' }),
  ],
  format: combine(label({ label: 'feriados-api' }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use(cors());
app.use('/feriados', holidaysRouter);

const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => {
  res.end();
});

//escuta app
app.listen(PORT, async () => {
  try {
    await readFile(nacional);
    await readFile(estadual);
    await readFile(municipal);
    await readFile(carnaval);
    await readFile(cchristi);
    logger.info('API Started!');
  } catch (err) {
    // cria arquivo temporário de feriados nacionais
    let tmpJson = {
      feriados: [
        { id: 1, date: '01-01', name: 'Ano Novo' },
        { id: 2, date: '04-21', name: 'Tiradentes' },
        { id: 3, date: '05-01', name: 'Dia do Trabalhador' },
        { id: 4, date: '09-07', name: 'Independência' },
        { id: 5, date: '10-12', name: 'Nossa Senhora Aparecida' },
        { id: 6, date: '11-02', name: 'Finados' },
        { id: 7, date: '11-15', name: 'Proclamação da República' },
        { id: 8, date: '12-25', name: 'Natal' },
      ],
    };

    //escreve arquivo de feriados nacionais
    writeFile(nacional, JSON.stringify(tmpJson, null, 2))
      .then(() => {
        logger.info('National Holidays Created!');
      })
      .catch((err) => {
        logger.error(err);
      });

    // cria arquivos temporário de demais feriados
    tmpJson = {
      nextId: 1,
      feriados: [],
    };

    // escreve arquivo de feriados estaduais
    writeFile(estadual, JSON.stringify(tmpJson, null, 2))
      .then(() => {
        logger.info('State Holidays File Created!');
      })
      .catch((err) => {
        logger.error(err);
      });

    // escreve arquivo de feriados municipais
    writeFile(municipal, JSON.stringify(tmpJson, null, 2))
      .then(() => {
        logger.info('Municipal Holidays File Created!');
      })
      .catch((err) => {
        logger.error(err);
      });

    // escreve arquivo de carnaval
    writeFile(carnaval, JSON.stringify(tmpJson, null, 2))
      .then(() => {
        logger.info('Carnival Holidays File Created!');
      })
      .catch((err) => {
        logger.error(err);
      });

    // escreve arquivo de corpus christi
    writeFile(cchristi, JSON.stringify(tmpJson, null, 2))
      .then(() => {
        logger.info('Corpus Christi Holidays File Created!');
      })
      .catch((err) => {
        logger.error(err);
      });

    logger.info('API Started!');
  }
});
