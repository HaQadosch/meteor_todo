import React from 'react'
import ReactDOM from "react-dom";
import { Template } from "meteor/templating"
import { Blaze } from "meteor/blaze"

interface IAccountsUIWrapper {

}

export const AccountsUIWrapper: React.FC<IAccountsUIWrapper> = () => {
  const [view, setView] = React.useState<Blaze.View>()
  const container = React.useRef(null)

  React.useEffect(() => {
    setView(Blaze.render(Template.loginButtons, ReactDOM.findDOMNode(container.current) as Node))

    return () => {
      Blaze.remove(view as Blaze.View)
    }
  }, [])
  return (
    <span ref={ container }>

    </span>
  )
}