---
title: All About Linked Lists
date: '2019-05-05T18:40:03.284Z'
---

I have been thinking of writing an article about Data Structures since I have to prepare the same for my 
placements(whatever we have xD). Basically I am a third year guy who specialises in Web Development. Like they say
it's never too late to start something new. This is where I begin. *drumrolls* ...

> Linked Lists are special kinds of arrays. Change my mind

### Introduction
That you can see on Wikipedia. When we don't want to waste memory for storing data-types, also when we want quicker 
insertion and deletion we would prefer Linked Lists. However access speed may be slower in case of Linked Lists. Overall,
Linked Lists are mostly chosen for Memory Management.

### Terminologies
- **Head**: It refers to the first element of the Linked List. All elements are accessed by traversing from this node.
- **Node**: Node is the single element entity of a Linked List. It consists of two parts: data(whatever you can call it) 
and pointer variable.
- **Pointer**: This is a variable which points to another entity, mostly the one coming after it.

### Basic Operations in a Linked List:
(All of this code is written by Aquib Baig in Java)
- **creating Linked Lists**
```
public class List{
    Node head;
    List(){
        head = null;
    }
    static class Node{
        int data;
        Node next;
        Node(int d) {
            data = d;
            next = null;
        }
    }

    List ll = new List(); 
    ll.head = new Node(5);
```
The *static* keyword against a class name if used to chain classes one within another. List() and Node() are constructors
for their respective classes.

- **traversal of elements in a Linked List**

```
public function tr(List ll){
    Node curr = ll.head;
    while (curr!= null) {
        // do something
        curr = curr.next;
    }
}

traverse(ll);
```

The *current* variable is a temporary variable used to reference the head of the Linked List. The basic implementation 
concerning Linked Lists is that we always use temporary variables to change the present structure of the Linked List
and finally replace it with the original one. After all, the original linked list must be preserved. It works just like 
the Universe. We can use other realities to define ours but if we dont restore our reality, then that will create another 
reality. *giggles* ...

- **deletion of an element from Linked List**

```
    if(ll.head.data == element) 
    {
    ll.head = ll.head.next;
    }
    else {
     Node curr = ll.head;
     while(curr.next != null)
    {
     if(curr.next.data 
     == element) 
     {
     curr.next = 
     (curr.next).next;
     }
     curr = curr.next;
    }
    }
```

Deletion must be easy as we know how to traverse elements. It is just a matter of if-else statements. But moreover we need
to point the next of the current Node to that of the deleted node's next. Be careful to handle exceptions too.

### Conclusion
That's all for the article. I know there are a lot of things left unsaid but I don't want to bore people to death. Everybody 
knows Linked Lists anyways. Thanks for the time. The whole ***Gist*** for the code with more functions is [here](https://gist.github.com/aquibbaig/2681a101f1f4bdbd22c17903681f7b72)