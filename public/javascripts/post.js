let tagString = [];

window.onload = function() {
    n = new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    document.getElementById("date").value = m + "/" + d + "/" + y;
};

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