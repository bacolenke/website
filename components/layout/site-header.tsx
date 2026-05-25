export function SiteHeader() {
  const items = ['Services', 'Work', 'Notes'];

  return (
    <header className="site-header">
      <a href="#home" className="site-logo" aria-label="Home">
        Studio<sup>™</sup>
      </a>

      <div className="site-menu">
        <button className="menu-trigger" type="button" aria-label="Toggle menu">
          <span className="menu-line menu-line-a" />
          <span className="menu-line menu-line-b" />
        </button>
        <span className="menu-divider" />
        <nav className="menu-items-wrapper" aria-label="Primary navigation">
          <div className="menu-items">
            {items.map((item) => (
              <a href="#home" className="menu-item toggle-item" key={item}>
                <span className="text-wrap">
                  <span className="text-white">{item}</span>
                  <span className="text-gradient">{item}</span>
                </span>
              </a>
            ))}
          </div>
        </nav>
        <a href="#home" className="menu-item menu-contact">
          <span className="text-wrap">
            <span className="text-white">Get In Touch</span>
            <span className="text-gradient">Get In Touch</span>
          </span>
        </a>
      </div>
    </header>
  );
}
