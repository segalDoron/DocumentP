import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false,
            valid: {
                firstName: true,
                lastName: true,
                username: true,
                password: true
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
        user.firstName ? this.state.valid.firstName = true : this.state.valid.firstName = false;
        user.lastName ? this.state.valid.lastName = true : this.state.valid.lastName = false;
        user.username ? this.state.valid.username = true : this.state.valid.username = false;
        user.password ? this.state.valid.password = true : this.state.valid.password = false;
        this.setState({ valid: this.state.valid });

    }

    render() {
        const { registering } = this.props;
        const { user, submitted, valid } = this.state;
        const firstNameValid = valid.firstName ? '' : 'alert-validate';
        const lastNameValid = valid.lastName ? '' : 'alert-validate';
        const usernameValid = valid.username ? '' : 'alert-validate';
        const passwordValid = valid.password ? '' : 'alert-validate';
        const firstNameClass = 'wrap-input100 validate-input m-b-16 ' + firstNameValid;
        const lastNameClass = 'wrap-input100 validate-input m-b-16 ' + lastNameValid;
        const usernameClass = 'wrap-input100 validate-input m-b-16 ' + usernameValid;
        const passwordClass = 'wrap-input100 validate-input m-b-16 ' + passwordValid;
        return (
            <div>
                <div className="limiter" name="form" onSubmit={this.handleSubmit}>
                    <div className="container-login100">
                        <div className="wrap-login100 p-t-50 p-b-90">
                            <form className="login100-form validate-form flex-sb flex-w">
                                <span className="login100-form-title p-b-51">
                                    Register
					            </span>
                                <div className={firstNameClass} data-validate="First Name is required">
                                    <input className="input100" type="text" name="firstName" placeholder="First Name" onChange={this.handleChange} />
                                </div>
                                <div className={lastNameClass} data-validate="Last Name is required">
                                    <input className="input100" type="text" name="lastName" placeholder="First Name" onChange={this.handleChange} />
                                </div>
                                <div className={usernameClass} data-validate="User Name is required">
                                    <input className="input100" type="text" name="username" placeholder="User Name" onChange={this.handleChange} />
                                </div>
                                <div className={passwordClass} data-validate="Password is required">
                                    <input className="input100" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                                </div>

                                <div className="form-group" style={{ width: '100%' }}>
                                    <button className="login100-form-btn">Register</button>
                                    {registering &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                    <Link to="/login" className="btn btn-link">Cancel</Link>
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
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };