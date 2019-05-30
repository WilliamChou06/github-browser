# Github Browser - WC
## Possible improvements

- Add more rigorous tests
- Replace antd icons for a more lightweight lib
- Add animations to improve UX. (react-spring)
- Fetch more data at once so loading the next batch of data is more responsive
- Convert UserList component to class component in order to use setState synchronously for apiIndex functions more easily and deal with duplicated array values.

## Issues

- Pagination active state not working properly when accessing repo page URL. E.g. ```/user/williamchou06/repositories/5```
- UserList navigation gets "stuck" when clicking them too fast. This has to do with two concurrent useState calls overlapping.

## Notes

- redux was not used due to the simplicity of the app.
- Functional components and hooks were used instead of class components.
- Certain aspects of the app couldn't be optimized due to the nature of GitHub API.
- GitHub API's user IDs are not in successive increments. E.g. ```1, 2, 3, 4, 5, 6```

## Links
- **Live Demo:** https://github-browser-wc.herokuapp.com