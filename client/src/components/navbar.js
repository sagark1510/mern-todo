import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser} from '../actions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const {isAuthenticated, user} = this.props;
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="my-0 mr-md-auto font-weight-normal">TODO LIST HCL</h5>
        {isAuthenticated ? (
          <nav className="my-2 my-md-0 mr-md-3">
            Welcome {user.name}
            <a
              className="btn btn-outline-primary ml-3"
              onClick={this.onLogoutClick.bind(this)}
            >
              Logout
            </a>
          </nav>
        ) : null}
        {!isAuthenticated ? (
          <Link className="btn btn-outline-primary mr-1" to="/login">
            Login
          </Link>
        ) : null}
        {!isAuthenticated ? (
          <Link className="btn btn-outline-primary" to="/register">
            Sign up
          </Link>
        ) : null}
      </div>
    );
  }
}

const mapStatesToProps = ({auth}) => ({
  isAuthenticated: auth.isAuthenticated,
  user: auth.user,
});

export default connect(
  mapStatesToProps,
  {logoutUser},
)(Navbar);
