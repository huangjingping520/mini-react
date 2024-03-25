const createTextNode = (text) => {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

const createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === 'string' ? createTextNode(child) : child
      })
    }
  }
}

function render(el, container) {
  nextWorkOfUnit = {
    dom: container,
    props: {
      children: [el]
    }
  }

  root = nextWorkOfUnit
}

let root = null

let nextWorkOfUnit = null

function workloop(deadline) {
  let shouldYield = false
  while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = performWorkOfUnit(nextWorkOfUnit)


    shouldYield = deadline.timeRemaining() < 1
  }

  if (!nextWorkOfUnit && root) {
    commitRoot()
  }

  requestIdleCallback(workloop)
}

function commitRoot() {
  commitWork(root.child)
  root = null
}

function commitWork(fiber) {
  if (!fiber) return

  let fiberParent = fiber.parent
  while (!fiberParent.dom) {
    fiberParent = fiberParent.parent
  }

  if (fiber.dom) {
    fiberParent.dom.append(fiber.dom)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}


function createDom(type) {
  return type === 'TEXT_ELEMENT'
    ? document.createTextNode('')
    : document.createElement(type)
}

function updateProps(dom, props) {
  Object.keys(props).forEach((key) => {
    if (key !== 'children') {
      dom[key] = props[key]
    }
  })
}

function initChildren(fiber, children) {
  let prevChild = null
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null
    }
    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevChild.sibling = newFiber
    }
    prevChild = newFiber
  })
}

function performWorkOfUnit(fiber) {
  const isFunctionComponent = typeof fiber.type === 'function'
  if (!isFunctionComponent) {
    if (!fiber.dom) {
      // 1. create dom  
      const dom = (fiber.dom = createDom(fiber.type))

      // fiber.parent.dom.append(dom)

      // 2. props
      updateProps(dom, fiber.props)
    }
  }

  const children = isFunctionComponent ? [fiber.type()] : fiber.props.children

  // 3. create linked list
  initChildren(fiber, children)

  // 4. return next task
  if (fiber.child) {
    return fiber.child
  }

  if (fiber.sibling) {
    return fiber.sibling
  }

  return fiber.parent?.sibling
}

requestIdleCallback(workloop)

const React = {
  render,
  createElement
}

export default React
