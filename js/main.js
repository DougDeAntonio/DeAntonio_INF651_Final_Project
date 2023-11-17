/* 1. createElemWithText
a. Receives up to 3 parameters
b. 1st parameter is the HTML element string name to be created (h1, p, button, etc)
c. Set a default value for the 1st parameter to “p”
d. 2nd parameter is the textContent of the element to be created
e. Default value of the 2nd parameter is an empty string.
f. 3rd parameter is a className if one is to be applied (optional)
g. Use document.createElement() to create the requested HTML element
h. Set the other desired element attributes.
i. Return the created element. */

function createElemWithText(element = "p", textContent = "", className) {
    let elem = document.createElement(element);
    elem.textContent = textContent;
    if (className) elem.setAttribute("class", className);
    return elem;
  }

/* 2. createSelectOptions
a. Test users JSON data available here: https://jsonplaceholder.typicode.com/users
b. For testing (not in function) you may want to define users with the test data.
c. Receives users JSON data as a parameter
d. Returns undefined if no parameter received
e. Loops through the users data
f. Creates an option element for each user with document.createElement()
g. Assigns the user.id to the option.value
h. Assigns the user.name to the option.textContent
i. Return an array of options elements */

function createSelectOptions(users) {
    if (users == undefined || users == null) return undefined;
    let options = [];
    users.forEach((user) => {
        let option = document.createElement("option");
        option.setAttribute("value", user.id);
        option.textContent = user.name;
        options.push(option);
        });
    return options;
}

/* 3. toggleCommentSection
a. Receives a postId as the parameter
b. Selects the section element with the data-post-id attribute equal to the postId received as a parameter
c. Use code to verify the section exists before attempting to access the classList property
d. At this point in your code, the section will not exist. You can create one to test if desired.
e. Toggles the class 'hide' on the section element
f. Return the section element */
    
function toggleCommentSection(postId) {
    if (postId == undefined || postId == null) return undefined;
    let element = document.querySelector(`section[data-post-id="${postId}"]`);
    if (element) element.classList.toggle("hide");
    return element;
}

/* 4. toggleCommentButton
a. Receives a postId as the parameter
b. Selects the button with the data-post-id attribute equal to the postId received as a parameter
c. If the button textContent is 'Show Comments' switch textContent to 'Hide Comments'
d. If the button textContent is 'Hide Comments' switch textContent to 'Show Comments'
e. Suggestion (not required) for above: try a ternary statement
f. Return the button element */

function toggleCommentButton(postId) {
    if (postId == undefined || postId == null) return undefined;
    let element = document.querySelector(`button[data-post-id="${postId}"]`);
    if (element) {
        element.textContent =
        element.textContent == "Show Comments"
          ? "Hide Comments"
          : "Show Comments";
    }
    return element;
}

/* 5. deleteChildElements
a. Receives a parentElement as a parameter
b. Define a child variable as parentElement.lastElementChild
c. While the child exists…(use a while loop)
d. Use parentElement.removeChild to remove the child in the loop
e. Reassign child to parentElement.lastElementChild in the loop
f. Return the parentElement */

function deleteChildElements(parentElement) {
    if (!parentElement?.tagName) return undefined;
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
    return parentElement;
}