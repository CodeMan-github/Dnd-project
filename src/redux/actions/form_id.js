

import { createFormIdAsyncAction } from 'helpers/reduxform_id';
import $ from 'redux/types/form_id';
import Fetch from 'helpers/fetch';

  function getdata(form_id)
{
    var body =  {
      body: [{
        "form_id": "000",
        "name": "form_id"
      }]
    }
    return body;
}

  export const form_id = (form_id) => createFormIdAsyncAction(
  JSON.parse (form_id),
    $.FETCH_FORM_ID_REQUEST,
  );
  
