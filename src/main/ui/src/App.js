import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Header from './components/Header'
import Profile from './components/Profile';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Footer from "./components/Footer"
import Error from './components/Error'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import Alert from '@material-ui/lab/Alert';
var hash = require('string-hash');

const sections = [
    { title: 'Page 1', url: '/page1' },
    { title: 'Page 2', url: '/page2' },
    { title: 'Profile', url: '/profile' }
];

class App extends Component {

    state = {
        email: null,
        errorMessage: ""
    }

    componentDidMount() {
        const account = localStorage.getItem("account");
        var accountJSON = JSON.parse(account)
        const token = localStorage.getItem("token");


        if (token) {
            if(hash(accountJSON.password).toString() === token)
            {
                this.setState({email: JSON.parse(account).email});
            }
        }
    }

    isEmailLoggedIn = (pageName) => {
        if(this.state.email !== undefined && this.state.email !== null && this.state.email !== "")
        {
            if(pageName === "/")
            {
                return <div> <Profile email={this.state.email}/>
                    <Footer/> </div>
            }
            if(pageName === "page1")
            {
                return <div> <Page1 email={this.state.email}/>
                    <Footer/> </div>
            }
            else if(pageName === "page2")
            {
                return <div> <Page2 email={this.state.email}/>
                    <Footer/> </div>
            }
            else if(pageName === "profile")
            {
                return <div> <Profile email={this.state.email}/>
                    <Footer/> </div>
            }
            else
            {
                return <Error />
            }
        }
        else
        {
            return <SignIn onSubmit={this.handleSignInSubmit} resetError={this.resetError}/>
        }
    }

    resetError = () => {
        this.setState({errorMessage: ""})
    }

    handleSignUpSubmit = async (e, username, email, password) => {
        e.preventDefault();
        if(email !== "")
        {
            if(username !== "")
            {
                if(password !== "")
                {
                    var params = {username: username.trim(), email: email.toLowerCase().trim(), password: password}
                    var endpoint = "/api/account?"
                    var url = new URLSearchParams(params);

                    await fetch(endpoint + url, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                    }).then(async response => {
                        if(!response.ok)
                        {
                            const err = await response.json()
                            this.setState({errorMessage: err.message})
                        } else {
                            const data = await response.json()
                            this.setState({email: data.email});

                            // store the data in localStorage
                            localStorage.setItem('account', JSON.stringify(data))
                            localStorage.setItem('token',  hash(data.password))
                        }

                    })
                }
                else
                {
                    this.setState({errorMessage: "Valid password required"})
                }
            }
            else
            {
                this.setState({errorMessage: "Valid username required"})
            }
        }
        else
        {
            this.setState({errorMessage: "Valid email required"})
        }
    };

    handleSignInSubmit = async (e, email, password) => {
        e.preventDefault();
        if(email !== "")
        {
            var params = {email: email.toLowerCase().trim(), password: password}
            var endpoint = "/api/login?"
            var url = new URLSearchParams(params);

            await fetch(endpoint + url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            }).then(async response => {
                if(!response.ok)
                {
                    const err = await response.json()
                    this.setState({errorMessage: err.message})
                } else {
                    const data = await response.json()
                    // store the data in localStorage
                    localStorage.setItem('account', JSON.stringify(data))
                    localStorage.setItem('token',  hash(data.password))

                    this.setState({email: data.email});
                }

            })
        }
        else
        {
            this.setState({errorMessage: "Invalid email or password!"})
        }
    }


    handleLogout = () => {
        this.setState({'email': null})
        localStorage.clear();
        window.location = '/'
    };

    signinButton = () => {
        window.location = '/'
    }
    render() {

        return (
            <Router>
                <Header title="Your Website" sections={sections} email={this.state.email} signin={this.signinButton} signout={this.handleLogout}/>
                {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                <div className="App">
                    <Switch>
                        <Route exact path="/">
                            {this.isEmailLoggedIn("/")}
                        </Route>
                        <Route path="/signup">
                            <SignUp onSubmit={this.handleSignUpSubmit} resetError={this.resetError}/>
                        </Route>
                        <Route path="/page1">
                            {this.isEmailLoggedIn("page1")}
                        </Route>
                        <Route path="/page2">
                            {this.isEmailLoggedIn("page2")}
                        </Route>
                        <Route path="/profile">
                            {this.isEmailLoggedIn("profile")}
                        </Route>
                        <Route component={Error} />

                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;