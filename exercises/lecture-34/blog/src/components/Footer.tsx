export default function Footer() {
  return (
    <footer className="mt-3">
      <div className="page-footer">
        <section className="footer-main">
          <div className="footer-main-item">
            <h2 className="footer-title">About</h2>
            <ul>
              <li><a href="#">Services</a></li>
              <li><a href="#">Portfolio</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Customers</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          <div className="footer-main-item">
            <h2 className="footer-title">Resources</h2>
            <ul>
              <li><a href="#">Docs</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">eBooks</a></li>
              <li><a href="#">Webinars</a></li>
            </ul>
          </div>

          <div className="footer-main-item">
            <h2 className="footer-title">Contact</h2>
            <ul>
              <li><a href="#">Help</a></li>
              <li><a href="#">Sales</a></li>
              <li><a href="#">Advertise</a></li>
            </ul>
          </div>
        </section>

        <section className="footer-social py-3">
            <ul className="footer-social-list-unstyled">
                <li><a href="https://www.facebook.com/facebookIndia"><i className="fab fa-facebook social-media"></i></a></li>
                <li><a href="https://twitter.com/X"><i className="fab fa-twitter social-media"></i></a></li>
                <li><a href="https://www.instagram.com/instagram/?hl=uk"><i className="fab fa-instagram social-media"></i></a></li>
                <li><a href="https://github.com/TooMuchSoulless/TooMuchSoulless.github.io"><i className="fab fa-github social-media"></i></a></li>
                <li><a href="https://www.linkedin.com/company/linkedin/"><i className="fab fa-linkedin social-media"></i></a></li>
                <li><a href="https://www.youtube.com/@LofiGirl"><i className="fab fa-youtube social-media"></i></a></li>
            </ul>
        </section>

        <section className="footer-legal">
          <ul className="footer-legal-list">
            <li><a href="#">Terms &amp; Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#"> &copy; 2024 Copyright Shopaholic Inc.</a></li>
          </ul>
        </section>
      </div>
    </footer>
  );
}
