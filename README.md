1. Difference between getElementById, getElementsByClassName, querySelector, querySelectorAll

getElementById() --- Selects one element using id.

getElementsByClassName() -- Selects multiple elements using class name (live collection).

querySelector() ----Selects the first matching element using CSS selector.

querySelectorAll() -----Selects all matching elements using CSS selector (static list).

2. How to create and insert a new element into the DOM?

Create the element using createElement(),add content if needed,  then insert it using appendChild() or similar method.

3. What is Event Bubbling?

Event Bubbling means an event starts from the target element
and moves upward to its parent elements.



4. What is Event Delegation? Why is it useful?

Event Delegation means adding an event listener to a parent element to handle events for its child elements.
It reduces code and improves performance.

5. Difference between preventDefault() and stopPropagation()

preventDefault() → Stops the default browser action.

stopPropagation() → Stops the event from bubbling up.