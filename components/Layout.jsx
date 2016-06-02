import React from 'react';
import GA from './GA';

class Layout extends React.Component {
  render() {
    const cssUpdated = new Date().toJSON().replace(/T.+/, '');
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <title>Dan Farrelly</title>

          <meta name="description" content="Full-stack web developer based in New York City." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta id="theme-color" name="theme-color" content="#246B9C" />

          <link href='//fonts.googleapis.com/css?family=Lato:700' rel='stylesheet' type='text/css' />
          <link rel="stylesheet" href={`/css/style.css?updated=${cssUpdated}`} />
          <link rel="icon" type="image/png" href="/images/favicon.png" />
        </head>
        <body>
          <header className="site-header">
            <h1 className="site-title">
              Dan Farrelly
            </h1>
            <nav className="site-nav-container">
              <ul className="site-nav">
                <li><a href="https://timezone.io" target="_blank">Timezone.io</a></li>
                <li><a href="http://danfarrelly.nyc/MailDev/" target="_blank">MailDev</a></li>
                <li><a href="https://github.com/djfarrelly" target="_blank">Github</a></li>
                <li><a href="http://instagram.com/djfarrelly" target="_blank">Instagram</a></li>
                <li><a href="http://www.twitter.com/djfarrelly" target="_blank">Twitter</a></li>
              </ul>
            </nav>
          </header>
          <div className="site-content">
            {this.props.children}
          </div>
          <GA />
        </body>
      </html>
    );
  }
}

export default Layout;
