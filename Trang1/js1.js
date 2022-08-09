
const cirloading = document.getElementsByClassName('loading')
const titlefiles = document.getElementsByClassName('get-file-title')
const dropFileEx = document.getElementById('get-file')
const imgfileex = document.getElementById('file-excel-img')
const deletecurrentfile = document.getElementById('button-delete-files')
const buttoncheck = document.getElementById('button-check')
let selectedFile;
let allfilejson;

console.log(window.XLSX)
console.log(window.FileSaver)


dropFileEx.ondragover = function (evt) {
  evt.preventDefault();
};
dropFileEx.ondragenter = function (evt) {
  evt.preventDefault();
  cirloading[0].classList.remove('loading-hide')
  titlefiles[0].classList.add('get-file-title-hide')
};
dropFileEx.ondrop = function (evt) {
  evt.preventDefault();
  cirloading[0].classList.add('loading-hide')
  titlefiles[0].classList.add('get-file-title-hide')

  selectedFile = evt.dataTransfer.files[0]
  if (selectedFile) {
    showimgfileex()
  }
};

function showimgfileex() {
  document.getElementsByClassName('file-excel-name')[0].innerHTML = selectedFile.name
  imgfileex.classList.remove('file-excel-hide')
  cirloading[0].classList.add('loading-hide')
  titlefiles[0].classList.add('get-file-title-hide')
}

document.getElementById("files-source").addEventListener("change", (event) => {
  selectedFile = event.target.files[0];
  if (selectedFile) {
    showimgfileex()
  }
})

function savefile(filename, datastring){
  var a = document.createElement("a");
  var file = new Blob([datastring], { type: "text/plain" });
  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();
}

buttoncheck.onclick = function () {
  if (selectedFile) {
    cirloading[0].classList.remove('loading-hide')
    setTimeout(function (){
      // Code to run here
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = (event) => {
        let data = event.target.result;
        let workbook = XLSX.read(data, { type: "binary" });
        workbook.SheetNames.forEach(sheet => {
          let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
          console.log(rowObject);
          allfilejson = JSON.stringify(rowObject, undefined, 4)
          savefile('source.json',allfilejson)
        });
      }

      cirloading[0].classList.add('loading-hide')
    }, 100)
    
  }
  else {
    document.getElementById('files-source').click()
  }
  return;
};

deletecurrentfile.onclick = function () {
  cirloading[0].classList.add('loading-hide')
  titlefiles[0].classList.remove('get-file-title-hide')
  imgfileex.classList.add('file-excel-hide')
  selectedFile = undefined
}