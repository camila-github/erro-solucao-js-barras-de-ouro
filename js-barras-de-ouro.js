//SOLUCAO 1
/*DECLARACAO DAS VARIAVEIS E CONSTANTES*/
let numCidades;
let capacidadeDeCarga;
let impostoPagar;
let trajetos;
let somatoriaTrajetos = [];
let auxSomatoriaTrajetos = [];
let ligacaoEntreCidadeFeudo = 1;
let cidadesVisitados = []; 
let trajetosPercorridos = [];
let menorDistancia = 0;
const regexSepararStrings = /\d+/g ;

/*IMPRIME RESULTADO*/
const saidaDados = () => console.log(menorDistancia);

/*ENTRADA DADOS - (NUMERO DE CIDADES + CAPACIDADE DE CARGA)*/
const getNumCidadesCapacidadeCarga = (getsLocal) => {
  if (!getsLocal) return false;
  [numCidades, capacidadeDeCarga] = getsLocal.match(regexSepararStrings);
}

/*ENTRADA DADOS - IMPOSTO A PAGAR*/
const getImpostoPagar = () => {
  impostoPagar = gets().match(regexSepararStrings).map(impPagar => parseInt(impPagar)); 
  impostoPagar.unshift('');
}  

/*ENTRADA DADOS - REFERENTE A DISTANCIA (DE + PARA + DISTANCIA)*/
const getDistanciaDasCidades= () => {
  trajetos = Array.from(new Array(1 * numCidades + 1), numCid => []);
  while (numCidades-- > 1) {
    let [de, para, distancia] = gets().match(regexSepararStrings);
    trajetos[de].push({ para: para, distancia: distancia});
    trajetos[para].push({ para: de, distancia: distancia});
  }
}

/*VERIFICA A MENOR DISTANCIA*/
const verificarMenorDistancia = () => {
  somatoriaTrajetos = [...somatoriaTrajetos, ligacaoEntreCidadeFeudo];
  while (somatoriaTrajetos.length > 0) {
    let t = somatoriaTrajetos.pop();
    if (t !== 1) auxSomatoriaTrajetos = [...auxSomatoriaTrajetos, t];
  
    for (const trajeto of trajetos[t]) {
      if (cidadesVisitados[trajeto.para]) continue;
      cidadesVisitados[t] = true;
      trajetosPercorridos[trajeto.para] = t;
      somatoriaTrajetos = [...somatoriaTrajetos, trajeto.para];
    }
  }
}

/*CALCULO DA DISTACIA PERCORRIDA*/
const calcularDistanciaPercorrida = () => {
  while (auxSomatoriaTrajetos.length > 0) {
    let x = auxSomatoriaTrajetos.pop();
    for (let index = 0; index < trajetos[trajetosPercorridos[x]].length; index++) {
      const trajeto = trajetos[trajetosPercorridos[x]][index];
      if (trajeto.para === x) { 
        d = trajeto.distancia; 
        break; 
      }
    }
    menorDistancia += Math.ceil(parseFloat(Number(impostoPagar[x])) / Number(capacidadeDeCarga)) * Math.ceil((2 * Number(d)));
    impostoPagar[trajetosPercorridos[x]] += impostoPagar[x];
  }
}

(function inicio(getsLocal){
  getNumCidadesCapacidadeCarga(getsLocal);
  getImpostoPagar();
  getDistanciaDasCidades();
  verificarMenorDistancia();
  calcularDistanciaPercorrida()
  saidaDados();
})(gets());



//SOLUÇAO 2
(function calcularDistancia(entradaPrimeiralinha) {

  /*SEPARAÇAO PRIMEIRA LINHA DE ENTRADA EM UM ARRAY (NUMERO DE CIDADES + CAPACIDADE DE CARGA)*/
  if (!([numCidades, capacidadeDeCarga] = entradaPrimeiralinha.match(/\d+/g))) return false;
  impostoPagar = gets().match(/\d+/g).map(impPagar => parseInt(impPagar));
  impostoPagar.unshift('');

  /*SEPARAÇAO DAS DEMAIS LINHAS DE ENTRADA EM ARRAY REFERENTE A DISTANCIA (DE + PARA + DISTANCIA)*/
  cidadesVisitados = [];
  trajetosPercorridos = [];
  trajetos = Array.from(new Array(1 * numCidades + 1), numCid => []);
  while (numCidades-- > 1) {
      let [de, para, distancia] = gets().match(/\d+/g);
      trajetos[de].push({ para: para, distancia: distancia });
      trajetos[para].push({ para: de, distancia: distancia });
  }

  /*VERIFICA OS MENORES TRAJETOS*/
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