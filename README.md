# Orbit

Orbit is a simple Kanban-style task management board built with **HTML,
CSS, and vanilla JavaScript**. It helps you organize tasks into three
stages: **To Do**, **Doing**, and **Done**.

The project uses the browser's **Local Storage** to save tasks, so no
backend or database is required.

## Features

-   **Create tasks** with a title, description, category, and status.
-   **Edit tasks** when details or status change.
-   **Delete tasks** individually.
-   **Mark tasks as completed**.
-   **Drag and drop tasks** between To Do, Doing, and Done columns.
-   **Search tasks** by title or description.
-   **Filter tasks by category**: Task, Bug, Improvement, or Other.
-   **View task counts** for each status.
-   **Switch the theme** using the theme option.
-   **Clear all tasks** after confirmation.
-   **View task details**, including the task ID and creation date.
-   **Explore built-in demos** for browser and JavaScript concepts:
    -   Browser Rendering Pipeline
    -   Event Bubbling and Event Capturing
    -   Attribute vs. Property

## Technologies Used

-   HTML5
-   CSS3
-   Vanilla JavaScript
-   Browser Local Storage
-   Remix Icon for icons

## Getting Started

No installation, package manager, or backend is required.

1.  Download or clone this project.
2.  Keep the project files together in the same folder.
3.  Open `index.html` in a modern web browser.

### Project Structure

``` text
Orbit/
├── index.html
├── style.css
├── script.js
└── README.md
```

Make sure the CSS and JavaScript file names match the references in
`index.html`.

## How to Use

### Manage Tasks

1.  Select **+ Add Task**.
2.  Enter a task title and description.
3.  Choose a category and status.
4.  Select **Add Task** to save it.
5.  Use the edit, delete, and complete icons on a task card to manage
    it.

### Move Tasks

Drag a task card from one column and drop it into another:

-   **To Do** --- tasks that have not been started.
-   **Doing** --- tasks currently in progress.
-   **Done** --- completed tasks.

You can also choose a task's status when creating or editing it.

### Search and Filter

-   Use the search field to find tasks by title or description.
-   Open the menu and choose **Filter Tasks** to filter tasks by
    category.
-   Select **All** in the category filter to show tasks from every
    category.

### Change Theme or Clear Tasks

Open the menu to change the theme or clear all tasks. Clearing tasks
asks for confirmation before removing them.

### Built-in Learning Demos

The menu includes interactive demos for:

-   **Browser Rendering Pipeline:** a visual overview of the stages
    involved in displaying a webpage.
-   **Event Propagation:** try event bubbling and event capturing and
    observe the order in which handlers run.
-   **Attribute vs. Property:** compare an input's current value with
    its original HTML attribute value.

More detailed learning notes for these topics are included at the end of
this README.

## Data Storage

Orbit stores task data in the browser's Local Storage under the key
`tasks`.

-   Tasks remain available after refreshing or reopening the page in the
    same browser profile.
-   Data is stored locally in that browser, not in a remote database.
-   Tasks are not automatically shared or synced between devices or
    browsers.
-   Clearing the browser's site data or Local Storage can remove saved
    tasks.

## Important Notes

-   Remix Icon is loaded from a CDN, so an internet connection may be
    needed for the icons to appear.
-   There is no user account, backend API, or cloud synchronization.
-   This project is a frontend task board and learning project.

## Possible Future Improvements

-   Add due dates and task priorities.
-   Add sorting options.
-   Improve keyboard accessibility.
-   Add import/export for task data.
-   Add an undo option for task updates and deletions.
-   Add a backend if multi-device synchronization or user accounts are
    needed.

------------------------------------------------------------------------

# Learning Notes: Browser Rendering and JavaScript Events

The following notes are included as provided learning material.

# Browser rendering process

# 1. Parsing

Parsing is the process where the browser reads the code we write and
tries to understand its structure and meaning.

Think of it like reading a book. Before understanding the story, we
first read the words and sentences. Similarly, the browser reads HTML,
CSS, and JavaScript files to understand what they contain.

### Example

``` html
<h1>Hello World</h1>
```

When the browser reads this code, it understands:

-   There is a heading element.
-   The text inside the heading is "Hello World".

This understanding process is called "Parsing".

# 2. Tokenization

Before parsing can happen, the browser breaks the code into smaller
pieces called "Tokens".

A token is simply a meaningful part of code.

### Example

``` html
<h1>Hello World</h1>
```

The browser may divide it into tokens like:

``` text
<h1>
Hello World
</h1>
```

These small pieces help the browser understand the structure of the
document more easily.

