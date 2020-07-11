window.onload = function() {
    n = new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    document.getElementById("date").value = m + "/" + d + "/" + y;
};

let title = document.getElementById("title");
let titleCount = document.getElementById("title-count");
title.addEventListener("keyup", (e) => {
    let count = title.value.length;
    titleCount.innerHTML = count + " / 50";
    if (count > 50)
        titleCount.style.color = "red";
    else
        titleCount.style.color = "#383838";
    updateWarnings();
});

let summary = document.getElementById("summary");
let summaryCount = document.getElementById("summary-count");
summary.addEventListener("keyup", (e) => {
    let count = summary.value.length;
    summaryCount.innerHTML = count + " / 100";
    if (count > 100)
        summaryCount.style.color = "red";
    else
        summaryCount.style.color = "#383838";
    updateWarnings()
});

let article = document.getElementById("article");
let articleCount = document.getElementById("article-count");
article.addEventListener("keyup", (e) => {
    let count = article.value.length;
    articleCount.innerHTML = count + " / 1000";
    if (count > 1000)
        articleCount.style.color = "red";
    else
        articleCount.style.color = "#383838";
    updateWarnings()
});

let imageIsLoaded = false;
let loadPreview = function(e) {
    let reader = new FileReader();
    reader.onload = function(){
        let image = document.getElementById('image');
        image.src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    imageIsLoaded = true;
    updateWarnings();
};

let warning1 = document.getElementById("warning1");
warning1.hidden = false;
let warning2 = document.getElementById("warning2");
warning2.hidden = true;
let postButton = document.getElementById("post-button");
postButton.style.display = "none";
function updateWarnings() {
    let showButton = true;
    if (title.value.length === 0 || summary.value.length === 0 || article.value.length === 0 || !imageIsLoaded) {
        warning1.hidden = false;
        showButton = false;
    }
    else
        warning1.hidden = true;

    if (title.value.length > 50 || summary.value.length > 100 || article.value.length > 1000) {
        warning2.hidden = false;
        showButton = false;
    }
    else
        warning2.hidden = true;

    if (showButton === true)
        postButton.style.display = "block";
    else
        postButton.style.display = "none";
}

let tagString = [];
function addTag() {
    let tagList = document.getElementById("tags");
    let tag = document.getElementById("input-tag").value.toLowerCase();

    if (tag === "")
        return alert("Tags cannot be empty.");

    if (!(/^[a-zA-Z]+$/.test(tag)))
        return alert("Tags must only contain alphabet characters.");

    if (tagString.indexOf(tag) !== -1)
        return alert("Tag '" + tag + "' already used.");

    let span = document.createElement("span");
    let li = document.createElement("li");

    span.style.cursor = "pointer";
    span.classList.add("glyphicon");
    span.classList.add("glyphicon-remove-circle");
    span.onclick = (event => {
        tagString = tagString.filter( (e) => {
            return (e !== li.textContent);
        });
        document.getElementById("tag-string").value = tagString.join(',');
        return li.remove();
    });

    tagString.push(tag);
    document.getElementById("tag-string").value = tagString.join(',');

    li.appendChild(document.createTextNode(tag));
    li.appendChild(span);

    tagList.appendChild(li);
    document.getElementById("input-tag").value = "";
}

function uploadFilePressed() {
    document.getElementById("file-button").click();
}

function uploadImage() {
    const url = 'process.php';
    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })
}