# Web Payments Quickstart With ExpressJS


Quickstart for using Square's Web Payments SDK with ExpressJS

- [Web Payments SDK Overview](https://developer.squareup.com/docs/web-payments/overview).
- [API Documentation](https://developer.squareup.com/reference/sdks/web/payments).

## Getting Started

Start by cloning this repository.

```sh
git clone https://github.com/mykoman/square-api-with-expressjs
cd square-payment-express
```

Install [Node.js (>= v14)](https://nodejs.org/en/about/releases/) which will include `npm`. This repository contains an `.nvmrc` file if you use [`nvm`](https://github.com/nvm-sh/nvm) to manage your node versions.

Then, to install dependencies run:

```sh
npm install
```

Run the development server.

```sh
npm run dev
```

Finally, open [http://localhost:7000](http://localhost:000).

### Credentials

Before you can take a payment, you'll need to configure your developer credentials which can be found in the [Developer Dashboard](https://developer.squareup.com/apps).

Copy `.env.example`to `.env.sandbox`

```sh
cp .env.example .env.sandbox
```

Define `SQUARE_ACCESS_TOKEN` with your **Sandbox** Access Token from the Developer Dashboard.

```ini
SQUARE_ACCESS_TOKEN=eX@mpl3_t0k3n
```

Restart your server to use this new value.

_Remember: Do not add your access tokens to git!_

## Development

### Setup

When contributing to this project, you'll want to use Node v15 as defined by `.nvmrc` to take advantage of npm@7. You can use [nvm](https://github.com/nvm-sh/nvm) to install the correct version:

```sh
nvm install $(cat .nvmrc)
```

Follow the "Getting Started" instructions above to install dependencies and verify your local server starts properly.

