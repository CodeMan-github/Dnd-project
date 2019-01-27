import { createAsyncActionSelect } from 'helpers/reduxSelect';
import Fetch from 'helpers/fetch';

export const fetchDynamicSchema = (schemaName) => 
    Fetch.get({
        path: `api/getDynamicSchema/${schemaName}`,
    });

