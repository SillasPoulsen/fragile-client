import selfLove from "../../images/selflove 1.png";
import { Link } from "react-router-dom";

function Landingpage() {
  return (
    <div className="HomepageNotLoggedIn">
      <div className="selfLove">
        <img src={selfLove} alt="Flawsfigure" />
      </div>
      <div>
        <h1 className="logofrontpage">Flaws</h1>
        <p>Because we all feel a little flawed at times</p>
      </div>
      <div className="signup">
        <Link to="/signup">
          <button className="btn-signup">Singup</button>
        </Link>
      </div>
      <div>
        <Link to="/login">
          <a className="btn-login" href="{#}">
            Login
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Landingpage;
