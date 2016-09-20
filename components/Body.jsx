import React from 'react';
import GA from './GA';

class Body extends React.Component {
  render() {
    return (
      <body>
        <header className="site-header">
          <a href="/">
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
              <li><a href="http://www.twitter.com/djfarrelly" target="_blank">Twitter</a></li>
              <li><a href="https://github.com/djfarrelly" target="_blank">Github</a></li>
              <li>Projects:</li>
              <li><a href="https://timezone.io" target="_blank">Timezone.io</a></li>
              <li><a href="http://danfarrelly.nyc/MailDev/" target="_blank">MailDev</a></li>
            </ul>
          </nav>
        </footer>
        <GA />
      </body>
    );
  }
}

export default Body;
