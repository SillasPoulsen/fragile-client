import { Link } from "react-router-dom";

function IntroductionPage() {
  return (
    <>
      <p>
        We know it’s not easy sharing personal and intimate details, we know
        it’s difficult facing obstacles, we know you might feel alone. That’s
        why we created Fragile. All you share with Fragile, will be anonymized
        and won’t be shared with 3rd parties.{" "}
      </p>
      <Link to="/episode/61b9e89384c5217a3f53ce6c">
        <button className="btn-signup">Got it</button>
      </Link>
    </>
  );
}

export default IntroductionPage;
