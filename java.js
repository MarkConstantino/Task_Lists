const inputBox = document.getElementById("box");
const listContainer = document.getElementById("list");

function task() {
    if (inputBox.value === '') {
        alert("Please enter your plan");
    } else {
        let li = document.createElement("li");
        let taskDiv = document.createElement("div"); 
        taskDiv.textContent = inputBox.value;
        li.appendChild(taskDiv);
        
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("editButton");
        li.appendChild(editButton);

        editButton.addEventListener("click", function() {
            let taskContent = li.querySelector("div"); 
            taskContent.contentEditable = true;
            taskContent.focus();

            editButton.addEventListener('click', function() {
                if (editButton.textContent.toLowerCase() === "edit") {
                    editButton.textContent = "Save";
                    taskContent.setAttribute("contenteditable", "true");
                    taskContent.focus();
                } else {
                    editButton.textContent = "Edit";
                    taskContent.setAttribute("contenteditable", "false");
                    Save();
                }
            });

            taskContent.addEventListener("blur", function() {
                taskContent.contentEditable = false;
                Save();
            });
        });
    }
    inputBox.value = "";
    Save();
}
listContainer.addEventListener("click", function(event) {
    const target = event.target;
    if (target.tagName === "LI") {
        target.classList.toggle("check");
        Save();
    } else if (target.tagName === "SPAN") {
        target.parentElement.remove();
        Save();
    } 
}, false);

function Save() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function Show() {
    listContainer.innerHTML = localStorage.getItem("data");
}

Show();
