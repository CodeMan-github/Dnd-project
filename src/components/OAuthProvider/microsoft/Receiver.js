import { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

@withRouter
export default class  extends PureComponent {

  componentDidMount() {
    const {
      location: { hash },
      onSuccess,
      onError,
    } = this.props;

    const queryParams = queryString.parse(hash);

    queryParams
      ? onSuccess(queryParams)
      : onError('Access code is not provided');
  }

  render () {
    return null;
  }
}
