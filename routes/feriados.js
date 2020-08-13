import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;
const router = express.Router();

//verificação do código
async function checkCod(myCod) {
  let file = null;
  let ret = null;

  if (myCod.length === 2) {
    file = JSON.parse(await readFile(global.estados));
    ret = file.estados.find((a) => a.ibge === myCod);
  } else if (myCod.length === 7) {
    file = JSON.parse(await readFile(global.cidades));
    ret = file.cidades.find((a) => a.ibge === myCod);
  }

  if (!ret) {
    throw new Error("Código do IBGE '" + myCod + "' não encontrado.");
  }
  return ret;
}

//verificação de data completa
function checkFullDate(myDate) {
  //valida separadores e cumprimento do texto
  if (
    myDate.length !== 10 ||
    myDate.substr(4, 1) !== '-' ||
    myDate.substr(7, 1) !== '-'
  ) {
    throw new Error(
      "Data '" + myDate + "' inválida, usar o formato aaaa-mm-dd."
    );
  }

  //valida data
  const tmp = new Date(myDate + 'T00:00:00');
  if (isNaN(tmp)) {
    throw new Error(
      "Data '" + myDate + "' não é válida, usar o formato aaaa-mm-dd."
    );
  }

  const yyyy = myDate.substring(0, 4);
  const mm = myDate.substring(5, 7);
  const dd = myDate.substring(8, 10);

  //valida dia mês e ano acima de zero
  if (parseInt(yyyy) < 1 || parseInt(mm) < 1 || parseInt(dd) < 1) {
    throw new Error("Data '" + myDate + "' inválida, menor que 0001-01-01.");
  }
  return myDate;
}

//verificação de mês e dia
function checkMonthDay(myDate) {
  //valida datas especiais
  if (myDate === 'carnaval' || myDate === 'corpus-christi') {
    return myDate;
  }

  //valida separador e cumprimento do texto
  if (myDate.length !== 5 || myDate.substr(2, 1) !== '-') {
    throw new Error(
      "Mês e Dia '" +
        myDate +
        "' inválido, informar data 'carnaval', 'corpus-christi' ou usar o formato mm-dd."
    );
  }

  const mm = myDate.substr(0, 2);
  const dd = myDate.substr(3, 2);

  //valida mês
  if (parseInt(mm) < 1 || parseInt(mm) > 12) {
    throw new Error(
      "Mês '" +
        mm +
        "' inválido, informar data 'carnaval', 'corpus-christi' ou usar o formato mm-dd."
    );
  }

  //valida dia
  if (parseInt(dd) < 1 || parseInt(dd) > 31) {
    throw new Error(
      "Dia '" +
        dd +
        "' inválido, informar data 'carnaval', 'corpus-christi' ou usar o formato mm-dd."
    );
  }

  //valida mês e dia
  if (
    (parseInt(dd) > 29 && parseInt(mm) === 2) ||
    (parseInt(dd) > 30 &&
      (parseInt(mm) === 4 ||
        parseInt(mm) === 6 ||
        parseInt(mm) === 9 ||
        parseInt(mm) === 11))
  ) {
    throw new Error(
      "Mês e Dia '" +
        myDate +
        "' inválido, informar data 'carnaval', 'corpus-christi' ou usar o formato mm-dd."
    );
  }

  return myDate;
}

//adição de dias a data para cálculo de datas baseadas na páscoa
function addDays(myDate, daysToAdd) {
  //verifica data
  let tmp = checkFullDate(myDate);

  //adiciona dias
  tmp = new Date(myDate + 'T00:00:00');
  let newDate = new Date(tmp);
  newDate.setDate(tmp.getDate() + daysToAdd);

  //converte em nova data em variáveis numéricas
  const d = newDate.getDate();
  const m = newDate.getMonth() + 1;
  const y = newDate.getFullYear();

  //converte variáveis em texto formatado
  const dd = d.toString().padStart(2, '0');
  const mm = m.toString().padStart(2, '0');
  const yyyy = y.toString().padStart(4, '0');

  return yyyy + '-' + mm + '-' + dd;
}

