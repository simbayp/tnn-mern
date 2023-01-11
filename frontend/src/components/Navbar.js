import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Gymmy</h1>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
