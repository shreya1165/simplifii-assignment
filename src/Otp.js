import React from "react";
import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Otp() {
  let navigate = useNavigate();
  const [mobile, setMobile] = useState("");
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
        return navigate("/verify", { state: mobile });
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="App">
      <div>
        <img style={{ margin: "50px" }} src={require("./Logo.jpeg")} />
        <input
          className="inputBox"
          placeholder="Enter Mobile No"
          type="number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <br />
        <br />
        <button className="ctnBtn" onClick={sendOTP}>
          Continue
        </button>
      </div>
    </div>
  );
}
