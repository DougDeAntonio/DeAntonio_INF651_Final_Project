
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

/* 6. addButtonListeners
a. Selects all buttons nested inside the main element
b. If buttons exist:
c. Loop through the NodeList of buttons
d. Gets the postId from button.dataset.postId
e. If a postId exists, add a click event listener to the button (reference addEventListener) - inside the loop so this happens to each button
f. The listener calls an anonymous function (see cheatsheet)
g. Inside the anonymous function: the function toggleComments is called with the event and postId as parameters
h. Return the button elements which were selected
i. You may want to define an empty toggleComments function for now. The listener test will NOT pass for addButtonListeners until toggleComments is completed.
Nevertheless, I recommend waiting on the logic inside the toggleComments function until we get there */


function addButtonListeners() {
  let buttons = document.querySelector("main").querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener(
      "click",
      function (e) {
        toggleComments(e, button.dataset.postId);
        },
        false
      );
    });
  return buttons;
}
  
/*  7. removeButtonListeners
a. Selects all buttons nested inside the main element
b. Loops through the NodeList of buttons
c. Gets the postId from button.dataset.id
d. If a postId exists, remove the click event listener from the button (reference
removeEventListener) - inside the loop so this happens to each button
e. Refer to the addButtonListeners function as this should be nearly identical
f. Return the button elements which were selected */

function removeButtonListeners() {
  let buttons = document.querySelector("main").querySelectorAll("button");
  buttons.forEach((button) => {
    button.removeEventListener(
      "click",
      function (e) {
        toggleComments(e, button.dataset.postId);
      },
      false
    );
  });
  return buttons;
}

/* 8. createComments
a. Depends on the createElemWithText function we created
b. Receives JSON comments data as a parameter
c. Creates a fragment element with document.createDocumentFragment()
d. Loop through the comments
e. For each comment do the following:
f. Create an article element with document.createElement()
g. Create an h3 element with createElemWithText('h3', comment.name)
h. Create an paragraph element with createElemWithText('p', comment.body)
i. Create an paragraph element with createElemWithText('p', `From:  ${comment.email}`)
j. Append the h3 and paragraphs to the article element (see cheatsheet)
k. Append the article element to the fragment
l. Return the fragment element */

function createComments(comments) {
  if (comments == undefined || comments == null) return undefined;

  let fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    let article = document.createElement("article");
    article.append(createElemWithText("h3", comment.name));
    article.append(createElemWithText("p", comment.body));
    article.append(createElemWithText("p", `From: ${comment.email}`));
    fragment.append(article);
  });
  return fragment;
}

/* 9. populateSelectMenu
a. Depends on the createSelectOptions function we created
b. Receives the users JSON data as a parameter
c. Selects the #selectMenu element by id
d. Passes the users JSON data to createSelectOptions()
e. Receives an array of option elements from createSelectOptions
f. Loops through the options elements and appends each option element to the select menu
g. Return the selectMenu element */

function populateSelectMenu(users) {
  if (users == undefined || users == null) return undefined;
  let menu = document.getElementById("selectMenu");
  let options = createSelectOptions(users);
  options.forEach((option) => menu.append(option));
  return menu;
}

/* 10. getUsers
a. Fetches users data from: https://jsonplaceholder.typicode.com/ (look at
Resources section)
b. Should be an async function
c. Should utilize a try / catch block
d. Uses the fetch API to request all users
e. Await the users data response
f. Return the JSON data */
async function getUsers() {
  const url = BASE_API_URL + "users";
  try {
    return fetch(url).then((response) => response.json());
    } catch (error) {
      console.error(error);
  }
}


/* 11. getUserPosts
a. Receives a user id as a parameter
b. Fetches post data for a specific user id from:
https://jsonplaceholder.typicode.com/ (look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request all posts for a specific user id
f. Await the users data response
g. Return the JSON data */
async function getUserPosts(userId) {
  if (userId == undefined || userId == null) return undefined;
  const url = BASE_API_URL + `users/${userId}/posts`;
  try {
    return fetch(url).then((response) => response.json());
    } catch (error) {
      console.error(error);
  }
}

/* 12. getUser
a. Receives a user id as a parameter
b. Fetches data for a specific user id from: https://jsonplaceholder.typicode.com/
(look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request a specific user id
f. Await the user data response
g. Return the JSON data */
async function getUser(userId) {
  if (userId == undefined || userId == null) return undefined;
  const url = BASE_API_URL + `users/${userId}`;
  try {
    return fetch(url).then((response) => response.json());
    } catch (error) {
      console.error(error);
  }
}

/* 13. getPostComments
a. Receives a post id as a parameter
b. Fetches comments for a specific post id from:
https://jsonplaceholder.typicode.com/ (look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request all comments for a specific post id
f. Await the users data response
g. Return the JSON data */
async function getPostComments(postId) {
  if (postId == undefined || postId == null) return undefined;
  const url = BASE_API_URL + `posts/${postId}/comments`;
  try {
    return fetch(url).then((response) => response.json());
    } catch (error) {
      console.error(error);
  }
}
