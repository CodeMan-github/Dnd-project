import React from 'react';

import { MicrosoftSender, MicrosoftReceiver } from './microsoft';

export const OAuthSender = ({ provider, ...props }) => {
  switch(provider) {
    case 'microsoft':
      return <MicrosoftSender {...props}/>;
    default:
      return null;
  }
};

export const OAuthReceiver = ({ provider, ...props }) => {
  switch(provider) {
    case 'microsoft':
      return <MicrosoftReceiver {...props}/>;
    default:
      return null;
  }
};
