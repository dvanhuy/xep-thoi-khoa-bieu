const readjsonfile = document.getElementById('button-read')
const dropFilejson = document.getElementById('get-file')
const deletecurrentfile = document.getElementById('button-delete-files')
const imgfilejson = document.getElementById('file-json-img')
const titlefiles = document.getElementsByClassName('get-file-title')

const secondctn = document.getElementsByClassName('second-container')[0]
const tabledata =  document.getElementsByClassName('table-data')[0]
const btmenu = document.getElementsByClassName('button-menu-hidden')[0]
const menu = document.getElementsByClassName('hidden-menu')[0]

let selectedFile;
let allfilejson;
let widthtemp;

btmenu.onclick = function(){
    menu.classList.toggle('hidden-menu-hide')
    if (menu.classList.contains('hidden-menu'))
    {
        menu.style.width = widthtemp;
        btmenu.style.right = widthtemp;
    }
}
document.getElementsByClassName('pull-bar')[0].addEventListener('mousedown', initResize, false);
function initResize(e) {
    btmenu.style.transition = 'none'
    menu.style.transition = 'none'
    window.addEventListener('mousemove', Resize, false);
    window.addEventListener('mouseup', stopResize, false);
}
function Resize(e) {
  widthtemp = (window.innerWidth - e.clientX + 5) + 'px'
  menu.style.width = widthtemp;
  btmenu.style.right = widthtemp;
}
function stopResize(e) {
    window.removeEventListener('mousemove', Resize, false);
    window.removeEventListener('mouseup', stopResize, false);
    btmenu.style.transition = '0.2s linear'
    menu.style.transition = '0.2s linear'
}

let datasession = sessionStorage.getItem('data')
if (datasession) {
  allfilejson = JSON.parse(datasession)
  loadRun(JSON.parse(datasession))
}

dropFilejson.ondragover = function (evt) {
    evt.preventDefault();
};
dropFilejson.ondragenter = function (evt) {
    evt.preventDefault();
    titlefiles[0].classList.add('get-file-title-hide')
};
dropFilejson.ondrop = function (evt) {
    evt.preventDefault();
    titlefiles[0].classList.add('get-file-title-hide')
    selectedFile = evt.dataTransfer.files[0]
    if (selectedFile) {
        showimgfilejson()
    }
};

document.getElementById("files-source").addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
    if (selectedFile) {
      showimgfilejson()
    }
})
function showimgfilejson() {
    document.getElementsByClassName('file-json-name')[0].innerHTML = selectedFile.name
    imgfilejson.classList.remove('file-json-hide')
    titlefiles[0].classList.add('get-file-title-hide')
}
deletecurrentfile.onclick = function () {
    titlefiles[0].classList.remove('get-file-title-hide')
    imgfilejson.classList.add('file-json-hide')
    selectedFile = undefined
}

readjsonfile.onclick= function(){
    console.time('ReadFile')
    if(selectedFile){
      var reader = new FileReader();
      reader.readAsText(selectedFile)
      reader.onload = function(event) {
        let fileContent = JSON.parse(event.target.result);
        allfilejson = fileContent
      };
      setTimeout(() => {
        sessionStorage.setItem('data',JSON.stringify(allfilejson))
        loadRun(allfilejson)
      }, 100);
    }
    else{
        document.getElementById('files-source').click()
    }
    console.timeEnd('ReadFile')
}

function tbhead(head)
{
  var result = ''
  head.forEach(index => {
    result+= '<th>'+index+'</th>'
  });
  return result
}

function tbbody(body)
{
  var result = ''
  body.forEach(index => {
    result+= '<td>'+index+'</td>'
  });
  return result
}

function jsontotable(filejson){
  if (filejson == null || filejson == undefined || filejson.length == 0) {
    return ''
  } 
  else {
    let tabledata=''
    tabledata +='<table>'
    tabledata +='<thead><tr>'
    tabledata += tbhead(Object.keys(filejson[0]),tabledata)
    tabledata +='</tr></thead>'
    tabledata +='<tbody>'
    filejson.forEach(row => {
      tabledata +='<tr>'
      tabledata += tbbody(Object.values(row),tabledata)
      tabledata +='</tr>'
    });
    tabledata +='</tbody>'
    tabledata +='</table>'
    return tabledata
  }
}

