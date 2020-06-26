function addTag() {
    let tagList = document.getElementById("tags");
    let tag = document.getElementById("input-tag");

    if (tag.value === "")
        return alert("Tags cannot be empty.");

    if (!(/^[a-zA-Z]+$/.test(tag.value)))
        return alert("Tags must only contain alphabet characters.");

    let span = document.createElement("span");
    let li = document.createElement("li");

    span.style.cursor = "pointer";
    span.classList.add("glyphicon");
    span.classList.add("glyphicon-remove-circle");
    span.onclick = (event => {
        return li.remove();
    });

    li.appendChild(document.createTextNode(tag.value.toLowerCase()));
    li.appendChild(span);

    tagList.appendChild(li);
    tag.value = "";
    console.log("Added");
}

function uploadImage() {
    console.log("working");
    var loadFile = function(event) {
        var image = document.getElementById('output');
        image.src = URL.createObjectURL(event.target.files[0]);
    };
}