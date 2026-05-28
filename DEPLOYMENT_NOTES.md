# Deployment Notes for Agent

This repository is currently a static prototype: plain HTML/CSS/assets with browser-loaded React/Babel in `intake-preview.html`.

## Current GitHub Actions Setup

The repo includes `.github/workflows/deploy.yml`, which deploys on every push to `main` and can also be run manually from the GitHub Actions tab.

Required GitHub Actions secrets:

- `FTP_SERVER`: `ftp.blacheyong.com`
- `FTP_USERNAME`: FTP username
- `FTP_PASSWORD`: FTP password

Current remote deploy path:

```text
/bell.blacheyong.com/network-intake/
```

## Suggested Future Improvement: Vite

The prototype currently loads React and Babel from external CDNs at runtime. That is fine for a quick design prototype, but a small Vite setup would be more reliable because it would:

- bundle React locally;
- avoid browser-side Babel compilation;
- produce static deployable files;
- make local preview easier for non-technical users with one command.

Vite normally creates a `dist/` folder. If the project is converted to Vite, the GitHub Action must deploy `dist/` instead of the repository root.

The deploy step should change from:

```yaml
local-dir: ./
```

to:

```yaml
local-dir: ./dist/
```

The workflow would also need install/build steps before deployment:

```yaml
- name: Checkout
  uses: actions/checkout@v6

- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: npm

- name: Install dependencies
  run: npm ci

- name: Build
  run: npm run build

- name: Sync files
  uses: SamKirkland/FTP-Deploy-Action@v4.4.0
  with:
    server: ${{ secrets.FTP_SERVER }}
    username: ${{ secrets.FTP_USERNAME }}
    password: ${{ secrets.FTP_PASSWORD }}
    protocol: ftps
    local-dir: ./dist/
    server-dir: /bell.blacheyong.com/network-intake/
```

If the site is served from `/network-intake/`, Vite may also need this in `vite.config.js`:

```js
export default {
  base: '/network-intake/',
};
```

Only add that if built asset URLs break after deployment.

