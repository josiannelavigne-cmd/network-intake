# TODO

## For The Next Technical Pass

- Convert the prototype to a small Vite + React project.
- Move React code out of browser-loaded Babel and into normal source files.
- Add `npm run dev` for local preview.
- Add `npm run build` to generate the production `dist/` folder.
- Update the GitHub Action to run the build before deploying.
- Change the FTPS deploy source from `./` to `./dist/`.
- Check whether Vite needs `base: '/network-intake/'` after deployment.
