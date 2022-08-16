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
// viet lai
const nav = document.getElementById('nav-choose')
const clickmenu = document.getElementById('button-menu')
const contentshow = document.getElementById('main-content')
clickmenu.onclick = function(){
    nav.classList.toggle("menu-hide")
    contentshow.classList.toggle("content-show")
    if (!nav.classList.contains('menu-hide')){
        tabledtgrid.style.width = (tabledtgrid.clientWidth - 250) + 'px'
    }
    else{
        tabledtgrid.style.width = (tabledtgrid.clientWidth + 250) + 'px'
    }
}
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
const input1 = document.getElementById('step-3-content-day')
const input2 = document.getElementById('step-3-content-start')
const input3 = document.getElementById('step-3-content-end')
input1.onchange = ()=>{
    let labelElement = document.querySelector('label[for="step-3-content-day"]');
    labelElement.innerHTML = 'Thứ: <br>'+ input1.value
}
input2.onchange = ()=>{
    let labelElement = document.querySelector('label[for="step-3-content-start"]');
    labelElement.innerHTML = 'Tiết bắt đầu: <br>'+ input2.value
}
input3.onchange = ()=>{
    let labelElement = document.querySelector('label[for="step-3-content-end"]');
    labelElement.innerHTML = 'Tiết kết thúc: <br>'+ input3.value
}
btnextstep3.onclick = function(){
    contentstep3.classList.add('step-3-hide')
    contentstep4.classList.add('step-4-show')
    if (input1.value)
    {dayclass = input1.value}

    if (input2.value)
    {lessonstart = input2.value}

    if (input3.value)
    {lessonend = input3.value}
    
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
        for (let i = 2; i < 8; i++) {
            const string = 'cotthu' + i
            let elem = document.getElementById(string)
            elem.innerHTML += '<div class="timecls'+index+'"></div>'
        }
        // add thứ ngày
        var timelearn = keytotime(filejsonclass,element,keyclass)
        timelearn.forEach(currentItem => {
            var daystring = '#cotthu' + currentItem[dayclass]+' .timecls'+index
            const ngay= document.querySelector(daystring)
            if (ngay.innerHTML == '')
            {
                ngay.innerHTML +=currentItem[lessonstart]+'-'+currentItem[lessonend]
            }
            else
            {
                ngay.innerHTML += ' '+currentItem[lessonstart]+'-'+currentItem[lessonend]
            }
        });
    }

    classkeyct.ondragover = function(event){
        event.preventDefault();
    }
    classkeyct.ondragstart = function(event){
        event.target.style.opacity = '0.5'
        dataTransferid = event.target.id
        for (let id = 2; id < 8; id++) {
            let stringdata = '#cotthu'+id+' .time'+dataTransferid
            timetemp = document.querySelector(stringdata)
            timetemp.style.opacity = '0.5'
        }
    }

    classkeyct.ondrop = function(event) {
        event.preventDefault();
        const temp = document.getElementById(dataTransferid)
        if (temp && event.target.id != dataTransferid) {
            temp.outerHTML = ''
            temp.style.removeProperty('opacity')
            event.target.outerHTML += temp.outerHTML
            for (let id = 2; id < 8; id++) {
                let stringdata = '#cotthu'+id+' .time'+dataTransferid
                timetemp = document.querySelector(stringdata)
                timetemp.outerHTML = ''
                timetemp.style.removeProperty('opacity')
                document.querySelector('#cotthu'+id+' .time'+event.target.id).outerHTML +=timetemp.outerHTML
            }
        }
        else{
            temp.style.removeProperty('opacity')
            console.log('bug drop');
            for (let id = 2; id < 8; id++) {
                let stringdata = '#cotthu'+id+' .time'+dataTransferid
                timetemp = document.querySelector(stringdata)
                timetemp.style.removeProperty('opacity')
            }
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
let filejsonclass,keyclass,dayclass='THUHOC',lessonstart='TIETBD',lessonend='TIETKT'

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
// dùng document.documentElement.offsetWidth để tính sự thay đôi
//dùng containor(có 100%width).clientWidth để không tính cả thanh cuộn vào
//dùng window.innerWidth thì lúc có thanh cuộn listkeyclass sẽ bị đẩy qua khoảng 1 thanh cuộn 
function Resize(e) {
    listkeyclass.style.width =(document.querySelector('.second-container').clientWidth - e.clientX +5 + nav.clientWidth) + 'px';
    tabledtgrid.style.width = (e.clientX -5 - nav.clientWidth)+ 'px';
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
window.addEventListener('resize',(ev)=>{
    listkeyclass.style.width = (document.querySelector('.second-container').clientWidth - tabledtgrid.clientWidth) + 'px'
})
