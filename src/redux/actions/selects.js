import { createAsyncActionSelect } from 'helpers/reduxSelect';
import Fetch from 'helpers/fetch';

export const fetchSelectData = (selectId) => 
    Fetch.get({
        path: `api/getDynamicDataTable/${selectId}`,
    });

