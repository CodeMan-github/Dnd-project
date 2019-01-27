export default class Fetch {
    static async fetch(options) {
        const {
            url = process.env.REACT_APP_API_ROOT,
            headers,
            method,
            body,
            path,
        } = options;

        let requestOptions = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'credentials': 'include',
                ...headers,
            },
            method,
        };

        if (body) {
            requestOptions.body = JSON.stringify(body);
        }

        // => check Authorization
        // if (ACCESS_TOKEN) {
        //     requestOptions.headers.Authorization: `Bearer ${ACCESS_TOKEN}`;
        // }

        // Fire the Request and Return the response promise Object
        try {
            const requestPromise = await fetch(new Request(`${url}${path}`, requestOptions));

            if (requestPromise && requestPromise.ok) {
                // Check ::: it can be not json, for example text/html
                return requestPromise.text().then(text => text
                    ? JSON.parse(text)
                    : body
                );
            } else {
                throw new Error(requestPromise.statusText);
            }
        } catch (error) {
            throw error;
        }
    }

    /* GET (retrieve) */
    static get = options => Fetch.fetch({ ...options, method: 'GET' });

    /* POST (create) */
    static post = options => Fetch.fetch({ ...options, method: 'POST' });

    /* PUT (update) */
    static put = options => Fetch.fetch({ ...options, method: 'PUT' });;

    /* DELETE (remove) */
    static delete = options => Fetch.fetch({ ...options, method: 'DELETE' });
}
