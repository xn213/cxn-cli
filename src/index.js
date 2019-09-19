// 主流程的控制
let apply = (action, ...args) => {
  // babel-env
  require(`./${action}`)(...args)
}

export default apply