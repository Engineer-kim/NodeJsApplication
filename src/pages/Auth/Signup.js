import React, { Component } from 'react';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import { required, length, email } from '../../util/validators';
import Auth from './Auth';

class Signup extends Component {
  state = {
    signupForm: {
      email: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, email],
      },
      password: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })],
      },
      name: {
        value: '',
        valid: false,
        touched: false,
        validators: [required],
      },
    },
    formIsValid: false,
  };

  inputChangeHandler = (input, value) => {
    this.setState((prevState) => {
      const updatedInput = {
        ...prevState.signupForm[input],
        value: value,
        valid: prevState.signupForm[input].validators.every((validator) => validator(value)),
      };

      const updatedForm = {
        ...prevState.signupForm,
        [input]: updatedInput,
      };

      const formIsValid = Object.values(updatedForm).every((input) => input.valid);

      return {
        signupForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  inputBlurHandler = (input) => {
    this.setState((prevState) => ({
      signupForm: {
        ...prevState.signupForm,
        [input]: {
          ...prevState.signupForm[input],
          touched: true,
        },
      },
    }));
  };

  render() {
    const { signupForm, formIsValid } = this.state;

    return (
      <Auth>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (formIsValid) {
              this.props.onSignup(e, {
                signupForm: {
                  ...signupForm,
                  formIsValid: formIsValid, // formIsValid를 포함
                },
              });
            } else {
              console.error('SignupForm is invalid!');
            }
          }}
        >
          <Input
            id="email"
            label="Your E-Mail"
            type="email"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={() => this.inputBlurHandler('email')}
            value={signupForm.email.value}
            valid={signupForm.email.valid}
            touched={signupForm.email.touched}
          />
          <Input
            id="name"
            label="Your Name"
            type="text"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={() => this.inputBlurHandler('name')}
            value={signupForm.name.value}
            valid={signupForm.name.valid}
            touched={signupForm.name.touched}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={() => this.inputBlurHandler('password')}
            value={signupForm.password.value}
            valid={signupForm.password.valid}
            touched={signupForm.password.touched}
          />
          <Button design="raised" type="submit" loading={this.props.loading} disabled={!formIsValid}>
            Signup
          </Button>
        </form>
      </Auth>
    );
  }
}

export default Signup;
