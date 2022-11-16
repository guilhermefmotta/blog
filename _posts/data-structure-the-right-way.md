---
title: 'Learn data structure using java in the right way (Part 1)'
excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus.'
coverImage: '/assets/blog/data-structure-the-right-way/cover.jpg'
date: '2022-10-11T05:35:07.322Z'
timeReader: '3 min'
author:
  name: Guilherme Motta
  picture: '/assets/blog/authors/me.png'
ogImage:
  url: '/assets/blog/data-structure-the-right-way/cover.jpg'
---

Every computer science student will need to study data structure, but little is said why you need study that e how important is for your career, so i'll start with that why data structure is so important for you career and if we use that in real life or not.<br />

First is pretty rare when you need to use this complex algorithms like (Queues, Stack, Tree, Interpolation Search, Binary search) 
even more if you work with management software, normally people always will do a simple linear search instead a binary search and the reason is simple, this kind of algorithms worth when you are working with a lot of data with a complex requirement. You'll not use that to display a list of users in a dashboard for example.
<br />

So why does the university still teach this? the reason is simple too, they give the student all the basis to solve from a simple requirement to a complex requirement.
<br />

They really help people to think more architecturally and understand how things work in a computer vision. So if you are think why i need study that, "I just want to return my uses from database" follow the post I'll explain the basics and when you should apply this.
<br />


## **Arrays**

An array is a collection normally of the same data type the elements are stored at continues memory location, you need to provide the size of the array and can access the data just using the index, things will be more clearly when we get the code. <br />

![Array visualization](/assets/blog/data-structure-the-right-way/array-visualization.png)

- First values like (201,201,202,203) are the location of the memory, you dont need care about that now.

- Second values like (U,B,F,D) are the value, that's is what you want, that could be a list of your best friends.

- Third values like (0,1,2,4) are the index, you will use this numbers to acess the value. 

- We can see that we have some spaces in empty, the computer not will alocate nothing in this spaces.
 <br />

 How we can use arrays in java ? we need declare the type of the array and use [] like this 

```
char[] array = new char[10]; // char is the type, 10 is the size
char[] array2 = new char[]{'U','B','F','D','A','E','C',null,null}; 

```
How we can get a specific value in the array ?

```
array[1] /** we will get the value B, always remember array start 
in index 0, thats means if we want the first value we need pass 0
intead a 1
**/
```

How we can acess all elements in the array ?

```
for (char index = 0; <index array.length; i++) {
  System.out.println("Index " + index + " : "+ array[index]);
}
```
Thats will print in console all index and value of the array. <br />

We also have 2D array and normally we represent that like a table, we also have 3D array he is really hard to work normally we dont use it, we'll talk about it later.
<br />

```
int[][] twoArray = new int[10][10];
int[][][] treeArray = new int[10][10][10];
```

![2D Array visualization](/assets/blog/data-structure-the-right-way/array.png)


Now you know the basic about array, I suggest your try this two challenge in leetcode. Try to solve this problems alone without see the answer below
<br />
- [Two sum](https://leetcode.com/problems/two-sum/ "Two sum")
- [Search insert position](https://leetcode.com/problems/search-insert-position/submissions/ "Search insert position")


## **Two Sum Solution**
```
public static int[] twoSum(int[] nums, int target) {
  int[] it = {};
  for (int i = 0; i < nums.length; i++) {
    for (int x = i + 1; x < nums.length; x++) {
      if (nums[i] + nums[x] == target) {
        it = new int[]{i, x};
      }
    }
  }
  return it;
}
```

## **Search insert position Solution**
```
public int searchInsert(int[] nums, int target) {
  int temp = 0;
  for (int index =0; index < nums.length; index++) {
    if (nums[index] == target) {
      temp = index;
    } else if (nums[index] < target) {
      temp = index + 1;
    }
  }
        
  return temp;
}

```

Now I have something to tell you, we don't use array anymore, the only reason you'll use array in this days is for perfomance issues. We have something called List but that is topic for the other part.







