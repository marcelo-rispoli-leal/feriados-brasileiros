import express from 'express';
import winston from 'winston';
import cors from 'cors';
import holidaysRouter from './routes/feriados.js';
import statesRouter from './routes/estados.js';
import { promises as fs } from 'fs';
import swaggerUi from 'swagger-ui-express';
import { swaggerDoc } from './docs/doc.js';

const { readFile, writeFile } = fs;

global.estados = './json/estados.json';
global.cidades = './json/cidades.json';
global.nacional = './json/nacional.json';
global.estadual = './json/estadual.json';
global.municipal = './json/municipal.json';
global.carnaval = './json/carnaval.json';
global.cchristi = './json/corpus-christi.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logs/feriados-api.log' }),
  ],
  format: combine(label({ label: 'feriados-api' }), timestamp(), myFormat),
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST.trim() || 'feriados-brasileiros.herokuapp.com';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/feriados', holidaysRouter);
app.use('/estados', statesRouter);

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
    logger.info("API Started! '" + HOST + "'");
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
    writeFile(nacional, JSON.stringify(tmpJson))
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
    writeFile(estadual, JSON.stringify(tmpJson))
      .then(() => {
        logger.info('State Holidays File Created!');
      })
      .catch((err) => {
        logger.error(err);
      });

    // escreve arquivo de feriados municipais
    writeFile(municipal, JSON.stringify(tmpJson))
      .then(() => {
        logger.info('Municipal Holidays File Created!');
      })
      .catch((err) => {
        logger.error(err);
      });

    // escreve arquivo de carnaval
    writeFile(carnaval, JSON.stringify(tmpJson))
      .then(() => {
        logger.info('Carnival Holidays File Created!');
      })
      .catch((err) => {
        logger.error(err);
      });

    // escreve arquivo de corpus christi
    writeFile(cchristi, JSON.stringify(tmpJson))
      .then(() => {
        logger.info('Corpus Christi Holidays File Created!');
      })
      .catch((err) => {
        logger.error(err);
      });

    logger.info('API Started!');
  }
});
