const btprestep1 = document.getElementsByClassName('step-1-pre')[0];
const btprestep2 = document.getElementsByClassName('step-2-pre')[0];
const btprestep3 = document.getElementsByClassName('step-3-pre')[0];
const btprestep4 = document.getElementsByClassName('step-4-pre')[0];
const btnextstep1 = document.getElementsByClassName('step-1-next')[0];
const btnextstep2 = document.getElementsByClassName('step-2-next')[0];
const btnextstep3 = document.getElementsByClassName('step-3-next')[0];
const btnextstep4 = document.getElementsByClassName('step-4-next')[0];
const contentstep1 = document.getElementsByClassName('step-1')[0]
const contentstep2 = document.getElementsByClassName('step-2')[0]
const contentstep3 = document.getElementsByClassName('step-3')[0]
const contentstep4 = document.getElementsByClassName('step-4')[0]
//chuyển 1 -> 2
btnextstep1.onclick = function(){
    contentstep1.classList.add('step-1-hide')
    contentstep2.classList.add('step-2-show')
    contentstep1.style.transition= '0.5s linear'
    contentstep2.style.transition= '0.5s linear'
    contentstep3.style.transition= '0.5s linear'
    contentstep4.style.transition= '0.5s linear'
}
btnextstep2.onclick = function(){
    contentstep2.classList.add('step-2-hide')
    contentstep3.classList.add('step-3-show')
}
btnextstep3.onclick = function(){
    contentstep3.classList.add('step-3-hide')
    contentstep4.classList.add('step-4-show')
}
btnextstep4.onclick = function(){
    contentstep4.classList.add('step-4-hide')
}
btprestep2.onclick = function(){
    contentstep1.classList.remove('step-1-hide')
    contentstep2.classList.remove('step-2-show')
}
btprestep3.onclick = function(){
    contentstep2.classList.remove('step-2-hide')
    contentstep3.classList.remove('step-3-show')
}
btprestep4.onclick = function(){
    contentstep3.classList.remove('step-3-hide')
    contentstep4.classList.remove('step-4-show')
}