console.log("Welcome to the project-6");

// Utility functions
function getElement(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let parameterBox = document.getElementById('parameterBox');
let jsonDataBox = document.getElementById('jsonInputBox');
let paramsDiv = document.getElementById('params');
// hide this box initially
parameterBox.style.display = 'none';

let jsonRadio = document.getElementById('json');
let customRadio = document.getElementById('custom');

// if user clicks on json then hide custom and if user clicks on custom then hide json
jsonRadio.addEventListener('click',()=>{
    parameterBox.style.display = 'none';
    jsonDataBox.style.display = 'block';
    paramsDiv.style.display = 'none';
})

customRadio.addEventListener('click',()=>{
    jsonDataBox.style.display = 'none';
    parameterBox.style.display = 'block';
    paramsDiv.style.display = 'block';
})

// if user clicks on "+" then we have to add more parameter fields
let count = 1;
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    let params = document.getElementById('params');
    let form = `<form class="row g-3 my-2">
                <label for="content${count+1}" class="col-sm-2 col-form-label">Enter Custom Data:</label>
                <div class="col-md-5">
                <input type="text" class="form-control" id="content${count+1}" placeholder="Content">
                </div>
                <div class="col-md-4">
                <input type="text" class="form-control" id="value${count+1}" placeholder="Value">
                </div>
                <button class="btn btn-primary customBtn removeBtn"> - </button>
                </form>`
    let paramEle = getElement(form);
    params.appendChild(paramEle);  
    let removeBtn = document.getElementsByClassName('removeBtn');
    for(btn of removeBtn){
        btn.addEventListener('click',(e)=>{
            e.preventDefault();
            let res = confirm("Do you want to delete this parameter?");
            if(res){
                e.target.parentElement.remove();// this is for removing "-" button
            }
        })
    } 
    count++;  
})

let fetchBtn = document.getElementById('fetchBtn');
fetchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    document.getElementById('responseCode').innerText = "Fetching data....Please wait...."

    // get the user entered data
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='reqType']:checked").value;
    let contentType = document.querySelector("input[name='conType']:checked").value;

    // if user has clicked on params then collect all the params and add them into an object
    let data = "";
    if(contentType === 'custom'){
        let obj = {};
        for(let i=0;i<count;i++){
            if(document.getElementById('content' + (i+1)) != undefined){
                let content = document.getElementById('content' + (i+1)).value;
                let value = document.getElementById('value' + (i+1)).value;
                obj[content] = value;
            }
        }
        data = JSON.stringify(obj);
    }else{
        data = document.getElementById('jsoninput').value;
    }

    // if the request is GET
    if(requestType === 'get'){
        fetch(url,{
            method:'GET',
        })
        .then(response => response.text())
        .then(text =>{
            document.getElementById('responseCode').innerHTML = text;
            Prism.highlightAll();
        })
    }// if the request is POST
    else{
        let params = {
            method: 'POST',
            Headers: {
                'Content-Type':'application/json'
            },
            body: data
        }
        fetch(url,params).then(response=>response.text())
        .then(text => {
            document.getElementById('responseCode').innerHTML = text;
            Prism.highlightAll();
        })
    }
})