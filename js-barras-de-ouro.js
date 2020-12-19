//SOLUÇAO 1
/*Utilizado função anônima*/
(function calcularDistancia(entradaPrimeiralinha) {

    /*SEPARAÇÃO PRIMEIRA LINHA DE ENTRADA EM UM ARRAY (NUMERO DE CIDADES + CAPACIDADE DE CARGA)*/
    /* if() - Verifica se a entrada da primeira linha é um valor valido*/
    /*.match(/\d+/g) -  separa cada string para armazenar em um array de atribuição via 
    desestruturação (destructuring assignment), o 'numero de Cidades' e 'Capacidade de Carga'*/
    if (!([numCidades, capacidadeDeCarga] = entradaPrimeiralinha.match(/\d+/g))) return false;

    /*.match(/\d+/g) -  separa cada string para armazenar em um array*/
    /*.map(v => parseInt(v)) - cada string separado é convertido em numero, 
    depois é armazenado em um array array */
    impostoPagar = gets().match(/\d+/g).map(impPagar => parseInt(impPagar));

    /*é adicionado um espaço no inicio do array*/
    impostoPagar.unshift('');

    /*SEPARAÇÃO DAS DEMAIS LINHAS DE ENTRADA EM ARRAY REFERENTE A DISTANCIA (DE + PARA + DISTANCIA)*/
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