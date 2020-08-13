## Feriados Brasileiros

No Brasil existem feriados nacionais, estaduais e municipais. Além disso
alguns feriados não possuem uma data fixa, ou seja, cada ano esses feriados
caem em dias diferentes. Os _Feriados Móveis_ são: Carnaval, Sexta-Feira Santa, Páscoa e Corpus Christi. Três desses feriados são determinados a partir da data da Páscoa.

A sexta-feira santa é um feriado nacional, mas as regras do Carnaval e Corpus
Christi variam de acordo com o estado ou município.

Regras dos feriados móveis:

A terça-feira de carnaval ocorre 47 dias antes do domingo de Páscoa
corpus christi ocorre 60 dias após o domingo de Páscoa
A sexta-feira santa ocorre 2 dias antes do domingo de Páscoa

A Páscoa é celebrada no primeiro domingo após a primeira lua cheia que ocorre
depois do equinócio de Outono (março). A data em que esse dia cai em um
determinado ano pode ser calculada com o [Algoritmo de Meeus](https://pt.wikipedia.org/wiki/C%C3%A1lculo_da_P%C3%A1scoa#Algoritmo_de_Meeus/Jones/Butcher).

O pseudo-código do algoritmo é o seguinte:

```
 a = ANO MOD 19
 b = ANO \ 100
 c = ANO MOD 100
 d = b \ 4
 e = b MOD 4
 f = (b + 8) \ 25
 g = (b - f + 1) \ 3
 h = (19 × a + b - d - g + 15) MOD 30
 i = c \ 4
 k = c MOD 4
 L = (32 + 2 × e + 2 × i - h - k) MOD 7
 m = (a + 11 × h + 22 × L) \ 451
 MÊS = (h + L - 7 × m + 114) \ 31
 DIA = 1+ (h + L - 7 × m + 114) MOD 31

```

Em que `\` é uma divisão de inteiro, ou seja, `7 \ 3 = 2`.

Os feriados nacionais com data fixa são:

- 01/01 Ano Novo
- 21/04 Tiradentes
- 01/05 Dia do Trabalhador
- 07/09 Independência
- 12/10 Nossa Senhora Aparecida
- 02/11 Finados
- 15/11 Proclamação da República
- 25/12 Natal

O dia da Consciência Negra também é outra exceção peculiar. É um "dia comemorativo" nacional, mas não é considerado um feriado nacional; esse dia é
decretado feriado municipal em milhares de cidades e é feriado estadual em
alguns estados.

## Solução

Para resolver esse problema foi desenvolvida uma API que permite consultar, cadastrar e excluir feriados estaduais e municipais.

A API já está populada com os feriados nacionais. Todos os feriados estaduais e municipais são criados através da API.

O endpoint "feriados" responde aos seguintes verbos: GET, PUT e DELETE.

## GET - Consulta

O endpoint para consultar feriados tem o seguinte formato:

```
/feriados/CODIGO-IBGE/ANO-MES-DIA/

```

Onde CODIGO-IBGE é um número de dois dígitos, para representar um feriado estadual ou um número com 7 dígitos para representar um feriado municipal.

O MES deve ser um mês válido, ou seja, entre 1 e 12. Mesmo cuidado deve ser
tomado com o dia. Espere uma ano com 4 números, mês com 2 números e dia também
com 2 números, ou seja, "AAAA-MM-DD".

O comportamento esperado do GET é que retorne status 200 e o nome do
feriado se existir um feriado no dia especificado.

Exemplo de busca o dia 20 de Novembro no estado do Rio de Janeiro:

```
GET /feriados/33/2020-11-20/
{
    "name": "Consciência Negra"
}

```

Se não houver um feriado no dia para o estado ou município consultado a API retorna status 404.

## PUT - Cadastro

O cadastro de um feriado estadual ou municipal segue estrutura semelhante
à consulta, mas não contém o ano, apenas o mês e dia do feriado.

Exemplo de cadastro do aniversário de São Paulo SP no dia 25 de Janeiro:

```
PUT /feriados/3550308/01-25/
{
    "name": "Aniversário da cidade de São Paulo"
}

```

A API retorna o status 201 se esse feriado ainda não estava cadastrado na base. Se já existe um feriado cadastrado neste dia para o estado ou município especificado, o nome do feriado é atualizado e é retornado status 200 para indicar que a requisição foi bem sucedida.

## DELETE - Exclusão

A API também tem a opção de apagar um feriado.

Exemplo de remoção do aniversário de São Paulo:

```
DELETE /feriados/3550308/01-25/

```

O endpoint retorna status 404 se esse feriado não existir ou 204 se a requisição foi aceita e o feriado removido com sucesso.

Uma tentativa de remover um feriado estadual num município retornar o status 403. Uma tentativa de remover um feriado nacional em um município ou em uma unidade federativa também retorna 403.

## Feriados estaduais ou municipais móveis

O cadastro e remoção de feriados móveis tem uma assinatura diferente. No
lugar do dia, é passado o nome do feriado após o código do ibge.

Exemplos:

```
PUT /feriados/5108402/carnaval/
PUT /feriados/4312658/corpus-christi/

```

As requisições acima marcam que a terça-feira de carnaval é feriado em Várzea
Grande e corpus christi é feriado em Não-Me-Toque.

No exemplo abaixo a terça-feira de carnaval deixa de ser considerado feriado
em Várzea Grande:

```
DELETE /feriados/5108402/carnaval/

```

## Dados disponíveis

Para facilitar a utilização da API, foram disponibilizados os seguintes endpoints para consulta do código do IBGE das unidades federativas e dos municípios brasileiros, de acordo com dados de 2019:

O primeiro endpoint retorna a sigla da UF, o código do IGBE e o nome das unidades federativas do Brasil. O endpoint para consultar estes dados tem o seguinte formato:

```
/estados

```

O segundo endpoint retorna o código do IGBE e o nome dos municípios de uma unidade federativa do Brasil. O endpoint para consultar estes dados tem o seguinte formato:

```
/estados/UF

```

Onde UF é a sigla da unidade federativa válida cujos municípios se pretende buscar.

No exemplo abaixo são retornados os dados dos municípios da unidade federativa DF:

```
GET /estados/DF
{
  "ibge": "5300108",
  "name": "Brasília"
}

```

Em qualquer requisição, é retornado o status 400 em caso de não validação dos parâmetros informados, tais como erro no preenchimento do código do IBGE, da data, da sigla da UF ou a falta de nome que é obrigatório para o cadastro de feriado estadual ou municipal em data diferente de 'carnaval' ou 'corpus-christi'.

Adicionalmente, na página inicial da API foi disponibilizado link de acesso a pasta '/docs' que contém sua documentação, onde há mais instruções para sua utilização e é possível consultar unidades federativas, municípios e feriados além de realizar o cadastro e exclusão de feriados estaduais ou municipais.

Faça bom proveito da API, ela está publicada para uso no Heroku em 'https://feriados-brasileiros.herokuapp.com/' e em breve será disponibilizada nova versão. Favor entre em contato caso identifique problemas.