function loadRun(jsonFile) {
  dropFilejson.setAttribute('style','display: none;')
  secondctn.classList.remove('hide')
  tabledata.innerHTML = jsontotable(jsonFile)
  document.getElementsByClassName('main-content')[0].style.alignItems = 'start'

  document.querySelector('.blur-content').onclick = ()=>{
    menu.classList.add('hidden-menu-hide')
  }
  const tableheader = document.querySelector('.table-data thead tr')
  document.getElementById('title-size').onchange =()=>{
    tableheader.style.fontSize = document.getElementById('title-size').value+'px'
  }
  document.getElementById('title-color').onchange =()=>{
    tableheader.style.color = document.getElementById('title-color').value
  }
  document.getElementById('title-bgcolor').onchange =()=>{
    tableheader.style.backgroundColor = document.getElementById('title-bgcolor').value
  }
  document.getElementById('title-height').onchange =()=>{
    tableheader.style.height = document.getElementById('title-height').value+'px'
  }

  let keyoption ='' 
  Object.keys(allfilejson[0]).forEach(element => {
    keyoption += '<option value="'+element+'">'+element+'</option>'
  });

  document.querySelector("select#orderby").innerHTML += keyoption
  document.querySelector("select#orderbysup").innerHTML += keyoption
  document.querySelector("select#copycontent").innerHTML += keyoption

  seteventformaintable(tabledata.querySelector("table"))

}
let sortby
document.querySelector("select#orderby").onchange = ()=>{
  sortby = document.querySelector("select#orderby").value
  
  allfilejson = allfilejson.sort((a,b)=>{
    return a[sortby] > b[sortby] ? 1 : a[sortby] < b[sortby] ? -1 : 0
  })
  sessionStorage.setItem('data',JSON.stringify(allfilejson))
  tabledata.innerHTML = jsontotable(allfilejson)
}

document.querySelector(".button_direction i").onclick = ()=>{
  allfilejson = allfilejson.reverse()
  sessionStorage.setItem('data',JSON.stringify(allfilejson))
  tabledata.innerHTML = jsontotable(allfilejson)
}

document.querySelector("select#orderbysup").onchange = ()=>{
  let sortbysup = document.querySelector("select#orderbysup").value
  if (sortby) {  
    allfilejson = allfilejson.sort((a,b)=>{
      if (a[sortby] == b[sortby]){
        if (a[sortbysup] > b[sortbysup]) return 1
        else if (a[sortbysup] < b[sortbysup]) return -1
        else return 0
      }
    })
  }
  sessionStorage.setItem('data',JSON.stringify(allfilejson))
  tabledata.innerHTML = jsontotable(allfilejson)
}
let columncopy
document.querySelector("select#copycontent").onchange = ()=>{
  columncopy=document.querySelector("select#copycontent").value
}

document.querySelector(".button_direction i").onclick = ()=>{
  allfilejson = allfilejson.reverse()
  sessionStorage.setItem('data',JSON.stringify(allfilejson))
  tabledata.innerHTML = jsontotable(allfilejson)
}

function namecolumstonumber(columnname){
  let mangcandung =  Object.keys(allfilejson[0])
  for (let index = 0; index < mangcandung.length; index++) {
    const element = mangcandung[index];
    if (columnname == element){
      return index
    }
  }
}

function seteventformaintable(elementtable){
  var rows = elementtable.rows;
  for (i = 1; i < rows.length; i++) {
    rows[i].onclick = function(){ 
      return function(){
        var content
        if (columncopy){
          content =  this.cells[namecolumstonumber(columncopy)].innerHTML
        }
        else{
          content = this.cells[0].innerHTML;
        }
        console.log(content);
        navigator.clipboard.writeText(content);
        this.style.backgroundColor="rgb(216, 131, 131)"
      };
    }(rows[i]);
  }
}
