import express from 'express';
import { promises as fs } from 'fs';

const { readFile } = fs;
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const states = JSON.parse(await readFile(global.estados));
    res.send(JSON.stringify(states.estados, null, 2));
    logger.info(`${req.method} ${req.baseUrl} - 200`);
  } catch (err) {
    next(err);
  }
});

router.get('/:uf', async (req, res, next) => {
  try {
    const myUF = req.params.uf;
    const states = JSON.parse(await readFile(global.estados));
    const index = await states.estados.findIndex((a) => a.uf === myUF);
    let ret = null;

    if (index === -1) {
      ret = {
        error: "Não há estado brasileiro com a sigla '" + myUF + "'",
      };
      res.status(404).send(JSON.stringify(ret, null, 2));
      logger.info(`${req.method} ${req.baseUrl} - 404("${myUF}")`);
      return;
    }

    // console.log(states.estados.map((a) => a.uf));

    let cities = JSON.parse(await readFile(global.cidades));

    ret = await cities.cidades
      .filter((a) => a.uf === myUF)
      .map((item) => {
        const { ibge, name } = item;
        return {
          ibge,
          name,
        };
      });

    res.send(JSON.stringify(ret, null, 2));
    logger.info(`${req.method} ${req.baseUrl} - 200("${myUF}")`);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, _) => {
  logger.error(
    `${req.method} ${req.baseUrl} - 400: {"error": "${err.message}"}`
  );
  res.status(400).send({ error: err.message });
});

export default router;
