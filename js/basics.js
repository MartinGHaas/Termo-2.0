const $body = document.querySelector('body');

const $words = document.querySelectorAll('.word');

const $games= document.querySelectorAll('.game');

var palavra = 'teste';
var palavraArr = palavra.split('')

//comportamento padrão
$words.forEach(function(i){
    i.classList.add('transition');
    i.classList.add('capitalize');
})

//add letras
var validos = /[a-zA-Z]/;
var palavraTerminada = [null, null, null, null, null]

$words[0].focus();
$words.forEach(function(i, index){
    i.addEventListener('input', function(){
        if(!i.value.match(validos)){
            i.value = null;
        }
        if(i.value.length == 1){
            $words[index + 1].focus();
        };        
        palavraTerminada[index] = i.value;
    })

    i.addEventListener('keydown', function(event) {
        let key = event.key;        
        if (key == "Backspace" || key == "Delete") {
            if(i.value.length !=1){
                $words[index - 1].focus();
            }
        }
    })
})

var acertou = false;

function checaInput(i){
    var novo = /[t|e|s]/
    var repeticoes = 0;

    while(repeticoes<5 && !acertou){
        if(palavraArr[i] == palavraTerminada[i].toLowerCase()){
            $words[i].classList.add('correct');
        }else if(novo.test(palavraTerminada[i])){
            $words[i].classList.add('parcial')
        }else{
            $words[i].classList.add('incorrect');
        }
        i++;
        repeticoes++;
    }
    
}
function disableGame(){
    var juntaPalavra = palavraTerminada.join('');
    if(juntaPalavra == palavra){
        acertou = true;
    }

    if(acertou){
        $words.forEach(function(i){
            i.disabled = true;
        })
    }
}
function resetToAnother(pattern){
    for(var i = 0; i<5; i++){
        $words[pattern+i].disabled = true;
        $words[pattern+i+5].disabled = false;
        $words[pattern+i+1].focus();
    }
}

var testeabc = 0;
$body.addEventListener('keydown', function(event){
    let key = event.key;
    
    if(key == 'Enter'){
        checaInput(testeabc);
        resetToAnother(testeabc);
        testeabc+=5;
        disableGame();
    }
})

//checa Input Terminado

//add desativados
const disabled = document.querySelectorAll('.disabled');

disabled.forEach(function(input){
    input.disabled = true;
})

//O código ainda está ainda mais mal estruturado, com possíveis repetições e em seu estado  ainda inicial. Releve diversos problemas, pois todos serão corrigidos!
//Está com muitos mais bugs, mas pensando pelo lado positivo, tem mais funcionalidades. Mas ainda ta em seu estado inicial, então tem muita coisa a ser melhorada ainda.