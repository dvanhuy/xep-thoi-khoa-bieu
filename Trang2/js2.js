// Khai báo
const cirloading = document.getElementsByClassName('loading')
const titlefiles = document.getElementsByClassName('get-file-title')
const dropFilejson = document.getElementById('get-file')
const imgfilejson = document.getElementById('file-json-img')
const deletecurrentfile = document.getElementById('button-delete-files')
let selectedFile;
let allfilejson;
let filterdata;
let selectedclass=[];

// sự kiện thả tệp
function showimgfileex() {
    document.getElementsByClassName('file-json-name')[0].innerHTML = selectedFile.name
    imgfilejson.classList.remove('file-json-hide')
    cirloading[0].classList.add('loading-hide')
    titlefiles[0].classList.add('get-file-title-hide')
  }

dropFilejson.ondragover = function (evt) {
  evt.preventDefault();
};
dropFilejson.ondragenter = function (evt) {
  evt.preventDefault();
  cirloading[0].classList.remove('loading-hide')
  titlefiles[0].classList.add('get-file-title-hide')
};
dropFilejson.ondrop = function (evt) {
  evt.preventDefault();
  cirloading[0].classList.add('loading-hide')
  titlefiles[0].classList.add('get-file-title-hide')
  selectedFile = evt.dataTransfer.files[0]
  if (selectedFile) {
    showimgfileex()
  }
};

//sự kiện đổi tệp
document.getElementById("files-source").addEventListener("change", (event) => {
  selectedFile = event.target.files[0];
  if (selectedFile) {
    showimgfileex()
  }
})

// xóa tệp
deletecurrentfile.onclick = function () {
  cirloading[0].classList.add('loading-hide')
  titlefiles[0].classList.remove('get-file-title-hide')
  imgfilejson.classList.add('file-json-hide')
  selectedFile = undefined
}


// ------------------------------------------------------------------
                // sự kiện chuyển cảnh menu bên phải
// ------------------------------------------------------------------
const listcontent = document.getElementsByClassName('listclass')[0];
const btlistclass = document.getElementsByClassName('button-listclass')[0]

btlistclass.onclick= function(){
  listcontent.classList.toggle('listclass-hide')
  listcontent.style.removeProperty("width");
  btlistclass.style.removeProperty("right");
  //mở ra
  if (!listcontent.classList.contains('listclass-hide')) {
    // chuỗi là string nên sẽ xếp 1 - 12 - 2 -23 - ... . nên ko dùng sort()
    selectedclass.sort((a,b)=>{
      return parseInt(a) > parseInt(b) ? 1 : -1
    });
    document.querySelector('.listclass-head-amount span').innerHTML = selectedclass.length
    //width = undefi thì ko gán luôn
    listcontent.style.width = widthtemp;
    btlistclass.style.right = widthtemp;
    if (!selectedclass.length == 0) {
      document.getElementById('listclass-table').innerHTML=jsontotable(addTablechoosed());
      (()=>{
        let tableaddcol=document.querySelectorAll('.listclass-table tr')
        tableaddcol[0].innerHTML='<th>Xóa</th>'+tableaddcol[0].innerHTML
        for (let i = 1; i < tableaddcol.length; i++) {
          const element = tableaddcol[i];
          element.innerHTML= '<td><div></div></td>'+element.innerHTML
        }
      })()
      seteventfortableclass()
    }
  }
}

var resizer = document.createElement('div');
resizer.style.width = '10px';
resizer.style.height = '100%';
resizer.style.background = 'transparent';
resizer.style.position = 'absolute';
resizer.style.left = 0;
resizer.style.bottom = 0;
resizer.style.cursor = 'e-resize';
resizer.style.zIndex = '10';
//Append Child to Element
listcontent.appendChild(resizer);
//box function onmousemove
resizer.addEventListener('mousedown', initResize, false);

//Window funtion mousemove & mouseup
function initResize(e) {
  listcontent.style.transition = 'none'
  btlistclass.style.transition = 'none'
  window.addEventListener('mousemove', Resize, false);
  window.addEventListener('mouseup', stopResize, false);
}
//resize the element
let widthtemp
function Resize(e) {
  widthtemp = (window.innerWidth - e.clientX) + 'px'
  listcontent.style.width = widthtemp;
  btlistclass.style.right = widthtemp;
  // console.log(element.offsetLeft,element.offsetTop);
}
//on mouseup remove windows functions mousemove & mouseup
function stopResize(e) {
    window.removeEventListener('mousemove', Resize, false);
    window.removeEventListener('mouseup', stopResize, false);
    listcontent.style.transition = '0.2s linear'
    btlistclass.style.transition = '0.2s linear'
}

// ------------------------------------------------------------------
                      // Đọc file json
// ------------------------------------------------------------------

const readjsonfile = document.getElementById('button-read')

readjsonfile.onclick= function(){
    if(selectedFile){
      var reader = new FileReader();
      reader.readAsText(selectedFile)
      reader.onload = function(event) {
        let fileContent = JSON.parse(event.target.result);
        allfilejson = fileContent
      };
      dropFilejson.setAttribute('style','display: none;')
      setTimeout(() => {
        filterdtdc()
        filtertablemain()
      }, 500);
    }
    else{
        document.getElementById('files-source').click()
    }
}

// ------------------------------------------------------------------
                    // lọc dữ liệu rỗng
// ------------------------------------------------------------------

function combinesobject(Objectindex,Objectcombine){
  for (var key in Objectindex) {
    if (Objectcombine[key] !== undefined)
    {
      Objectindex[key] = Objectindex[key] +" - " +Objectcombine[key];
    }
  }
  return Objectindex;

}

function filterdtdc(){
for (let index = 1; index < allfilejson.length; index++) {
  const elementpre = allfilejson[index-1];
  const element = allfilejson[index];
  if (element.STT === undefined){
    allfilejson[index-1] = combinesobject(elementpre,element)
  }
}

  filterdata = allfilejson.filter(filejson=>{
  return filejson.STT !== undefined
})
}


// ------------------------------------------------------------------
         // chuyển file json thành table vs sự kiện cho từng row
// ------------------------------------------------------------------

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

function seteventformaintable(){
  var rows = document.querySelector('.table-data table').rows;
  for (i = 1; i < rows.length; i++) {
    rows[i].onclick = function(){ 
      return function(){
        let cellvalue = this.cells[0].innerHTML
        if (!selectedclass.includes(cellvalue)) {
          selectedclass.push(cellvalue);
        }
      }
    }(rows[i]);
  }
}

function seteventfortableclass(){
  console.log('adsasd');
}

function filtertablemain(){
  document.getElementById('table-data').innerHTML=jsontotable(filterdata)
  document.getElementsByClassName('main-content')[0].setAttribute('style','align-items: unset;')
  seteventformaintable()
}

function addTablechoosed(){
  let result = []
  //truyền vào string nên ko so sánh nghiêm ngặt, lỗi :V
  selectedclass.forEach(element => {
    result.push(filterdata.find(filejson=> filejson.STT == element ))
  });
  return result
}

