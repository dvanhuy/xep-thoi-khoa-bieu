
const cirloading = document.getElementsByClassName('loading')
const titlefiles = document.getElementsByClassName('get-file-title')
const dropFilejson = document.getElementById('get-file')
const imgfilejson = document.getElementById('file-json-img')
const deletecurrentfile = document.getElementById('button-delete-files')
let selectedFile;
let allfilejson;

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

const readjsonfile = document.getElementById('button-read')
readjsonfile.onclick= function(){
    if(selectedFile){
        var reader = new FileReader();
        reader.readAsText(selectedFile)
        reader.onload = function(event) {
          var fileContent = JSON.parse(event.target.result);
            allfilejson =fileContent
        };
        dropFilejson.setAttribute('style','display: none;')
    }
    else{
        document.getElementById('files-source').click()
    }
}

  