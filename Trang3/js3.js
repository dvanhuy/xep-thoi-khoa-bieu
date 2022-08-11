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
    addoptiontoselect(document.getElementById('step-2-content-select'))
}
btnextstep2.onclick = function(){
    contentstep2.classList.add('step-2-hide')
    contentstep3.classList.add('step-3-show')
    keyclass = document.getElementById('step-2-content-select').value
    console.log(keyclass);
    addoptiontoselect(document.getElementById('step-3-content-day'))
    addoptiontoselect(document.getElementById('step-3-content-start'))
    addoptiontoselect(document.getElementById('step-3-content-end'))
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
let filejsonclass,keyclass,dayclass,lessonstart,lessonend

const fileupload = document.getElementById('file-json')

fileupload.addEventListener('change',ev=>{
    const fileclass= ev.target.files[0]
    if (fileclass) {
        var reader = new FileReader();
        reader.readAsText(fileclass)
        reader.onload = function(event) {
            filejsonclass = JSON.parse(event.target.result);
        };
    }
    setTimeout(() => {
        console.log(filejsonclass);
    }, 10);
})

function addoptiontoselect(elementselect){
    let keyoption ='' 
    if (filejsonclass) {
        Object.keys(filejsonclass[0]).forEach(element => {
            keyoption += '<option value="'+element+'">'+element+'</option>'
        });
    }
    elementselect.innerHTML += keyoption
}