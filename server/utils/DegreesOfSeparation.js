const getCommonMovie = require ("../api/getCommonMovie")
/*
Logic in more detail below:

The problem at hand involves finding the shortest path 
between two actors (casts1 and casts2) in a graph of 
actors and their co-stars. The solution involves using 
an algorithm known as Breadth-First Search (BFS), which 
is designed to traverse a graph in a 'breadthward' motion 
and uses a queue data structure to achieve this.

Here's the function:
*/

const bfs = (graph, casts1Id, casts2Id) => {
  let queue = [{ node: casts1Id, path: [] }];
  let visited = new Set();

  while (queue.length > 0) {
    let current = queue.shift();
    let node = current.node;
    let path = current.path;

    if (node === casts2Id) {
      console.log(path)
      console.log(path.concat(node))
      let pathArray = path.concat(node);
      for (let i = 0; i < pathArray.length; i++){
        getCommonMovie(pathArray[i], pathArray[i+1])

      }
      return path.concat(node);
    }

    if (!visited.has(node)) {
      visited.add(node);

      let neighbors = graph[node] || [];
      for (let neighbor of neighbors) {
        queue.push({ node: neighbor, path: [...path, node] });
      }
    }
  }
  
  return null;
};

module.exports = bfs;

/*  Note CASTS replaces the word ACTOR in the code above.
Explanation:
1. Initialize a queue w/obj containing the starting actor and an empty path.
2. Initialize a set to keep track of visited actors.
3. While the queue is !empty, repeat the following steps:
4. Take the 1st actor from the queue.
5. Extract the current actor and the path to reach that actor.
6. If current actor is the target actor, return the path to reach that actor.
7. If current actor has not been visited yet, add it to the visited set and explore its co-stars.
8. Get the co-stars of the current actor.
9. For each co-star, add them to the queue with the path to reach them.
10. If no path is found after exploring all reachable actors, return null.
*/

/* 
Detailed Explanation of the BFS Function
*****Note CASTS replaces the word ACTOR in the code above.*****
1. let queue = [{node: actor1, path: []}]; - We initialize a queue with 
an object that has two properties: node (the current actor) and path 
(the path to reach that actor). Initially, the node is actor1 (the actor 
we're starting from) and path is an empty array because we haven't 
traversed any path yet.

2. let visited = new Set(); - We also initialize a visited set to keep 
track of all the actors we've visited. This is to ensure we don't visit 
the same actor twice.

3. while (queue.length > 0) {...} - This loop runs as long as there are 
still actors to visit (i.e., as long as the queue is not empty).

4. let current = queue.shift(); - We remove the first actor from the queue. 
This actor is the one we're going to explore in the current iteration.

5. let node = current.node; let path = current.path; - We extract the current 
actor and the path to reach that actor from the current object.

6. if (node === actor2) { return path.concat(node); } - If the current actor 
is the actor we're looking for (actor2), we've found a path from actor1 to 
actor2. We return this path.

7. if (!visited.has(node)) {...} - If we haven't visited the current actor before, 
we add them to the visited set and add all their co-stars to the queue.

8. let neighbors = graph[node] || []; - We get a list of the current actor's co-stars 
(neighbors in the graph). If the actor doesn't exist in the graph, we use an empty 
array to avoid errors.

9. for (let neighbor of neighbors) {...} - We iterate over each co-star of the current 
actor.

10. queue.push({node: neighbor, path: path.concat(node)}); - We add each co-star to the 
queue, along with the path to reach them (which is the current path plus the current 
    actor).

11. return null; - If we've visited all reachable actors and haven't found actor2, there 
is no path from actor1 to actor2. In this case, we return null.


*/