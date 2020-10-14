import whyDidYouRender from '@welldone-software/why-did-you-render'

let renderCount = {}

export const clearUnNeededRenderCount = () => {
  renderCount = {}
}

export default function whyDidYouRenderNotifier(updateInfo) {
  const consoleGroup = updateInfo.options.collapseGroups
    ? console.groupCollapsed
    : console.group

  updateInfo.options.consoleGroup = (...params) => {
    const key = params[0]

    // skip render counts when the log is prop.thing or [hook]
    if (key.includes('[') || key.includes('.')) {
      consoleGroup(...params)
      return
    }

    if (!renderCount[key]) {
      renderCount[key] = 0
    }
    renderCount[key]++

    consoleGroup(...params, `+${renderCount[key]}`)
  }

  whyDidYouRender.defaultNotifier(updateInfo)
}
