import { Link } from "react-router-dom";
import "./IntroductionPage.css";

function IntroductionPage() {
  return (
    <>
      <p className="intro">
        We know it’s not easy sharing personal and intimate details. <br />
        <br /> We know it’s difficult facing obstacles. <br />
        <br /> We know you might feel alone. <br /> <br />
        That’s why we created Fragile. All you share with Fragile, will be
        anonymized and <b>won’t be shared with 3rd parties.</b>{" "}
      </p>
      <Link to="/episode/61b9c5dd84c5217a3f53ce4b">
        <button className="btn-signup">Got it</button>
      </Link>
    </>
  );
}

export default IntroductionPage;
