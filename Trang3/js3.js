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
    addoptiontoselect(document.getElementById('step-3-content-day'))
    addoptiontoselect(document.getElementById('step-3-content-start'))
    addoptiontoselect(document.getElementById('step-3-content-end'))
}
btnextstep3.onclick = function(){
    contentstep3.classList.add('step-3-hide')
    contentstep4.classList.add('step-4-show')

    dayclass = document.getElementById('step-3-content-day').value
    lessonstart = document.getElementById('step-3-content-start').value
    lessonend = document.getElementById('step-3-content-end').value

}
let dataTransferid
btnextstep4.onclick = function(){

    document.getElementsByClassName('first-container')[0].classList.add('first-container-hide')
    document.getElementsByClassName('second-container')[0].classList.remove('second-container-hide')
    const classkeyct = document.getElementsByClassName('list-key-class')[0]
    
    var filterstep1 = filejsonclass.map(ev=> ev[keyclass])
    var filterstep2 = filterstep1.filter((ev,poi)=> filterstep1.indexOf(ev) == poi)
    for (let index = 0; index < filterstep2.length; index++) {
        const element = filterstep2[index];
        let string = '<div draggable="true" id=cls'+index+'>'+ element +'</div>'
        classkeyct.innerHTML += string
        for (let index = 2; index < 8; index++) {
            const string = 'cotthu' + index
            let elem = document.getElementById(string)
            elem.innerHTML += '<div></div>'
        }
        // add thứ ngày
        var timelearn = keytotime(filejsonclass,element,keyclass)
        console.log(timelearn);
        timelearn.forEach(currentItem => {
            additemtolistday(currentItem)
        });
    }

    classkeyct.ondragover = function(event){
        event.preventDefault();
    }
    classkeyct.ondragstart = function(event){
        event.target.style.opacity = '0.5'
        dataTransferid = event.target.id
    }

    classkeyct.ondrop = function(event) {
        event.preventDefault();
        const temp = document.getElementById(dataTransferid)
        if (temp && event.target.id != dataTransferid) {
            temp.outerHTML = ''
            temp.style.opacity = '1'
            event.target.outerHTML += temp.outerHTML
        }
        else{
            temp.style.opacity = '1'
            console.log('bug drop');
        }
    }

    const tabledatamain = document.getElementsByClassName('table-grid-data')[0]
    tabledatamain.ondragover = function(event){
        event.preventDefault();
    }
    tabledatamain.ondrop = function(ev){
        console.log(dataTransferid);
    }

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
    console.time('File')
    const fileclass= ev.target.files[0]
    if (fileclass) {
        var reader = new FileReader();
        reader.readAsText(fileclass)
        reader.onload = function(event) {
            filejsonclass = JSON.parse(event.target.result);
        };
    }
    console.timeEnd('File')
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
var listkeyclass = document.getElementsByClassName('container-list-key')[0]
var tabledtgrid = document.getElementsByClassName('table-grid')[0]
var resizer = document.getElementsByClassName('set-size')[0]
//box function onmousemove
resizer.addEventListener('mousedown', initResize, false);
//Window funtion mousemove & mouseup
function initResize(e) {
    window.addEventListener('mousemove', Resize, false);
    window.addEventListener('mouseup', stopResize, false);
}
//resize the element
function Resize(e) {
    listkeyclass.style.width =(window.innerWidth - e.clientX +5) + 'px';
    tabledtgrid.style.width = (e.clientX -5)+ 'px';
}
//on mouseup remove windows functions mousemove & mouseup
function stopResize(e) {
    window.removeEventListener('mousemove', Resize, false);
    window.removeEventListener('mouseup', stopResize, false);
}

function keytotime(listclass,keysearch,columnkey){
    var result = listclass.filter((ev)=>{
        return ev[columnkey] == keysearch
    })
    return result
}

function additemtolistday(datatime){
    var daystring = 'cotthu' + datatime[dayclass]
    console.log(daystring);
    const ngay= document.getElementById(daystring)
    if (ngay.innerHTML == '')
    {
        ngay.innerHTML += '<div>'+datatime[lessonstart]+'-'+datatime[lessonend]+'</div>'
    }
    else
    {
        ngay.innerHTML += ' '+datatime[lessonstart]+'-'+datatime[lessonend]
    }
}