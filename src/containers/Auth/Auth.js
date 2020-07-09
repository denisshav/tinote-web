import React from "react"
import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import validator from 'validator'
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
    passwordValue: ""
  }

  componentDidMount() {
    this.props.onCheckAuthState()
  }

  emailInputHandler = event => {
    if (!validator.isEmail(event.target.value)) {
      if(!this.state.isEmailInvalid) {
        this.setState({
          isEmailInvalid: true,
          emailValue: event.target.value
        })
      }
    } else {
      if(this.state.isEmailInvalid) {
        this.setState({
          isEmailInvalid: false,
          emailValue: event.target.value
        })
      }
    }
    // console.log(event.target.value)
  }

  passwordInputHandler = event => {
    if (!validator.isLength(event.target.value, {
      min:6, max: 24
    })) {
     
        this.setState({
          isPasswordInvalid: true,
          passwordValue: event.target.value
        })
      
    } else {

        this.setState({
          isPasswordInvalid: false,
          passwordValue: event.target.value
        })
      
    }
    // console.log(event.target.value)
  }

  sumbitHandler = (e) => {
    e.preventDefault()
    // console.log(this.state.emailValue)
    // console.log(this.state.passwordValue)
    if (!this.state.isEmailInvalid && !this.state.isPasswordInvalid) {
      if (this.state.isSignin) {
        // console.log(e)
        this.props.onSignin(this.state.emailValue, this.state.passwordValue)
      } else {
        // console.log(33)
        this.props.onSignup(this.state.emailValue, this.state.passwordValue)
      }
    }
   
  }

  switchModeHandler = (e) => {
    e.preventDefault()
    // console.log(123)
    this.setState(prevState => {
      return {
        isSignin: !prevState.isSignin
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
        <div>

        <form onSubmit={this.sumbitHandler}>
                <Input 
                  placeholder="Email"
                  type="text"
                  onInput={this.emailInputHandler}
                  invalid={this.state.isEmailInvalid} />
                <Input 
                  placeholder="Password"
                  type="password"
                  onInput={this.passwordInputHandler}
                  invalid={this.state.isPasswordInvalid} />
                <Button />
              </form>
              <Button
              clicked={this.switchModeHandler}>
                Switch to {this.state.isSignin ? "Signup" : "Signin"}
              </Button>
        </div>
      )
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {form}
        </div>
    )  
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    loading: state.auth.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignin: (email, password) => dispatch(actions.signIn(email, password)),
    onSignup: (email, password) => dispatch(actions.signUp(email, password)),
    onCheckAuthState: () => dispatch(actions.checkAuthState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
