<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# Activity & POI web component

[![REUSE Compliance](https://github.com/noi-techpark/webcomp-activity-poi/actions/workflows/reuse.yml/badge.svg)](https://github.com/noi-techpark/odh-docs/wiki/REUSE#badges)
[![REUSE status](https://api.reuse.software/badge/github.com/noi-techpark/webcomp-activity-poi)](https://api.reuse.software/info/github.com/noi-techpark/webcomp-activity-poi)
[![CI](https://github.com/noi-techpark/webcomp-activity-poi/actions/workflows/main.yml/badge.svg)](https://github.com/noi-techpark/webcomp-activity-poi/actions/workflows/main.yml)

Web component that shows activities and points of interest of South Tyrol on a
map. Users can filter by ODH **Tags** (main categories with dynamic L2/L3
submenus) or by search text. Selecting a marker or list result opens the detail
panel.

Live demo: [web component store](https://webcomponents.opendatahub.com/webcomponent/0e5fbede-4a21-4dd3-bf85-7d2be71dfb12)

## Usage

Include `dist/bundle.js` and place the element:

```html
<odh-activity-poi
  lat="46.4983"
  lon="11.3548"
  zoom="10"
  radius="10000"
  language="en"
  showradius="false"
  categories="wellness relaxation,eating drinking,summer,winter,culture attractions,traffic and transport,shops and service providers,other"
  category-filter=""
  directions
></odh-activity-poi>
```

### Attributes

| Attribute | Description |
|-----------|-------------|
| `lat` / `lon` | Map center (required) |
| `zoom` | Initial map zoom |
| `radius` | Search radius in **meters**. Empty = no radius filter |
| `showradius` | `true` / `false` — draw the radius circle on the map |
| `language` | `en`, `de`, or `it` |
| `categories` | Comma-separated **main Tag Ids** shown in the picker. Defaults to the eight ODH main categories listed below |
| `category-filter` | Optional whitelist of Tag Ids (main, L2, or L3) to limit menu entries |
| `directions` | Presence flag for the “Get directions” control |
| `show-current-location` | Show a marker at the map center coordinates |
| `marker-color` | Color for the current-location marker |

### Default main categories (Tag Ids)

- `wellness relaxation`
- `eating drinking`
- `summer`
- `winter`
- `culture attractions`
- `traffic and transport`
- `shops and service providers`
- `other`

Submenus (L2 and L3) are built from the Tourism Tag API in one request
(`validforentity=odhactivitypoi`). Filtering uses the Content API `tagfilter`
parameter with the selected Tag Ids, comma-separated.

### APIs

- Content API: `https://tourism.api.opendatahub.com/`
- Tags: `/v1/Tag`
- Activities / POIs: `/v1/ODHActivityPoi`

### Map / Geo API note

The Geo API (MapLibre vector tiles at `https://geo.api.opendatahub.com`) is a
good option for large result sets, but tile features currently expose only
`id` / name / cluster fields — **not** category tags. That makes it impractical
to keep this component’s per-category marker icons without extra Tourism API
lookups per feature. This build therefore keeps **Leaflet + Tourism JSON** so
icons, search list, detail panel, GPX tracks, and radius stay in sync.

## Getting started

### Prerequisites

- Node.js **20** or **22**
- npm 10+

### Source code

```bash
git clone https://github.com/noi-techpark/webcomp-activity-poi
cd webcomp-activity-poi
npm install
npm run build
```

## Development

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

```bash
npm run build
```

Artifacts are written to `dist/` (`bundle.js` plus icons and assets).

## Docker environment

```bash
docker-compose run --rm app /bin/bash -c "npm install"
docker-compose up --build --detach
```

App is mapped to host port **8999** → container port 3000.

```bash
docker-compose run --rm app /bin/bash -c "npm run build"
docker-compose stop
```

## Information

### Support

[help@opendatahub.com](mailto:help@opendatahub.com)

### Contributing

See [Contributor Guidelines](https://github.com/noi-techpark/odh-docs/wiki/Contributor-Guidelines%3A-Getting-started) and [CONTRIBUTING.md](CONTRIBUTING.md).

### Documentation

[Open Data Hub docs](https://opendatahub.readthedocs.io/en/latest/index.html)

### Boilerplate

[webcomp-boilerplate](https://github.com/noi-techpark/webcomp-boilerplate)

### License

GNU Affero General Public License v3. See [LICENSE.md](LICENSE.md).

### REUSE

This project is [REUSE](https://reuse.software) compliant. See the
[NOI REUSE guidelines](https://github.com/noi-techpark/odh-docs/wiki/Guidelines-for-developers-and-licenses#guidelines-for-contributors-and-new-developers).

```bash
pip install pre-commit
pre-commit install
```
