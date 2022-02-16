# Activity & POI web component

[![REUSE status](https://api.reuse.software/badge/github.com/noi-techpark/webcomp-activity-poi)](https://api.reuse.software/info/github.com/noi-techpark/webcomp-activity-poi)
[![CI](https://github.com/noi-techpark/webcomp-activity-poi/actions/workflows/ci.yml/badge.svg)](https://github.com/noi-techpark/webcomp-activity-poi/actions/workflows/ci.yml)

This is a web component that can be integrated in other software (for example
websites) to show the activities and point of interests of South Tyrol. They are
shown on a map and they can be filtered based on the category or a search term.
Each point of interest/activity has a corresponding marker on the map and its
details are displayed when it is clicked on it.

Do you want to see it in action? Go to our [web component store](https://webcomponents.opendatahub.bz.it/webcomponent/0e5fbede-4a21-4dd3-bf85-7d2be71dfb12)!

- [Activity & POI web component](#activity--poi-web-component)
  - [Usage](#usage)
    - [Attributes](#attributes)
      - [lat](#lat)
      - [lon](#lon)
      - [radius](#radius)
      - [language](#language)
      - [categories](#categories)
      - [directions](#directions)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Source code](#source-code)
    - [Dependencies](#dependencies)
    - [Build](#build)
  - [Development](#development)
  - [Deployment](#deployment)
  - [Docker environment](#docker-environment)
    - [Installation](#installation)
    - [Dependenices](#dependenices)
    - [Start and stop the containers](#start-and-stop-the-containers)
    - [Running commands inside the container](#running-commands-inside-the-container)
  - [Information](#information)
    - [Support](#support)
    - [Contributing](#contributing)
    - [Documentation](#documentation)
    - [Boilerplate](#boilerplate)
    - [License](#license)


## Usage

Include the webcompscript file `dist/bundle.js` in your HTML and define the web
component like this for example:

```html
<odh-activity-poi
  lat="46.4983"
  lon="11.3548"
  zoom="10"
  radius="10000"
  language="en"
  showradius="false"
  category-filter=""
  directions
></odh-activity-poi>
```

### Attributes

#### lat

Latitude of the center of the map

Type: int

#### lon

Longitude of the center of the map

Type: int

#### radius

Map radius (km)

Type: int

#### language

Language

Type: string
Options: "en","de","it"

#### categories

Categories to show

Type: string
Options: "All categories","Winter", "Wellness Entspannung","Verkehr und Transport",
"Sommer","Mobilitaet","Kultur und Sehenswuerdigkeiten","Geschaefte und Dienstleister",
"Essen Trinken","Anderes"

#### directions

Activate 'Get directions' button

Type: null (exists or is absent, no value allowed)

## Getting started

These instructions will get you a copy of the project up and running
on your local machine for development and testing purposes.

### Prerequisites

To build the project, the following prerequisites must be met:

- ToDo: Check the prerequisites
- Node 12 / NPM 6

For a ready to use Docker environment with all prerequisites already installed
and prepared, you can check out the [Docker environment](#docker-environment)
section.

### Source code

Get a copy of the repository:

```bash
git clone https://github.com/noi-techpark/webcomp-activity-poi
```

Change directory:

```bash
cd ActivityPOIWebcomponent/
```

### Dependencies

Download all dependencies:

```bash
npm install
```

### Build

```bash
npm run build
```

## Development

In order to serve the application locally, execute the following command

```bash
npm run start
```

Then, access to localhost:3000 from your browser.

## Deployment

To create the distributable files, execute the following command:

```bash
npm run build
```

## Docker environment

For the project a Docker environment is already prepared and ready to use with all necessary prerequisites.

These Docker containers are the same as used by the continuous integration servers.

### Installation

Install [Docker](https://docs.docker.com/install/) (with Docker Compose) locally on your machine.

### Dependenices

First, install all dependencies:

```bash
docker-compose run --rm app /bin/bash -c "npm install"
```

### Start and stop the containers

Before start working you have to start the Docker containers:

```
docker-compose up --build --detach
```

After finished working you can stop the Docker containers:

```
docker-compose stop
```

### Running commands inside the container

When the containers are running, you can execute any command inside the environment. Just replace the dots `...` in the following example with the command you wish to execute:

```bash
docker-compose run --rm app /bin/bash -c "..."
```

Some examples are:

```bash
docker-compose run --rm app /bin/bash -c "npm run test"
```

## Information

### Support

For support, please contact [help@opendatahub.bz.it](help@opendatahub.bz.it),
[d@vide.bz](mailto:d@vide.bz) or [chiara@huprocess.com](mailto:chiara@huprocess.com).

### Contributing

If you'd like to contribute, please follow the following instructions:

- Fork the repository.

- Checkout a topic branch from the `development` branch.

- Make sure the tests are passing.

- Create a pull request against the `development` branch.

A more detailed description can be found here: [https://github.com/noi-techpark/documentation/blob/master/contributors.md](https://github.com/noi-techpark/documentation/blob/master/contributors.md).

### Documentation

More documentation can be found at [https://opendatahub.readthedocs.io/en/latest/index.html](https://opendatahub.readthedocs.io/en/latest/index.html).

### Boilerplate

The project uses this boilerplate: [https://github.com/noi-techpark/webcomp-boilerplate](https://github.com/noi-techpark/webcomp-boilerplate).

### License

The code in this project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE Version 3 license. See the [LICENSE.md](LICENSE.md) file for more information.