//cálculo do domingo de páscoa
function easter(year) {
  let ano = year;
  ano = parseInt(ano);

  // a = ANO MOD 19
  const a = ano % 19;

  // b = ANO \ 100
  const b = parseInt(ano / 100);

  // c = ANO MOD 100
  const c = ano % 100;

  // d = b \ 4
  const d = parseInt(b / 4);

  // e = b MOD 4
  const e = b % 4;

  // f = (b + 8) \ 25
  const f = parseInt((b + 8) / 25);

  // g = (b - f + 1) \ 3
  const g = parseInt((b - f + 1) / 3);

  // h = (19 × a + b - d - g + 15) MOD 30
  const h = (19 * a + b - d - g + 15) % 30;

  // i = c \ 4
  const i = parseInt(c / 4);

  // k = c MOD 4
  const k = c % 4;

  // L = (32 + 2 × e + 2 × i - h - k) MOD 7
  const l = (32 + 2 * e + 2 * i - h - k) % 7;

  // m = (a + 11 × h + 22 × L) \ 451
  const m = parseInt((a + 11 * h + 22 * l) / 451);

  // MÊS = (h + L - 7 × m + 114) \ 31
  const mes = parseInt((h + l - 7 * m + 114) / 31);

  // DIA = 1+ (h + L - 7 × m + 114)MOD 31
  const dia = 1 + ((h + l - 7 * m + 114) % 31);

  //converte variáveis numéricas em texto formatado
  const yyyy = ano.toString().padStart(4, '0');
  const mm = mes.toString().padStart(2, '0');
  const dd = dia.toString().padStart(2, '0');

  return yyyy + '-' + mm + '-' + dd;
}

//cálculo do dia da sexta-feira santa
function goodFriday(year) {
  return addDays(easter(year), -2);
}

//cálculo do dia da terça-feira de carnaval
function carnival(year) {
  return addDays(easter(year), -47);
}

//cálculo do dia de corpus christi
function corpusChristi(year) {
  return addDays(easter(year), 60);
}

//consulta do cadastro de feriados nacionais
async function getNationalHoliday(myDate) {
  const holidays = JSON.parse(await readFile(global.nacional));
  const holiday = holidays.feriados.find((a) => a.date === myDate);

  if (holiday) {
    return JSON.stringify(
      { name: 'Feriado Nacional de ' + holiday.name },
      null,
      2
    );
  }
  return null;
}

//consulta do cadastro de feriado de carnaval
async function getCarnival(myCod) {
  const holidays = JSON.parse(await readFile(global.carnaval));
  const holiday = holidays.feriados.find((a) => a.ibge === myCod);

  let sphere = 'Estadual';
  if (myCod.length !== 2) {
    sphere = 'Municipal';
  }

  if (holiday) {
    return JSON.stringify(
      { name: 'Feriado ' + sphere + ' de Terça-Feira de Carnaval' },
      null,
      2
    );
  }
  return null;
}

//consulta do cadastro de feriado de corpus christi
async function getCorpusChristi(myCod) {
  const holidays = JSON.parse(await readFile(global.cchristi));
  const holiday = holidays.feriados.find((a) => a.ibge === myCod);

  let sphere = 'Estadual';
  if (myCod.length !== 2) {
    sphere = 'Municipal';
  }

  if (holiday) {
    return JSON.stringify(
      { name: 'Feriado ' + sphere + ' de Corpus Christi' },
      null,
      2
    );
  }
  return null;
}

//consulta do cadastro de feriados estaduais
async function getStateHolidays(myCod, myDate) {
  const holidays = JSON.parse(await readFile(global.estadual));
  const holiday = holidays.feriados.find(
    (a) => a.ibge === myCod && a.date === myDate
  );

  if (holiday) {
    return JSON.stringify(
      { name: 'Feriado Estadual de ' + holiday.name },
      null,
      2
    );
  }
  return null;
}

//consulta do cadastro de feriados municipais
async function getCityHolidays(myCod, myDate) {
  const holidays = JSON.parse(await readFile(global.municipal));
  const holiday = holidays.feriados.find(
    (a) => a.ibge === myCod && a.date === myDate
  );

  if (holiday) {
    return JSON.stringify(
      { name: 'Feriado Municipal de ' + holiday.name },
      null,
      2
    );
  }
  return null;
}

