const CODE = `
<script async src="https://www.googletagmanager.com/gtag/js?id=G-LPL5HN33SL"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-LPL5HN33SL');
</script>
    `;

// dangerouslySetInnerHTML is what keeps the <script> tag intact through static
// rendering — React would otherwise escape it.
export default function GA() {
  return <div dangerouslySetInnerHTML={{ __html: CODE }} />;
}
