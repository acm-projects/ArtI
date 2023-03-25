import Button from "./Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import {Row} from 'react-bootstrap'

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    cpassword: "",
  });

  // console.log(formData);

  function handleChange(event) {
    // const {name, value, type, checked} = event.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);

    if (formData.password === formData.cpassword) {
      console.log("Successfully signed up!");
    } else {
      console.log("Passwords do not match."); //if passwords do not match, cannot sign up
      return;
    }
    console.log("submitted");
  }

  return (
    <>
      <Row>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-ctrl">
            <h2>Sign Up.</h2>
            <div className="form-floating input-wrapper">
              <input
                type="email"
                className="form-control"
                placeholder="email address"
                onChange={handleChange}
                name="email"
                id="email"
                value={formData.email}
              />
              <label htmlFor="email">email address</label>
            </div>

            <div className="form-floating input-wrapper">
              <input
                type="text"
                className="form-control"
                placeholder="first name"
                onChange={handleChange}
                name="firstname"
                id="firstname"
                value={formData.firstname}
              />
              <label htmlFor="firstname">first name</label>
            </div>

            <div className="form-floating input-wrapper">
              <input
                type="text"
                className="form-control"
                placeholder="last name"
                onChange={handleChange}
                name="lastname"
                id="lastname"
                value={formData.lastname}
              />
              <label htmlFor="lastname">last name</label>
            </div>

            <div className="form-floating input-wrapper">
              <input
                type="text"
                className="form-control"
                placeholder="username"
                onChange={handleChange}
                name="username"
                id="username"
                value={formData.username}
              />
              <label htmlFor="username">username</label>
            </div>

            <div className="form-floating input-wrapper">
              <input
                type="text"
                className="form-control"
                placeholder="password"
                onChange={handleChange}
                name="password"
                id="password"
                value={formData.password}
              />
              <label htmlFor="password">password</label>
            </div>

            <div className="form-floating input-wrapper">
              <input
                type="text"
                className="form-control"
                placeholder="confirm password"
                onChange={handleChange}
                name="cpassword"
                id="cpassword"
                value={formData.cpassword}
              />
              <label htmlFor="cpassword">confirm password</label>
            </div>

            <Button
              text="Sign Up."
              style={{ backgroundColor: "#9d9d9d", borderRadius: "50px" }}
            />

            <Link to="/">Go Back</Link>
          </div>
        </form>
      </Row>
    </>
  );
};

export default SignUp;
