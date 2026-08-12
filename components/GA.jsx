const CODE = `
      <script>
        var _gaq=[['_setAccount','UA-27586336-1'],['_trackPageview']];
        (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));
      </script>
    `;

// dangerouslySetInnerHTML is what keeps the <script> tag intact through static
// rendering — React would otherwise escape it.
export default function GA() {
  return <div dangerouslySetInnerHTML={{ __html: CODE }} />;
}
