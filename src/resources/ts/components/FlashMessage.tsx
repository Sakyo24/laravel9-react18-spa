import React from 'react'

type Props = {
  type: string
  message: string
}

const FlashMessage: React.FC<Props> = ({type, message}) => {
  if (message) {
    return (
      <div className={`alert alert-${type}`} role='alert'>
        {message}
      </div>
    )
  } else {
    return (<></>)
  }
}

export default FlashMessage;