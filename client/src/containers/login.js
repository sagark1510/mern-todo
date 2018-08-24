import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit(e) {
    e.preventDefault();
    const {...user} = this.state;
    this.props.loginUser(user, this.props.history);
  }
  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="col col-lg-6 card">
          <h1>Login</h1>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              {this.props.authenticating ? 'Authenticating' : null}
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({auth}) => ({
  authenticating: auth.authenticating,
  error: auth.loginError,
  isAuthenticated: auth.isAuthenticated,
});

export default connect(
  mapStatesToProps,
  {loginUser},
)(Login);
