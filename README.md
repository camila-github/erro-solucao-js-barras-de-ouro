## Treinamento Digital Innovation One - Exercicio - Barras de Ouro

O exercicio publicado é referente ao treinamento do BOOTCAMP - Desenvolvedor NodeJS -  Solução de problemas com JavaScript.
(https://digitalinnovation.one)

#### Descrição do Desafio:

O feudo da Mesopotâmia é rico e o povo é cordial e alegre. Mas quando o assunto são impostos, é praticamente um roubo. Todo final de ano, cada feudo do país deve pagar uma determinada quantidade de quilos de ouro em impostos. Quando é chegado o momento de coletar os impostos, o Rei envia sua carruagem real para recolher o ouro devido, usando as estradas do reino.

Cada estrada liga dois feudos diferentes e podem ser percorridos em duas direções. Com as estradas é possível ir de um feudo a outro, possivelmente passando por feudos intermediários. Mas há apenas um caminho entre dois feudos diferentes.

Em cada feudo há um cofre real, utilizado para armazenamento do ouro de impostos. Os cofres reais são imensos, de forma que cada cofre tem capacidade de armazenar todo o ouro devido por todo o reino. A carruagem sai do feudo principal, percorrendo as estradas do reino, visitando os feudos para recolher o ouro devido, podendo usar qualquer cofre real para armazenar temporariamente uma parte do imposto recolhido, se necessário. Ao final da coleta, todo o ouro devido por todas os feudos devem estar armazenados no cofre real do feudo principal.

José como é o Rei, contratou o seu time para, dados a quantidade de ouro a ser recolhido em cada feudo (em kg), a lista das estradas do reino, com os respectivos comprimentos (em km) e a capacidade de carga da carruagem real (em kg), determine qual é a mínima distância que a carruagem deve percorrer para recolher todo o ouro devido.


#### Entrada:

A primeira linha contém dois inteiros N e C indicando respectivamente o número de cidades e a capacidade de carga da carruagem (2 ≤ N ≤ 104 e 1 ≤ C ≤ 100). O feudo principal é identificado pelo número 1 e os outros feudos são identificadas por inteiros de 2 a N . A segunda linha contém N inteiros Ei representando a quantidade de imposto devido por cada feudo i (0 ≤ Ei ≤ 100 para 1 ≤ i ≤ N ). Cada uma das N-1 linhas seguintes contém três inteiros A , B e C , indicando que uma estrada liga o feudo A e o feudo B (1 ≤ A, B ≤ N ) e tem comprimento C (1 ≤ C ≤ 100).

#### Saída:

Seu programa deve produzir uma única linha com um inteiro representando a menor distância que a carruagem real deve percorrer para recolher todo o imposto devido, em km.

Exemplos de Entrada  | Exemplos de Saída
------------- | -------------
6 10 | 44
0 10 10 10 10 10 | 
1 4 7 | 
5 1 2 | 
3 5 3 | 
2 5 2 | 
6 5 2 | 


Exemplos de Entrada  | Exemplos de Saída
------------- | -------------
3 10 | 58
10 10 12 |
1 2 5 |
2 3 7 |

Exemplos de Entrada  | Exemplos de Saída
------------- | -------------
5 9 | 10
5 2 6 3 6 |
1 2 1 |
2 3 1 |
2 4 1 |
2 5 1 |


```javascript
//SOLUCAO 1
/*Utilizado funçao anônima*/
(function calcularDistancia(entradaPrimeiralinha) {

    /*SEPARAÇAO PRIMEIRA LINHA DE ENTRADA EM UM ARRAY (NUMERO DE CIDADES + CAPACIDADE DE CARGA)*/
    /* if() - Verifica se a entrada da primeira linha é um valor valido*/
    /*.match(/\d+/g) -  separa cada string para armazenar em um array de atribuição via 
    desestruturação (destructuring assignment), o 'numero de Cidades' e 'Capacidade de Carga'*/
    if (!([numCidades, capacidadeDeCarga] = entradaPrimeiralinha.match(/\d+/g))) return false;

    /*.match(/\d+/g) -  separa cada string para armazenar em um array*/
    /*.map(v => parseInt(v)) - cada string separado é convertido em numero, 
    depois é armazenado em um array*/
    impostoPagar = gets().match(/\d+/g).map(impPagar => parseInt(impPagar));

    /*é adicionado um espaço no inicio do array*/
    impostoPagar.unshift('');

    /*SEPARAÇAO DAS DEMAIS LINHAS DE ENTRADA EM ARRAY REFERENTE A DISTANCIA (DE + PARA + DISTANCIA)*/
    cidadesVisitados = [];
    trajetosPercorridos = [];
    trajetos = Array.from(new Array(1 * numCidades + 1), numCid => []);
    /*Armazena os valores referente a distancia (de + para + distancia), em um array de objetos*/
    while (numCidades-- > 1) {
        /*.match(/\d+/g) -  separa cada string para armazenar em um array de objeto,
        de atribuição via desestruturação (destructuring assignment) */
        let [de, para, distancia] = gets().match(/\d+/g);
        trajetos[de].push({ para: para, distancia: distancia });
        trajetos[para].push({ para: de, distancia: distancia });
    }

    /*VERIFICA AS MENORES DISTANCIA*/
    ligacaoEntreCidadeFeudo = 1;
    somatoriaTrajetos = [];
    auxSomatoriaTrajetos = [];
    somatoriaTrajetos = [...somatoriaTrajetos, ligacaoEntreCidadeFeudo];
    /*Verifica os menores trajetos*/
    while (somatoriaTrajetos.length > 0) {
        if ((t = somatoriaTrajetos.pop()) !== 1) auxSomatoriaTrajetos = [...auxSomatoriaTrajetos, t];
        for (const trajeto of trajetos[t]) {
            if (cidadesVisitados[trajeto.para]) continue;
            cidadesVisitados[t] = true;
            trajetosPercorridos[trajeto.para] = t;
            somatoriaTrajetos = [...somatoriaTrajetos, trajeto.para];
        }
    }

    /*CALCULO DA DISTACIA PERCORRIDA*/
    menorDistancia = 0;
    /*Loop para calcular a distancia do trajeto*/
    while (auxSomatoriaTrajetos.length > 0) {
        let x = auxSomatoriaTrajetos.pop();
        for (let index = 0; index < trajetos[trajetosPercorridos[x]].length; index++) {
            const trajeto = trajetos[trajetosPercorridos[x]][index];
            if (trajeto.para === x) { d = trajeto.distancia; break; }
        }
        /*Calcula a distancia*/
        menorDistancia += Math.ceil(parseFloat(Number(impostoPagar[x])) / Number(capacidadeDeCarga)) * Math.ceil((2 * Number(d)));
        impostoPagar[trajetosPercorridos[x]] += impostoPagar[x];
    }
    console.log(menorDistancia);

})(gets());
```
