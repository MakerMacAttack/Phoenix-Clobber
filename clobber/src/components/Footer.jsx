import React from 'react';

export default class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <p>Technical Media Management &trade;</p>
        <a href="https://github.com/MakerMacAttack/" target="_blank"><button>GitHub</button></a>
        <a href="https://www.linkedin.com/in/tim-may-041b1b7/" target="_blank"><button>LinkedIn</button></a>
      </>
    )
  }
}