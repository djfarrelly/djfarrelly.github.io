import React from 'react';

function createCode() {
  return {
    __html: `
      <script>
        var _gaq=[['_setAccount','UA-27586336-1'],['_trackPageview']];
        (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));
      </script>
    `
  }
}

const GA = () => <div dangerouslySetInnerHTML={createCode()}></div>;

export default GA;