//rota consulta
router.get('/:cod/:fullDate', async (req, res, next) => {
  try {
    const myCod = req.params.cod;
    const myDate = req.params.fullDate;

    //verifica parametros
    await checkCod(myCod);
    await checkFullDate(myDate);

    //constantes da consulta
    const uf = myCod.substr(0, 2);
    const yyyy = myDate.substr(0, 4);
    const mmdd = myDate.substr(5, 5);

    //consulta feriados nacionais
    let holiday = await getNationalHoliday(mmdd);
    if (holiday) {
      res.send(holiday);
      logger.info(
        `${req.method} ${req.baseUrl} - 200({"${myCod}","${myDate}","${
          JSON.parse(holiday).name
        }"})`
      );
      return;
    }

    //consulta feriados nacionais de pascoa
    if (myDate === easter(yyyy) || myDate === goodFriday(yyyy)) {
      holiday = { name: 'Feriado Nacional de Domingo de Páscoa' };
      if (myDate !== easter(yyyy)) {
        holiday = { name: 'Feriado Nacional de Sexta-Feira Santa' };
      }

      //retorna consulta
      res.send(JSON.stringify(holiday, null, 2));
      logger.info(
        `${req.method} ${req.baseUrl} - 200({"${myCod}","${myDate}","${holiday.name}"})`
      );
      return;
    }

    //consulta feriados variáveis de pascoa
    if (myDate === carnival(yyyy) || myDate === corpusChristi(yyyy)) {
      //consulta estaduais
      if (myDate === carnival(yyyy)) {
        holiday = await getCarnival(uf);
      } else {
        holiday = await getCorpusChristi(uf);
      }

      //retorna consulta
      if (holiday) {
        res.send(holiday);
        logger.info(
          `${req.method} ${req.baseUrl} - 200({"${myCod}","${myDate}","${
            JSON.parse(holiday).name
          }"})`
        );
        return;
      }

      //consulta municipais
      if (myCod.length !== 2) {
        if (myDate === carnival(yyyy)) {
          holiday = await getCarnival(myCod);
        } else {
          holiday = await getCorpusChristi(myCod);
        }

        //retorna consulta
        if (holiday) {
          res.send(holiday);
          logger.info(
            `${req.method} ${req.baseUrl} - 200({"${myCod}","${myDate}","${
              JSON.parse(holiday).name
            }"})`
          );
          return;
        }
      }
    }

    //consulta feriados estaduais
    holiday = await getStateHolidays(uf, mmdd);
    if (holiday) {
      res.send(holiday);
      logger.info(
        `${req.method} ${req.baseUrl} - 200({"${myCod}","${myDate}","${
          JSON.parse(holiday).name
        }"})`
      );
      return;
    }

    //consulta feriados municipais
    if (myCod.length !== 2) {
      const holiday = await getCityHolidays(myCod, mmdd);
      if (holiday) {
        res.send(holiday);
        logger.info(
          `${req.method} ${req.baseUrl} - 200({"${myCod}","${myDate}","${
            JSON.parse(holiday).name
          }"})`
        );
        return;
      }
    }

    //consulta sem retorno
    holiday = {
      error:
        "Não há feriado cadastrado na data '" +
        myDate +
        "' para o código do IBGE '" +
        myCod +
        "'",
    };
    res.status(404).send(JSON.stringify(holiday, null, 2));
    logger.info(
      `${req.method} ${req.baseUrl} - 404({"${myCod}","${myDate}","${holiday.error}"})`
    );
  } catch (err) {
    next(err);
  }
});

