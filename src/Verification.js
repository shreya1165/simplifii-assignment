import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Verification() {
  const location = useLocation();
  let navigate = useNavigate();
  console.log(location.state, "next page");
  var mobile = location.state;
  const [OTP, setOTP] = useState();
  const [timeLeft, setTimeLeft] = useState(30);

  const sendOTP = () => {
    console.log(mobile);
    if (mobile != 9786752313) {
      alert("Wrong Number Input");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      token: "717dc2d82d86be210bef206cf512dba9",
      mobile: mobile,
      action: "Signin_or_Signup",
      timestamp: 1652446231059
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(
      "https://agcare.platform.simplifii.com/api/v1/get_otp",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setTimeLeft(30);
        return navigate("/verify", { state: mobile });
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (location.state === null) {
      console.log("login nhi kia");

      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      console.log("TIME LEFT IS 0");
      setTimeLeft(null);
    }

    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const verifyOTP = () => {
    if (OTP != 260599) {
      alert("Wrong OTP");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: mobile,
      password: OTP,
      os: "ANDROID"
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(
      "https://agcare.platform.simplifii.com/api/v1/admin/authenticate",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result["msg"] === "Success") {
          return navigate("/home", { state: "Success" });
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="App">
      <h1 style={{ color: "#ffba40" }}>OTP Verification</h1>
      <p>OTP has been sent to +91 {mobile}</p>
      <input
        className="inputBox"
        type="number"
        value={OTP}
        onChange={(e) => setOTP(e.target.value)}
      />
      <br />
      <br />
      <button className="ctnBtn" onClick={verifyOTP}>
        Continue
      </button>

      <p>
        {timeLeft === null ? (
          <div onClick={sendOTP} style={{ cursor: "pointer" }}>
            Resend OTP
          </div>
        ) : (
          "00:" + timeLeft
        )}
      </p>
    </div>
  );
}
