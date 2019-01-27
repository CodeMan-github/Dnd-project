import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const authUrl = `
https://login.microsoftonline.com/common/oauth2/v2.0/authorize?
  client_id=${process.env.REACT_APP_OAUTH_CLIENT_ID}
  &response_type=id_token+token
  &scope=openid
  &redirect_uri=http://localhost:3000/auth
  &response_mode=fragment
  &nonce=
`;

const Sender = ({
  render,
  nonce
}) => (
  <Fragment>
    {render(authUrl+nonce)}
  </Fragment>
);

Sender.propTypes = {
  render: PropTypes.func.isRequired,
};

export default Sender;
