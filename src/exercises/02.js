import React from 'react'
import {Switch} from '../switch'

function componentHasChild(child) {
  for (const property in Toggle) {
    if (Toggle.hasOwnProperty(property)) {
      if (child.type === Toggle[property]) {
        return true
      }
    }
  }
  return false
}

class Toggle extends React.Component {
  static On = props => (props.on ? props.children : null)
  static Off = props => (props.on ? null : props.children)
  static Button = ({on, toggle}) => (
    <Switch on={on} onClick={toggle} />
  )

  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )

  render() {
    // 1. React.Children.map: https://reactjs.org/docs/react-api.html#reactchildrenmap
    // 2. React.cloneElement: https://reactjs.org/docs/react-api.html#cloneelement
    return React.Children.map(this.props.children, childElement => {
      if (componentHasChild(childElement)) {
        return React.cloneElement(childElement, {
          on: this.state.on,
          toggle: this.toggle,
        })
      } else {
        return childElement
      }
    })
  }
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
      <span>Hello</span>
    </Toggle>
  )
}
Usage.title = 'Compound Components'

export {Toggle, Usage as default}
