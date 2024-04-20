export default function Navbar() {
  return (
    <header className="page-header mb-3">
      <a href="#" className="brand">Shopaholic</a>

      <nav className="navbar">
        <a href="#">Home page</a>
        <a href="#">Catalog</a>
        <a href="#">Blog</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>

      <nav className="toolbar">
        <a href="#" className="far fa-heart"></a>
        <a href="#" className="fas fa-dolly-flatbed"></a>
        <a href="#" className="far fa-user"></a>
      </nav>
    </header>
  )
}