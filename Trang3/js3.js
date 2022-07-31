let selectedFile;
console.log(window.XLSX)

document.getElementById("input").addEventListener("change", (event) => {
  selectedFile = event.target.files[0];
})

document.getElementById("buttonCV").addEventListener("click", () => {
  console.log(selectedFile.name)
  if (selectedFile) {
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let data = event.target.result;
      let workbook = XLSX.read(data, { type: "binary" });
      console.log(workbook);
      workbook.SheetNames.forEach(sheet => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
        console.log(rowObject);
        // document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject, undefined, 4)
        console.log(JSON.stringify(rowObject, undefined, 4))
      });
    }
  }
})
