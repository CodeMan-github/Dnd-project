import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { sendAuthData, logout } from 'redux/actions/auth';

import { OAuthReceiver } from 'components/OAuthProvider';

const mapStateToProps = null;
const mapDispatchToProps = { sendAuthData, logout };

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class extends PureComponent {

  handleAccessCode = async authData => {
    await this.props.sendAuthData(authData);
    this.props.history.push('/sections');
  };

  handleError = () => this.props.logout();

  render() {
    return (
      <OAuthReceiver
        provider="microsoft"
        onSuccess={this.handleAccessCode}
        onError={this.handleError}
      />
    );
  }
}
