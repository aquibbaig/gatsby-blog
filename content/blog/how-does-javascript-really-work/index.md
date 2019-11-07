---
title: "How does Javascript really work?"
date: "2019-11-07T14:12:03.284Z"
---

We tend to think javascript as an on-the-go language for the browsers but deep down it has some dark secrets that will be unveiled. We will have a thorough understanding of how javascript works and what is happening in the background of the browser when you are writing some piece of javascript code, synchronous or asynchronous. 

### The Core Of JS
On the core, as we all know javascript is a single-threaded language which means that it can do a single task at a time. It is also synchronous, which means that your code will execute line by line. 
```
console.log("abcd")
console.log("bcdf")
```
prints out **abcd** first and **bcdf** after that. This broadly means that if you have a bunch of statements which take some significant amount of time, such as fetching from backend, while loops, etc. then your code execution is stopped at that phase until the processing occurs and after that only we move to next bunch of code. 
```
console.log("Hello")
let i = 0
while(i < 1000) {
    i++;
    console.log(i)
}
console.log("What's up?")
```
If you execute this piece of code, you will see that first **Hello** pops up on the screen, after that, we see numbers from **1 to 999** for about a few seconds and finally, we see **What's up** on the console.

### Why is this a problem?
The problem occurs when we run the code in browsers. While our javascript runtime(v8 as we know it) is busy executing the piece of code, our friendly-neighborhood browser is frozen. Even buttons and links won't work in this case. Ah, that's a big problem! This happens because the DOM is already painted and is not looking for anything to trigger it's re-rendering/ repainting. So, how do we solve that?

### Asyncronous Processing with JS
To find a way out of this problem, we use asynchronous processing, which doesn't sequentially execute the code, essentially chopping off the pieces of code which would take a significant amount of time and execting other parts of the code. One simple way is to do a **setTimeout()** .

```
console.log("Hello!")
let i=0
setTimeout(() => {
    while(i<1000) {
        i++
        console.log(i)
    }
}, 2000)
console.log("What's up")
```
When we run this code, we see that at first **Hello!** pops up on the screen and then **What's up**!!! That's crazy, isn't it? It seems that our **setTimeout()** function has magically been removed for other less time-consuming code to run. So, after a few seconds(2 seconds), setTimeout magically appears to run out of nowhere and prints **1 to 999**. That is exactly how we wanted our program to behave. Isn't it? The piece of code which takes more time should not block other parts of the program. Aye, therefore we call Javascript as non-blocking. Cool!

- Other ways to do asynchronous processing include using Promises or async/await, those are not in the scope of this article, maybe for the next one!

### What happens to the runtime in asyncronous processing?
Javascript runtime has no idea about various requests that we make in our browser, such as xhrHttpRequests, setTimeout, etc. v8 just contains the following data structures:
- call stack to keep track of where your current position in code is, or which part of the code is running
- heap for memory management
So, when we make ajax requests and call setTimeouts what is the entity that handles such things? The answer to that is **Browsers!!**. Browsers come with certain elements such as XML parsers, rendering engine, xhrHttpRequests,  setTimeouts, etc. as a part of collective API's called as web API's. So when you write these functions in your code, the web API's present inside the browser handles that.

### Synchronous processing
Let's look at the above two examples to understand how things work on the inside:
```
console.log("Hello") ...... (1)
let i = 0
while(i < 1000) { ...... (2)
    i++;
    console.log(i)
}
console.log("What's up?") ..... (3)
```
- Here first **(1)** comes up in the v8's call stack and finshes execution and is popped up. Then, 
**(2)** comes to the call stack and after a few seconds of processing, it gets popped off. After that, **(3)** gets into the call stack and gets executed and popped off. This is synchronous.

### Asynchronous processing
```
console.log("Hello!") ...... (1)
let i=0
setTimeout(() => {      ....... (2)
    while(i<1000) {
        i++
        console.log(i)
    }
}, 2000)
console.log("What's up")   ........ (3)
```
- In this asynchronous example, at first **(1)** is pushed into the stack, gets executed immediately and popped up. Now, when **(2)** gets inserted to the stack, v8 knows that it doesn't have the web API's to handle this operation, so it pops out **(2)** from the call stack and starts a timer for the function in a separate area. This timer will start separately and isolated till 2 seconds/2000 milliseconds as inferred from setTimeout function. In the meanwhile in v8's stack **(3)** gets pushed into, executed immediately and popped off the stack. 
- After 2 seconds have passed, the timer moves **(2)** to a temporary queue to prevent these kinds of functions from interacting directly with the call stack which will create mismanagement with the execution flow. Here comes into effect a really important component called as the *event loop* which checks if the call stack is empty(which is true in this case as **(3)** has been executed and our call stack is empty) and if the call stack is empty, it pushes the first element in the queue to the call stack for execution. Wow! Read that again. 


![Event loop](https://miro.medium.com/max/2100/1*iHhUyO4DliDwa6x_cO5E3A.gif)
*credits:miro.medium.com*


### Use case
This is done to prevent all the asynchronous code to be executed after the synchronous to prevent blocking. And it is a very practical approach dealing with writing real-world in-browser javascript.
Another thing is if we use `setTimeout(() => {function()}, 0)` in the above example in **(2)**, it doesn't execute suddenly after 0 seconds as it should, but it executes after all the synchronous code has finished executing. How? 

**Remember, the event loop...**

First **(1)** will be pushed into the stack and executed. When **(2)** will come up, it will be removed from the stack because web API's will handle it and a timer will be set up and immediately it will push this function into the temporary queue(Because here time interval is 0 seconds, not 2000 milliseconds as in the last example). In the meanwhile, as **(2)** is popped off, **(3)** has entered in the call stack. So, the event loop will know that **(3)** is in the stack and stack is not empty, so it won't push **(2)** from the queue to the stack just yet. After **(3)** has been executed successfully, then only it will be pushed. So, the output will be the same in each case.

Thanks for the read!!
