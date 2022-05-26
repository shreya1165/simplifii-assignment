import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (location.state === null) {
      console.log("login nhi kia");
      navigate("/");
    }
  }, []);
  return (
    <div className="App">
      <h1> You have successfully logged-in</h1>
    </div>
  );
}
