# Outlays Notion Sync

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using Pnpm

Install it using `npm i -g pnpm`

- Run `pnpm i` to install the project dependencies
- Run `pnpm deploy-sls` to deploy this stack to AWS

### Locally

In order to test the functions locally, run the following command to raise a local AWS instance using serverless-offline:

- `pnpm dev`

## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas
- `interfaces` - containing code base for interfaces that lambda functions need
- `services` - containing code base for API connections and services for lambda functions

```
.
├── src
│   ├── functions                                 # Lambda configuration and source code folder
│   │   ├── authorizer
│   │   │   ├── handler.ts                        # `Authorizer` lambda source code
│   │   │   ├── index.ts                          # `Authorizer` lambda Serverless configuration
│   │   ├── outlays
│   │   │   ├── handler.ts                        # `Create Outlay` lambda source code
│   │   │   ├── index.ts                          # `Create Outlay` lambda Serverless configuration
│   │   │   └── schema.ts                         # `Create Outlay` lambda input event JSON-Schema
│   │   │
│   │   └── index.ts                              # Import/export of all lambda configurations
│   │
│   ├── libs                                      # Lambda shared code
│   │   └── apiGateway.ts                         # API Gateway specific helpers
│   │   └── handlerResolver.ts                    # Sharable library for resolving lambda handlers
│   │   └── lambda.ts                             # Lambda middleware
│   │
│   ├── interfaces                                # Lambda shared interfaces
│   │   └── dtos                                  # Lambda Data Transfer Objects
│   │       └── create-outlay-dto.ts              # Data Transfer Object to create an outlay.
│   │
│   └── services                                  # API clients and services used by Lambdas
│       ├── notion                                # Notion Service
│           ├── client.ts                         # Notion API Client
│           ├── create-card-payment-page.ts       # Service function to create a card payment page.
│           ├── create-outlay-page.ts             # Service function to create an outlay page.
│           ├── create-year-page.ts               # Service function to create a year page.
│           └── utils.ts                          # Utility functions used by service functions.
│
├── package.json
├── serverless.ts                                 # Serverless service file
├── tsconfig.json                                 # Typescript compiler configuration
├── tsconfig.paths.json                           # Typescript paths
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file

### Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`
