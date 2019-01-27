import { createAsyncAction } from 'helpers/redux';
import Fetch from 'helpers/fetch';

import $ from 'redux/types/apps';

export const fetchApps = () => 
  Fetch.get({
    path: `api/applications` , 
  });