//rota cadastro
router.put('/:cod/:date', async (req, res, next) => {
  try {
    const myCod = req.params.cod;
    const myDate = req.params.date;

    //verifica parametros
    await checkCod(myCod);
    await checkMonthDay(myDate);

    let fileName = null;
    let holidays = null;
    let holiday = null;

    //cadastro de carnaval e corpus christi
    if (myDate === 'carnaval' || myDate === 'corpus-christi') {
      if (myDate === 'carnaval') {
        fileName = global.carnaval;
      } else {
        fileName = global.cchristi;
      }

      //verifica cadastro
      holidays = JSON.parse(await readFile(fileName));
      holiday = holidays.feriados.find((a) => a.igbe === myCod);

      //insere cadastro se inexistente
      if (!holiday) {
        holiday = {
          id: holidays.nextId++,
          ibge: myCod,
        };
        holidays.feriados.push(holiday);

        await writeFile(fileName, JSON.stringify(holidays));
        res.status(201).send(holiday);
        logger.info(
          `${req.method} ${req.baseUrl} - 201({"${myCod}","${myDate}"})`
        );
        return;
      }

      //retorna cadastro existente
      res.send(holiday);
      logger.info(
        `${req.method} ${req.baseUrl} - 200({"${myCod}","${myDate}"})`
      );
      return;
    }

    //verifica nome
    const myName = req.body.name.trim();
    if (!myName) {
      throw new Error(
        "É obrigatório 'name' quando a data é diferente de 'carnaval' ou 'corpus-cristi'."
      );
    }

    //verifica cadastro
    if (myCod.length === 2) {
      fileName = global.estadual;
    } else {
      fileName = global.municipal;
    }

    holidays = JSON.parse(await readFile(fileName));
    const index = holidays.feriados.findIndex(
      (a) => a.ibge === myCod && a.date === myDate
    );

    //insere cadastro inexistente
    if (index === -1) {
      holiday = {
        id: holidays.nextId++,
        ibge: myCod,
        date: myDate,
        name: myName,
      };
      holidays.feriados.push(holiday);

      await writeFile(fileName, JSON.stringify(holidays));
      res.status(201).send(holiday);
      logger.info(
        `${req.method} ${req.baseUrl} - 201({"${myCod}","${myDate}","${myName}"})`
      );
      return;
    }

    //atualiza cadastro existente
    holidays.feriados[index].name = myName;
    holiday = holidays.feriados[index];
    await writeFile(fileName, JSON.stringify(holidays));
    res.send(holiday);
    logger.info(
      `${req.method} ${req.baseUrl} - 200({"${myCod}","${myDate}","${myName}"})`
    );
  } catch (err) {
    next(err);
  }
});

//rota exclusão
router.delete('/:cod/:date', async (req, res, next) => {
  try {
    const myCod = req.params.cod;
    const myDate = req.params.date;

    //verifica parametros
    await checkCod(myCod);
    await checkMonthDay(myDate);

    //valida cadastro nacional
    let holiday = await getNationalHoliday(myDate);
    if (holiday) {
      res.status(403).send(holiday);
      logger.info(
        `${req.method} ${req.baseUrl} - 403({"${myCod}","${myDate}","${
          JSON.parse(holiday).name
        }"})`
      );
      return;
    }

    //valida cadastro estadual se enviado codigo municipal
    if (myCod.length !== 2) {
      const myUF = myCod.substr(0, 2);
      if (myDate === 'carnaval') {
        holiday = await getCarnival(myUF);
      } else if (myDate === 'corpus-christi') {
        holiday = await getCorpusChristi(myUF);
      } else {
        holiday = await getStateHolidays(myUF, myDate);
      }

      //cadastro estadual localizado para o município
      if (holiday) {
        res.status(403).end();
        logger.info(
          `${req.method} ${req.baseUrl} - 403({"${myCod}","${myDate}","${
            JSON.parse(holiday).name
          }"})`
        );
        return;
      }
    }

    let fileName = null;
    let holidays = null;

    //valida cadastro
    if (myDate === 'carnaval' || myDate === 'corpus-christi') {
      if (myDate === 'carnaval') {
        fileName = global.carnaval;
      } else {
        fileName = global.cchristi;
      }
      holidays = JSON.parse(await readFile(fileName));
      holiday = await holidays.feriados.find((a) => a.ibge === myCod);
    } else {
      if (myCod.length === 2) {
        fileName = global.estadual;
      } else {
        fileName = global.municipal;
      }
      holidays = JSON.parse(await readFile(fileName));
      holiday = await holidays.feriados.find(
        (a) => a.ibge === myCod && a.date === myDate
      );
    }

    //exclui cadastro existente
    if (holiday) {
      holidays.feriados = await holidays.feriados.filter(
        (a) => a.id !== holiday.id
      );
      await writeFile(fileName, JSON.stringify(holidays));

      res.status(204).end();
      logger.info(
        `${req.method} ${req.baseUrl} - 204({"${myCod}","${myDate}",${holiday.id}})`
      );
      return;
    }

    //cadastro não encontrado
    holiday = {
      error:
        "Não há feriado cadastrado na data '" +
        myDate +
        "' para o código do IBGE '" +
        myCod +
        "'",
    };
    res.status(404).send(JSON.stringify(holiday, null, 2));
    logger.info(`${req.method} ${req.baseUrl} - 404({"${holiday.error}"})`);
  } catch (err) {
    next(err);
  }
});

//rota de erro genérico
router.use((err, req, res, _) => {
  logger.error(
    `${req.method} ${req.baseUrl} - 400: {"error": "${err.message}"}`
  );
  res.status(400).send({ error: err.message });
});

export default router;
