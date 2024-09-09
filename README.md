# Concordia Directory

Search for faculty accross several fields at once, and receive instant results. Try it at [conudir.com](https://conudir.com/)

https://github.com/user-attachments/assets/fcdba45b-12ad-47b7-b7e1-7a6ad1f5ea72

Each query is compared against the name, title, department, email, phone number, and office of each faculty member.
The data is a direct copy of the records that can be fetched using [Concordia's own people search engine](https://www.concordia.ca/directories.html).

Unfortunately, at the time of writing, Concordia's people search suffers from the following issues:
- Frequent outages
- Fields must be searched individually
- Paging isn't automatic

These issues inspired the development of this third-party tool.
If you wish to report a bug, or if you have suggestions for further improvements, please create an [issue](https://github.com/mahutt/ConcordiaDirectory/issues).

## API

This project is a [React](https://react.dev) SPA built with [Vite](https://vitejs.dev) that makes API requests to an [Express](https://expressjs.com) backend.

The API is publicly available at `https://conudir.com/api/search`. Feel free to incorporate it into your own projects.
Here is a some quick documentation on querying for faculty via the Concordia Directory API:

- Search for faculty by some `query` / keyword by including it as a URL query parameter: `https://conudir.com/api/search?query=aiman`
- Limit the number of results by adding a `limit` query parameter: `https://conudir.com/api/search?query=hanna&limit=5`
- The above API request URL returns results 1 - 5 for the specified query. If instead you would like to retrieve results 6 - 10, you can specify an `offset` query parameter: `https://conudir.com/api/search?query=hanna&limit=5&offset=5`

## Contributing

Feel free to contribute to this project by opening a pull request.
Don't hesitate to reach out to me for guidance on setting up the development environment, as I have yet to write any documentation for this project.
