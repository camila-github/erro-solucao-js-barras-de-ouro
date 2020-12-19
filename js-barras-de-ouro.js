//SOLUÇAO 1
/*Utilizado função anônima*/
(function calcularDistancia(entradaPrimeiralinha) {

    /*SEPARAÇÃO PRIMEIRA LINHA DE ENTRADA EM UM ARRAY (NUMERO DE CIDADES + CAPACIDADE DE CARGA)*/
    if (!([numCidades, capacidadeDeCarga] = entradaPrimeiralinha.match(/\d+/g))) return false;
    impostoPagar = gets().match(/\d+/g).map(impPagar => parseInt(impPagar));
    impostoPagar.unshift('');

    /*SEPARAÇÃO DAS DEMAIS LINHAS DE ENTRADA EM ARRAY REFERENTE A DISTANCIA (DE + PARA + DISTANCIA)*/
    cidadesVisitados = [];
    trajetosPercorridos = [];
    trajetos = Array.from(new Array(1 * numCidades + 1), numCid => []);
    while (numCidades-- > 1) {
        let [de, para, distancia] = gets().match(/\d+/g);
        trajetos[de].push({ para: para, distancia: distancia });
        trajetos[para].push({ para: de, distancia: distancia });
    }

    /*VERIFICA AS MENORES DISTANCIA*/
    ligacaoEntreCidadeFeudo = 1;
    somatoriaTrajetos = [];
    auxSomatoriaTrajetos = [];
    somatoriaTrajetos = [...somatoriaTrajetos, ligacaoEntreCidadeFeudo];
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
    while (auxSomatoriaTrajetos.length > 0) {
        let x = auxSomatoriaTrajetos.pop();
        for (let index = 0; index < trajetos[trajetosPercorridos[x]].length; index++) {
            const trajeto = trajetos[trajetosPercorridos[x]][index];
            if (trajeto.para === x) { d = trajeto.distancia; break; }
        }
        menorDistancia += Math.ceil(parseFloat(Number(impostoPagar[x])) / Number(capacidadeDeCarga)) * Math.ceil((2 * Number(d)));
        impostoPagar[trajetosPercorridos[x]] += impostoPagar[x];
    }
    console.log(menorDistancia);

})(gets());