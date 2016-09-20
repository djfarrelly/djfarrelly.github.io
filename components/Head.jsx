import React from 'react';

const Head = (props) => {
  const cssUpdated = new Date().toJSON().replace(/T.+/, '');
  return (
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <title>Dan Farrelly</title>

      <meta name="description" content="Software Architect at Buffer based in New York City." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta id="theme-color" name="theme-color" content="#246B9C" />

      <link href='//fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css' />
      <link rel="stylesheet" href={`/css/style.css?updated=${cssUpdated}`} />
      <link rel="icon" type="image/png" href="/images/favicon.png" />
      {props.children}
    </head>
  )
};

export default Head;
