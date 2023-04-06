var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');

if (localStorage.getItem('Stites Database') != null) {
    sitesContainer = JSON.parse(localStorage.getItem('Stites Database'));
    display(sitesContainer);
}
else {
    sitesContainer = [];
}
function addSite() {

    if (siteName.value == '' && siteURL.value == '') {
        document.getElementById('nameError').classList.remove('d-none');
        document.getElementById('urlError').classList.remove('d-none');
    }
    else if (siteName.value == '' && siteURL.value != '') {
        document.getElementById('nameError').classList.remove('d-none');
        document.getElementById('urlError').classList.add('d-none');
    }
    else if (siteName.value != '' && siteURL.value == '') {
        document.getElementById('nameError').classList.add('d-none');
        document.getElementById('urlError').classList.remove('d-none');
    }
    else {
        document.getElementById('nameError').classList.add('d-none');
        document.getElementById('urlError').classList.add('d-none');
        var site = {
            name: siteName.value,
            url: siteURL.value
        }
        sitesContainer.push(site);
        localStorage.setItem('Stites Database', JSON.stringify(sitesContainer));
        clearForm();
        display(sitesContainer);
    }
}
function display(list) {
    var temp = ``;
    for (let i = 0; i < list.length; i++) {
        temp += `
        <div class="bg-graysh-gradient rounded-1 fw-bolder p-5 my-2 d-flex">
            <div class="col-lg-4">
                <h2>${list[i].name}</h2>
            </div>
            <div class="col-lg-4">
                <button onclick="visitSite(sitesContainer[${i}].url)" class="btn btn-primary">Visit</button>
                <button onclick="deleteSite(${i})" class="btn btn-danger">Delete</button>
            </div>
        </div>`;
    }
    document.getElementById('sitesList').innerHTML = temp;
}
function clearForm() {
    siteName.value = "";
    siteURL.value = "";
}
function deleteSite(index) {
    sitesContainer.splice(index, 1);
    localStorage.setItem('Stites Database', JSON.stringify(sitesContainer));
    display(sitesContainer);
}
function visitSite(term) {
    console.log(term);
    window.open('https://' + term);
}