### Real-Life Example

Imagine building a puzzle.

-   First, we separate all the puzzle pieces.
-   Then, we start assembling them.

Separating the pieces is similar to "Tokenization".

# 3. DOM Tree (Document Object Model)

After parsing the HTML, the browser creates a structure called the "DOM
Tree".

The DOM represents every HTML element as an object arranged in a
tree-like structure.

### Example

``` html
<body>
  <h1>Welcome</h1>
  <p>This is a paragraph.</p>
</body>
```

DOM Tree:

``` text
body
├── h1
│   └── "Welcome"
└── p
    └── "This is a paragraph."
```

### Why is DOM Important?

JavaScript uses the DOM to:

-   Add new elements
-   Remove elements
-   Change content
-   Handle user interactions

Example:

``` javascript
document.querySelector("h1").textContent = "Hello";
```

This code changes the heading using the DOM.

# 4. CSSOM Tree (CSS Object Model)

Just as HTML creates a DOM Tree, CSS creates a "CSSOM Tree".

The browser parses CSS rules and converts them into a structure that it
can understand.

### Example

``` css
h1 {
  color: blue;
  font-size: 32px;
}
```

The browser stores information like:

``` text
h1
├── color: blue
└── font-size: 32px
```

### Purpose of CSSOM

The CSSOM tells the browser:

-   Which styles apply to which elements
-   How elements should look on the screen

Without CSSOM, the browser would know the page structure but not how it
should appear.

# 5. Render Tree

The "Render Tree" is created by combining information from:

-   DOM Tree
-   CSSOM Tree

The browser uses this tree to decide what should actually be displayed
on the screen.

### Process

1.  HTML → DOM Tree
2.  CSS → CSSOM Tree
3.  DOM + CSSOM
4.  Render Tree

### Important Note

Elements that are hidden using:

``` css
{
  display: none;
}
```

are not included in the Render Tree because they are not visible on the
page.

### Why is Render Tree Needed?

It helps the browser determine:

-   What to display
-   How elements should look
-   Where elements should appear

# 6. Event Bubbling

Event Bubbling is a something where an event starts from the target
element and moves upward through its parent elements.

### Example

``` html
<div id="parent">
  <button id="child">Click Me</button>
</div>
```

``` javascript
document.getElementById("child").addEventListener("click", () => {
  console.log("Button Clicked");
});

document.getElementById("parent").addEventListener("click", () => {
  console.log("Div Clicked");
});
```

### Output

``` text
Button Clicked
Div Clicked
```

### What Happened?

1.  Button receives the click.
2.  Button event runs.
3.  Event moves bottom → top.
4.  Parent event runs.

This upward movement is called "Event Bubbling".

# 7. Event Capturing

Event Capturing works in the opposite direction of bubbling.

The event starts from the top of the document and travels down to the
target element.

### Example

``` javascript
document.getElementById("parent").addEventListener(
  "click",
  () => {
    console.log("Div Clicked");
  },
  true
);

document.getElementById("child").addEventListener(
  "click",
  () => {
    console.log("Button Clicked");
  },
  true
);
```

### Output

``` text
Div Clicked
Button Clicked
```

### What Happened?

1.  Event starts from parent.
2.  Parent handler executes.
3.  Event moves from top → bottom.
4.  Button handler executes.

This top-to-bottom flow is called "Event Capturing".

# 8. Event Delegation

Event Delegation is a technique where instead of attaching event
listeners to many child elements, we attach a single listener to their
parent element.

The parent handles events for all its children using Event Bubbling.

### Example

``` html
<ul id="list">
  <li>Apple</li>
  <li>Mango</li>
  <li>Orange</li>
</ul>
```

``` javascript
document.getElementById("list").addEventListener("click", (event) => {
  console.log(event.target.textContent);
});
```

### Result

When clicking:

Apple

Output:

``` text
Apple
```

When clicking:

Mango

Output:

``` text
Mango
```

### Benefits of Event Delegation

-   Less memory usage
-   Better performance
-   Cleaner code
-   Works for dynamically added elements

### Real-Life Example

Imagine a classroom.

Instead of every student reporting attendance individually, the class
monitor reports attendance for everyone.

Similarly, the parent element handles events for all child elements.

# Final Flow

-   HTML File → Tokenization → Parsing → DOM Tree
-   CSS File → Tokenization → Parsing → CSSOM Tree
-   DOM + CSSOM → Render Tree → Layout → Painting → Screen Display

These concepts form the foundation of how browsers understand, build,
style, and interact with web pages.
