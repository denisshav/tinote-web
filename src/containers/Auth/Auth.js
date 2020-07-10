import React from "react"
import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import validator from "validator"
import classes from "./Auth.module.css"
import * as actions from "../../store/actions/index"
import { connect } from "react-redux"
import { Redirect } from "react-router"
import Spinner from "../../components/UI/Spinner/Spinner"

class Auth extends React.Component {
  state = {
    isEmailInvalid: false,
    isPasswordInvalid: false,
    isSignin: true,
    emailValue: "",
    passwordValue: "",
  }

  componentDidMount() {
    this.props.onCheckAuthState()
  }

  emailInputHandler = event => {
    if (!validator.isEmail(event.target.value)) {
      if (!this.state.isEmailInvalid) {
        this.setState({
          isEmailInvalid: true,
          emailValue: event.target.value,
        })
      }
    } else {
      if (this.state.isEmailInvalid) {
        this.setState({
          isEmailInvalid: false,
          emailValue: event.target.value,
        })
      }
    }
  }

  passwordInputHandler = event => {
    if (
      !validator.isLength(event.target.value, {
        min: 6,
        max: 24,
      })
    ) {
      this.setState({
        isPasswordInvalid: true,
        passwordValue: event.target.value,
      })
    } else {
      this.setState({
        isPasswordInvalid: false,
        passwordValue: event.target.value,
      })
    }
  }

  sumbitHandler = e => {
    e.preventDefault()

    if (!this.state.isEmailInvalid && !this.state.isPasswordInvalid) {
      if (this.state.isSignin) {
        this.props.onSignin(this.state.emailValue, this.state.passwordValue)
      } else {
        this.props.onSignup(this.state.emailValue, this.state.passwordValue)
      }
    }
  }

  switchModeHandler = e => {
    e.preventDefault()

    this.setState(prevState => {
      return {
        isSignin: !prevState.isSignin,
      }
    })
  }

  render() {
    let authRedirect = null
    if (this.props.isAuth) {
      authRedirect = <Redirect to="/tinote"></Redirect>
    }

    let form = <Spinner />

    if (!this.props.loading) {
      form = (
        <form onSubmit={this.sumbitHandler} className={classes.Auth}>
          <Input
            placeholder="Email"
            type="text"
            onInput={this.emailInputHandler}
            invalid={this.state.isEmailInvalid}
            error={this.state.isEmailInvalid ? "Invalid email" : null}
          />
          <Input
            placeholder="Password"
            type="password"
            onInput={this.passwordInputHandler}
            invalid={this.state.isPasswordInvalid}
            error={
              this.state.isPasswordInvalid
                ? "Password must be min 6 characters"
                : null
            }
          />
          <div className={classes.Buttons}>
            <Button type={"submit"}>
              {this.state.isSignin ? "Signin" : "Signup"}
            </Button>
            <Button type={"button"} clicked={this.switchModeHandler}>
              Switch to {this.state.isSignin ? "Signup" : "Signin"}
            </Button>
          </div>
        </form>
      )
    }

    return (
      <React.Fragment>
        {authRedirect}
        {form}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    loading: state.auth.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignin: (email, password) => dispatch(actions.signIn(email, password)),
    onSignup: (email, password) => dispatch(actions.signUp(email, password)),
    onCheckAuthState: () => dispatch(actions.checkAuthState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
