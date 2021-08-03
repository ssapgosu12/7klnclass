const input = document.querySelector('input');
const mergebtn = document.querySelector('button');
const f = document.querySelector('#linkbox2');
mergebtn.addEventListener('click', merge);
input.addEventListener('change',fileupload);

let data1, data2, finaldata, a, b, c, d, z, k;
function fileupload(_event){
    if(input.files.length ===0){
        alert('선택된 파일이 없습니다 (no file uploaded)')
    } else if(input.files.length ===1){
        alert('한개의 파일만 업로드 되었습니다 (only one file uploaded)')
    } else {
        const selectedFile1 = input.files[0];
        const selectedFile2 = input.files[1];
        const datareader1 = new FileReader();
        const datareader2 = new FileReader();
        datareader1.onload = function(){
            console.log("읽어짐");
            console.dir(datareader1.result);
            const rawdata = datareader1.result;
            data1 = new Uint8Array(rawdata);
            console.log(data1);
        };
        datareader2.onload = function(){
            console.log("읽어짐2");
            console.dir(datareader2.result);
            const rawdata = datareader2.result;
            data2 = new Uint8Array(rawdata);
            console.log(data2);
        };
        datareader1.readAsArrayBuffer(selectedFile1);
        datareader2.readAsArrayBuffer(selectedFile2);
    }
}

function merge(){
    console.log(typeof(data1), typeof(data2));
    let maindata, subdata;
    if (data1.length > data2.length){
        maindata = Array.from(data1);
        subdata = Array.from(data2);
    } else {
        maindata = Array.from(data2);
        subdata = Array.from(data1);
    }
    console.log(maindata[4], subdata[4]);
    maindata[4] = maindata[4] + subdata[4];

    let l = subdata.length;
    
    for( let i=8;i<l;i++){
		maindata.push(subdata[i]);
    }
    a = Uint8Array.from(maindata);
    z = a.buffer;
    console.log(z);
    const base64String = btoa(String.fromCharCode(...new Uint8Array(z)));
    const h = document.createElement("a")
    h.href=`data:application/octet-stream;base64, ${base64String}`;
    h.download="Merged_collection.db"
    h.type = "application/bin"
    f.appendChild(h)
    h.click();
}