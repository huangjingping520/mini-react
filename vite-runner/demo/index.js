let taskId = 1

function workloop(deadline) {
  taskId++
  let shouldYield = false
  while (!shouldYield) {
    // run task
    console.log(`taskId: ${taskId} is running`)

    shouldYield = deadline.timeRemaining() < 1
  }

  requestIdleCallback(workloop)
}

requestIdleCallback(workloop)
