import React from 'react';
import GA from './GA';

class Body extends React.Component {
  render() {
    return (
      <body>
        <header className="site-header">
          <a href="/" className="site-home-link">
            <h1 className="site-title">
              Dan Farrelly
            </h1>
          </a>
        </header>
        <div className="site-content">
          {this.props.children}
        </div>
        <footer className="site-header">
          <p
            className="site-title"
            style={{ display: this.props.hideFooterName && 'none' }}
          >
            Dan Farrelly
          </p>
          <nav className="site-nav-container">
            <ul className="site-nav">
              <li><a href="/blog/about">About</a></li>
            </ul>
            <ul className="site-nav">
              <li>Projects:</li>
              <li><a href="https://www.inngest.com" target="_blank">Inngest</a></li>
              <li><a href="https://maildev.github.io/maildev/" target="_blank">MailDev</a></li>
              <li><a href="https://github.com/timezoneio/timezoneio" target="_blank">Timezone.io</a></li>
            </ul>
            <ul className="site-nav">
              <li>Social:</li>
              <li><a href="https://bsky.app/profile/danfarrelly.com" target="_blank">Bluesky</a></li>
              <li><a href="https://github.com/djfarrelly" target="_blank">Github</a></li>
              <li><a href="https://x.com/djfarrelly" target="_blank">X</a></li>
              <li><a href="https://www.linkedin.com/in/djfarrelly/" target="_blank">Linkedin</a></li>
            </ul>
          </nav>
        </footer>
        <GA />
      </body>
    );
  }
}

export default Body;
