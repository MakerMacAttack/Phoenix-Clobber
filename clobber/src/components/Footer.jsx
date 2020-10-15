import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <p id="trademark">Technical Media Management &trade;</p>
          <a
            href="https://github.com/MakerMacAttack/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>GitHub</button>
          </a>
          <a
            href="https://www.linkedin.com/in/tim-may-041b1b7/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>LinkedIn</button>
          </a>
      </footer>
    );
  }
}
