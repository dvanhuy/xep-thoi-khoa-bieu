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
function showimgfilejson() {
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
    showimgfilejson()
  }
};

//sự kiện đổi tệp
document.getElementById("files-source").addEventListener("change", (event) => {
  selectedFile = event.target.files[0];
  if (selectedFile) {
    showimgfilejson()
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
      document.getElementById('listclass-table').innerHTML=jsontotable(selectedidtoobobject());
      addcolumnDel()
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
        document.getElementsByClassName('choose-class')[0].setAttribute('style','display: block;')
        filterdtdc()
        filtertablemain();
        let keyoption ='' 
        Object.keys(filterdata[0]).forEach(element => {
          keyoption += '<option value="'+element+'">'+element+'</option>'
        });
        document.querySelector('select#key-class').innerHTML += keyoption
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

function seteventformaintable(elementtable){
  var rows = elementtable.rows;
  for (i = 1; i < rows.length; i++) {
    // không hiểu cấu trúc này
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
  var rows = document.querySelector('.listclass-table table').rows;
  for (i = 1; i < rows.length; i++) {
    // đéo hiểu cho lắm :V SOS
    rows[i].cells[0].firstChild.onclick = function(value){
      //sẽ chạy với số lần bằng số cột
      return function(){ // hàm trả về chỉ chạy khi đuọc nhấn nút
        const valuedelete = value.cells[1].innerHTML
        selectedclass.splice(selectedclass.indexOf(valuedelete),1)
        document.getElementById('listclass-table').innerHTML=jsontotable(selectedidtoobobject());
        document.querySelector('.listclass-head-amount span').innerHTML = selectedclass.length
        if (!selectedclass.length == 0) {
          addcolumnDel()
          seteventfortableclass()
        }
      }
    }(rows[i])
  }
}

function filtertablemain(){
  document.getElementById('table-data').innerHTML=jsontotable(filterdata)
  document.getElementsByClassName('main-content')[0].setAttribute('style','align-items: unset;')
  seteventformaintable(document.querySelector('.table-data table'))
  numrow.innerHTML=filterdata.length
}

function selectedidtoobobject(){
  let result = []
  //truyền vào string nên ko so sánh nghiêm ngặt, lỗi :V
  selectedclass.forEach(element => {
    result.push(filterdata.find(filejson=> filejson.STT == element ))
  });
  return result
}

function addcolumnDel(){
  let tableaddcol=document.querySelectorAll('.listclass-table tr')
  tableaddcol[0].innerHTML='<th>Xóa</th>'+tableaddcol[0].innerHTML
  for (let i = 1; i < tableaddcol.length; i++) {
    const element = tableaddcol[i];
    element.innerHTML= '<td><div></div></td>'+element.innerHTML
  }
}

// ------------------------------------------------------------------
                    // search data
// ------------------------------------------------------------------
const textsearch = document.querySelector('input#text-search')
const btcleartxt = document.querySelector('div.button-clear-text')
const btsearchtext = document.getElementsByClassName('button-search-text')[0]
const selectkeyclass = document.querySelector('select#key-class')
let searchclass

textsearch.oninput = function(){ // dùng textsearch.addEventListener("input",()=>{}) cx dc
  if (textsearch.value == ''){
    btcleartxt.style.display = 'none'
  }
  else{
    btcleartxt.style.display = 'block'
  }
}
btcleartxt.onclick = ()=> {
  textsearch.value = ''
  btcleartxt.style.display = 'none'
  textsearch.focus()
}

btsearchtext.onclick = function(){
  if (selectkeyclass.value == 'Chọn khóa')
  {
    selectkeyclass.focus()
  }
  else {
    const key = selectkeyclass.value
    const text = textsearch.value.toLowerCase()
    searchclass = filterdata.filter((data)=>{
      return data[key].toString().toLowerCase().indexOf(text) !== -1
    })
    let tablesearch=''
    tablesearch +='<tbody>'
    searchclass.forEach(row => {
      tablesearch +='<tr>'
      tablesearch += tbbody(Object.values(row),tablesearch)
      tablesearch +='</tr>'
    });
    tablesearch +='</tbody>'
    var tablenew=document.querySelector('#table-data table tbody')
    tablenew.innerHTML = tablesearch
    seteventformaintable(document.querySelector('#table-data table'))
    numrow.innerHTML = searchclass.length
  }

}

textsearch.onkeyup = function(event){
  if (event.keyCode == 13){
    btsearchtext.click()
  }
}
// ------------------------------------------------------------------
                    // detail
// ------------------------------------------------------------------
const numrow = document.querySelector('.choose-class-number span')
const buttonshowdetail = document.querySelector('div.button-show-detail')
buttonshowdetail.onclick = function(){
  document.getElementsByClassName('show-detail')[0].classList.toggle('hide-detail')
  document.querySelector('div.button-show-detail').classList.toggle('button-show-detail-rotate')
}

const buttonaddall = document.getElementsByClassName('bt-add-all-class')[0]
buttonaddall.onclick = function(){
  const addall = searchclass.map((element)=>{
    return element.STT;
  });
  // selectedclass.push(...addall)
  mess.style.removeProperty("display");
  addall.forEach(element => {
    if (!selectedclass.includes(element.toString())) {
      selectedclass.push(element.toString());
    }
  });
  
}
const mess = document.getElementsByClassName('message')[0]
mess.style.display = 'none'
mess.addEventListener('animationend',()=>{
    mess.style.display = 'none'
})

// ------------------------------------------------------------------
                    // button list class
// ------------------------------------------------------------------
const btclearclass = document.getElementsByClassName('listclass-button-clear')[0]
const btclearexport = document.getElementsByClassName('listclass-button-export')[0]
btclearclass.onclick = function(){
  selectedclass=[]
  document.getElementById('listclass-table').innerHTML=''
  document.querySelector('.listclass-head-amount span').innerHTML = '0'
}

function savefile(filename, datastring){
  var a = document.createElement("a");
  var file = new Blob([datastring], { type: "text/plain" });
  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();
}
btclearexport.onclick = function(){
  if (selectedclass.length != 0){
    var datajsonreturn = selectedidtoobobject()
    savefile('class.json',JSON.stringify(datajsonreturn))
  }
}