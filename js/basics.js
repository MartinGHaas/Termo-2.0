const $body = document.querySelector('body');

const $words = document.querySelectorAll('.word');

const $games= document.querySelectorAll('.game');

var palavra = 'vasco';
var palavraArr = palavra.split('')

//comportamento padrão
$words.forEach(function(i){
    i.classList.add('transition');
    i.classList.add('capitalize');
})
$words[0].focus();
var lastTime = false;

//add letras
var validos = /[a-zA-Z]/;
var palavraTerminada = [null, null, null, null, null];

$words.forEach(function(i, index){
    i.addEventListener('input', function(){
        if(!i.value.match(validos)){
            i.value = null;
        }

        if($words[29] == document.activeElement){
            lastTime = true;
        }

        if(i.value.length == 1 && !lastTime){
            $words[index + 1].focus();
        };
        palavraTerminada[index] = i.value;

    })
    i.addEventListener('keydown', function(event) {
        let key = event.key;        
        if (key == "Backspace") {
            if(i.value.length !=1){
                $words[index - 1].focus();
            }
        }        
    })
})

var acertou = false;

function resetToAnother(pattern){
    $words.forEach(function(s){
        if(!s.disabled){
            s.disabled = true;
        }
    })
    if(!lastTime){
        for(var i = 0; i<5; i++){
            $words[pattern+i].disabled = false;
        }
    }
      
    $words[pattern].focus();
}

function palavraCompleta(param){
    if(param == null){
        return false;
    }else{
        return true;
    }
}

function resetWord(pattern){
    for(let i = 0; i<5+pattern; i++){
        palavraTerminada[i] = null;
    }
}

var novo = new RegExp('[' + palavra + ']');

function checaInput(i){
    var repeticoes = 0;
    var acertos = 0;

    while(repeticoes<5 && !acertou){
        let tempWord = palavraTerminada[i].toLowerCase();

        if(palavraArr[repeticoes] == tempWord){
            $words[i].classList.add('correct');
            acertos++;
        }else if(novo.test(tempWord)){
            $words[i].classList.add('parcial')
        }else{
            $words[i].classList.add('incorrect');
        }
        if(acertos == 5){
            acertou = true;
        }

        i++;
        repeticoes++;
        resetToAnother(i);
    }
    resetWord(i);
}    

function disableGame(){
    if(acertou){
        $words.forEach(function(i){
            i.disabled = true;
        })
    }
}

var patternSum = 0;
var completa = false;

$body.addEventListener('keydown', function(event){
    let key = event.key;
    
    if(key == 'Enter'){
        palavraTerminada.forEach(function(words){
            completa =  palavraCompleta(words);
        })

        if(completa){
            checaInput(patternSum);
            disableGame();
            patternSum+=5;
        }

        completa = false;
    }
})

//O código ainda está ainda mais mal estruturado, com possíveis repetições e em seu estado mediano. Releve diversos problemas, pois todos serão corrigidos!
