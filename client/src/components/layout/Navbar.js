import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, withRouter } from 'react-router-dom';

// Actions
import { signIn, signOut } from '../../state/ducks/auth';

class Navbar extends PureComponent {
  signIn = () => {
    const { actions } = this.props;
    actions.signIn()
  }

  signOut = () => {
    const { actions } = this.props;
    actions.signOut()
  }

  render() {
    const { user } = this.props;

    return (
      <nav className="navbar">
        <div className="navbar-topbar">
          <h1 className="navbar-topbar__heading">GIFF</h1>
          {
            user ? (
              <span onClick={this.signOut} className="navbar-topbar__user">
              { user.displayName }
              <img className="navbar-topbar__image" src={user.profilePicture} alt="test"/>
              </span>
            ) : (
              <a href="#!" onClick={this.signIn} className="navbar-topbar__signin">
                Login
              </a>
            )
          }
        </div>
        <ul className="navbar-links">
          <li className="navbar-links__item">
            <NavLink to="/random" className="navbar-links__link">
              <i className="icon ion-ios-shuffle"></i> Random
            </NavLink>
          </li>
          <li className="navbar-links__item">
            <NavLink to="/trending" className="navbar-links__link">
              <i className="icon ion-ios-trending-up"></i> Trending
            </NavLink>
          </li>
          <li className="navbar-links__item">
            <NavLink to="/new" className="navbar-links__link">
              <i className="icon ion-ios-heart-empty"></i>Saved
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    signIn,
    signOut
  }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
