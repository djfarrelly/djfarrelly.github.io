import React from 'react';

const Head = (props) => {
  const cssUpdated = new Date().toJSON().replace(/T.+/, '');
  return (
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <title>Dan Farrelly</title>

      <meta name="description" content="Founder at Inngest.com, former CTO at Buffer.com. Built Timezone.io & Maildev as side projects." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta id="theme-color" name="theme-color" content="#246B9C" />

      <link href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap' rel='stylesheet' type='text/css' />
      <link rel="stylesheet" href={`/css/style.css?updated=${cssUpdated}`} />
      <link rel="icon" type="image/png" href="/images/favicon.png" />
      {props.children}
    </head>
  )
};

export default Head;
