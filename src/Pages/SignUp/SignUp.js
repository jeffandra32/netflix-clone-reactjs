import "./SignUp.scss";

import { CreateUserProfileDocument, auth } from "../../Firebase/firebase.utils";

import Background from "../../Assets/Background.jpg";
import CustomButton from "../../Components/CustomButton/CustomButton";
import FormInput from "../../Components/FormInput/FormInput";
import { Link } from "react-router-dom";
import React from "react";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("A Senha não é igual!");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await CreateUserProfileDocument(user, { displayName });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="signup">
        <div
          className="signup__bg"
          style={{ backgroundImage: `url(${Background})` }}
        />
        <div className="signup__container">
          <div className="signup__shadow">
            <h1 className="signup__title">Sign Up</h1>

            <form action="POST" onSubmit={this.handleSubmit}>
              <FormInput
                name="displayName"
                type="name"
                value={displayName}
                handleChange={this.handleChange}
                label="Name"
                required
              />

              <FormInput
                name="email"
                type="email"
                value={email}
                handleChange={this.handleChange}
                label="Email"
                required
              />

              <FormInput
                name="password"
                type="password"
                value={password}
                handleChange={this.handleChange}
                label="Password"
                required
              />

              <FormInput
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                handleChange={this.handleChange}
                label="Confirm Password"
                required
              />

              <div className="signup__btn-container">
                <div className="signup__btn">
                  <CustomButton type="submit"> Registrar </CustomButton>
                </div>
              </div>
            </form>
            <div className="signup__option">
              <span className="signup__option--newuser">
                Já tem cadastro?
              </span>
              <Link to="/signin" className="signup__option--link">
                Logar agora.
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
