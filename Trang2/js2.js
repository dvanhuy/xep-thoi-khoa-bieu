
const cirloading = document.getElementsByClassName('loading')
const titlefiles = document.getElementsByClassName('get-file-title')
const dropFilejson = document.getElementById('get-file')
const imgfilejson = document.getElementById('file-json-img')
const deletecurrentfile = document.getElementById('button-delete-files')
let selectedFile;
let allfilejson;
let filterdata;

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
function fccallback(callback){
  var reader = new FileReader();
  reader.readAsText(selectedFile)
  reader.onload = function(event) {
    let fileContent = JSON.parse(event.target.result);
    allfilejson = fileContent
  };
  console.log('o trong');
  dropFilejson.setAttribute('style','display: none;')
  callback(allfilejson);
}


const readjsonfile = document.getElementById('button-read')
readjsonfile.onclick= function(){
    if(selectedFile){
      // fccallback(data=>{
      //   console.log(data);
      // })
      var reader = new FileReader();
      reader.readAsText(selectedFile)
      reader.onload = function(event) {
        let fileContent = JSON.parse(event.target.result);
        allfilejson = fileContent
      };
      dropFilejson.setAttribute('style','display: none;')
      setTimeout(() => {
        filterdtdc()
        jsontotable(filterdata)
      }, 500);
    }
    else{
        document.getElementById('files-source').click()
    }
}

let tabledata=""

function tbhead(stringhead)
{
  stringhead.forEach(index => {
    tabledata+= '<th>'+index+'</th>'
  });
}

function tbbody(stringbody)
{
  stringbody.forEach(index => {
    tabledata+= '<td>'+index+'</td>'
  });
}

function jsontotable(filejson){
  tabledata +='<table>'
  tabledata +='<thead><tr>'
  tbhead(Object.keys(filejson[0]))
  tabledata +='</tr></thead>'
  tabledata +='<tbody>'
  filejson.forEach(row => {
    tabledata +='<tr>'
    tbbody(Object.values(row))
    tabledata +='</tr>'
  });
  tabledata +='</tbody>'
  tabledata +='</table>'
  document.getElementById('table-data').innerHTML=tabledata
  document.getElementsByClassName('main-content')[0].setAttribute('style','align-items: unset;')
}

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