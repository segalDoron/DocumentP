import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false,
            valid: {
                name: true,
                password: true
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }

        username ? this.state.valid.name = true : this.state.valid.name = false;
        password ? this.state.valid.password = true : this.state.valid.password = false;
        this.setState({ valid: this.state.valid });

    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted, valid } = this.state;
        const userValid = valid.name ? '' : 'alert-validate';
        const passwordValid = valid.password ? '' : 'alert-validate';
        const userClass = 'wrap-input100 validate-input m-b-16 ' + userValid;
        const passwordClass = 'wrap-input100 validate-input m-b-16 ' + passwordValid;

        return (
            <div>        
                <div className="limiter" name="form" onSubmit={this.handleSubmit}>
                    <div className="container-login100">
                        <div className="wrap-login100 p-t-50 p-b-90">
                            <form className="login100-form validate-form flex-sb flex-w">
                                <span className="login100-form-title p-b-51">
                                    Login
					            </span>


                                <div className={userClass} data-validate="Username is required">
                                    <input className="input100" type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                                    <span className="focus-input100"></span>
                                </div>


                                <div className={passwordClass} data-validate="Password is required">
                                    <input className="input100" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="form-group container-login100-form-btn m-t-17">
                                    <button className="login100-form-btn">
                                        Login
						        </button>
                                    <Link to="/register" className="btn btn-link">Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>           
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 