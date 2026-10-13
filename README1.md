# Browser rendering process

# 1. Parsing

Parsing is the process where the browser reads the code we write and tries to understand its structure and meaning.

Think of it like reading a book. Before understanding the story, we first read the words and sentences. Similarly, the browser reads HTML, CSS, and JavaScript files to understand what they contain.

### Example

<h1>Hello World</h1>

When the browser reads this code, it understands:

* There is a heading element.
* The text inside the heading is "Hello World".

This understanding process is called "Parsing".


# 2. Tokenization

Before parsing can happen, the browser breaks the code into smaller pieces called "Tokens".

A token is simply a meaningful part of code.

### Example

<h1>Hello World</h1>

The browser may divide it into tokens like:

<h1>
Hello World
</h1>

These small pieces help the browser understand the structure of the document more easily.

### Real-Life Example

Imagine building a puzzle.

* First, we separate all the puzzle pieces.
* Then, we start assembling them.

Separating the pieces is similar to "Tokenization".


# 3. DOM Tree (Document Object Model)

After parsing the HTML, the browser creates a structure called the "DOM Tree".

The DOM represents every HTML element as an object arranged in a tree-like structure.

### Example

<body>
  <h1>Welcome</h1>
  <p>This is a paragraph.</p>
</body>

DOM Tree:

body
-> h1
    -> "Welcome"
->  p
    -> "This is a paragraph."

### Why is DOM Important?

JavaScript uses the DOM to:

* Add new elements
* Remove elements
* Change content
* Handle user interactions

Example:

document.querySelector("h1").textContent = "Hello";

This code changes the heading using the DOM.


# 4. CSSOM Tree (CSS Object Model)

Just as HTML creates a DOM Tree, CSS creates a "CSSOM Tree".

The browser parses CSS rules and converts them into a structure that it can understand.

### Example

h1 {
  color: blue;
  font-size: 32px;
}

The browser stores information like:

h1
-> color: blue
-> font-size: 32px

### Purpose of CSSOM

The CSSOM tells the browser:

* Which styles apply to which elements
* How elements should look on the screen

Without CSSOM, the browser would know the page structure but not how it should appear.


# 5. Render Tree

The "Render Tree" is created by combining information from:

* DOM Tree
* CSSOM Tree

The browser uses this tree to decide what should actually be displayed on the screen.

### Process

1. HTML → DOM Tree
2. CSS → CSSOM Tree
3. DOM + CSSOM   
4. Render Tree

### Important Note

Elements that are hidden using:

{
 display: none;
}

are not included in the Render Tree because they are not visible on the page.

### Why is Render Tree Needed?

It helps the browser determine:

* What to display
* How elements should look
* Where elements should appear


# 6. Event Bubbling

Event Bubbling is a something where an event starts from the target element and moves upward through its parent elements.

### Example

<div id="parent">
  <button id="child">Click Me</button>
</div>

document.getElementById("child").addEventListener("click", () => {
  console.log("Button Clicked");
});

document.getElementById("parent").addEventListener("click", () => {
  console.log("Div Clicked");
});


### Output

Button Clicked
Div Clicked

### What Happened?

1. Button receives the click.
2. Button event runs.
3. Event moves bottom -> top.
4. Parent event runs.

This upward movement is called "Event Bubbling".


# 7. Event Capturing

Event Capturing works in the opposite direction of bubbling.

The event starts from the top of the document and travels down to the target element.

### Example

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

### Output

Div Clicked
Button Clicked

### What Happened?

1. Event starts from parent.
2. Parent handler executes.
3. Event moves from top -> bottom.
4. Button handler executes.

This top-to-bottom flow is called "Event Capturing".

# 8. Event Delegation

Event Delegation is a technique where instead of attaching event listeners to many child elements, we attach a single listener to their parent element.

The parent handles events for all its children using Event Bubbling.

### Example

<ul id="list">
  <li>Apple</li>
  <li>Mango</li>
  <li>Orange</li>
</ul>

document.getElementById("list").addEventListener("click", (event) => {
  console.log(event.target.textContent);
});

### Result

When clicking:

Apple

Output:

Apple

When clicking:

Mango

Output:

Mango

### Benefits of Event Delegation

* Less memory usage
* Better performance
* Cleaner code
* Works for dynamically added elements

### Real-Life Example

Imagine a classroom.

Instead of every student reporting attendance individually, the class monitor reports attendance for everyone.

Similarly, the parent element handles events for all child elements.

# Final Flow

=> HTML File -> Tokenization -> Parsing -> DOM Tree

=> CSS File -> Tokenization -> Parsing -> CSSOM Tree

=> DOM + CSSOM -> Render Tree -> Layout -> Painting -> Screen Display

These concepts form the foundation of how browsers understand, build, style, and interact with web pages.


