import GA from "./GA.jsx";

const PROJECTS = [
  { name: "Inngest", url: "https://www.inngest.com", stars: "5.7k" },
  { name: "MailDev", url: "https://maildev.github.io/maildev/", stars: "6k" },
  { name: "Timezone.io", url: "https://github.com/timezoneio/timezoneio" },
];

const SOCIAL = [
  { name: "X", url: "https://x.com/djfarrelly" },
  { name: "Github", url: "https://github.com/djfarrelly" },
  { name: "Linkedin", url: "https://www.linkedin.com/in/djfarrelly/" },
];

const LinkList = ({ label, links }) => (
  <ul className="site-nav">
    <li>{label}</li>
    {links.map(({ name, url, stars }) => (
      <li key={url}>
        <a href={url} target="_blank">
          {name}
        </a>
        {stars ? <span class="stars">(⭐︎ {stars})</span> : null}
      </li>
    ))}
  </ul>
);

export default function Body({ children, hideFooterName = false }) {
  return (
    <body>
      <header className="site-header">
        <a href="/" className="site-home-link">
          <h1 className="site-title">Dan Farrelly</h1>
        </a>
      </header>
      <div className="site-content">{children}</div>
      <footer className="site-header">
        {!hideFooterName && (
          <a href="/" className="site-home-link">
            <h1 className="site-title">Dan Farrelly</h1>
          </a>
        )}
        <nav className="site-nav-container">
          <ul className="site-nav">
            <li>
              <a href="/blog/about/">About</a>
            </li>
          </ul>
          <LinkList label="Projects:" links={PROJECTS} />
          <LinkList label="Social:" links={SOCIAL} />
        </nav>
      </footer>
      <GA />
    </body>
  );
}
