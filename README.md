# Github Browser - WC
## Possible improvements

- Add more rigorous tests
- Replace antd icons for a more lightweight lib
- Add animations to improve UX. (react-spring)
- Fetch more data at once so loading the next batch of data is more responsive

## Issues

- Pagination active state not working properly when accessing repo page URL. E.g. ```/user/williamchou06/repositories/5```

## Notes

- redux was not used due to the simplicity of the app.
- Functional components and hooks were used instead of class components.
- Certain aspects of the app couldn't be optimized due to the nature of GitHub's API.

## Links
- **Live Demo:** https://github-browser-wc.herokuapp.com