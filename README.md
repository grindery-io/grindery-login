# Grindery Login

## Grindery Login Application Overview

Grindery Login is an interactive authentication application built with React and integrated with the Ethereum blockchain. This application serves as the central authentication mechanism for all [Grindery](https://www.grindery.com) apps, providing a streamlined user login and signup process.

Users from various Grindery applications are redirected to the Grindery Login app for sign-in or sign-up. Once the authentication process is completed, users are then seamlessly redirected back to the referring application.

The Grindery Login application interacts with the user's MetaMask wallet, manages the submission and confirmation of user emails, and handles user workspaces. It utilizes the power of Redux for state management, maintaining crucial application states like user tokens, workspaces, and the current status of the app.

Communication with the remote server is handled through the `NexusClient` library, providing a clean and straightforward API for server-side operations. The `Web3Modal` library is used for the integration with MetaMask, the user's Ethereum wallet.

## Getting Started

To get started with the Grindery Login application:

1. Clone the repository to your local machine.
2. Install the necessary dependencies using either `npm install` or `yarn install`.
3. Start the application in development mode with `npm start` or `yarn start`.

## Deployment

Commits to the `main` branch of the repository will be automatically deployed to the production environment. You can access the production application at [login.grindery.com](https://login.grindery.com).

Commits to the `staging` branch will be deployed to the staging environment. The staging application can be accessed at [login-staging.grindery.com](https://login-staging.grindery.com).

## Config Options

Config options can be specified via URL query parameters. The following options are available:

- `redirect_uri`: The URL of the app where the user should be redirected after successfully signing in.
- `workspaceRequired`: If set to `1`, the user will have to select a specific workspace from the list of user's workspaces to complete authentication.
- `response_type`: Set to `code` to get authentication code in response. Optional.
- `state`: Optional state parameter. Will be send in response.

## License

The Grindery Login application is licensed under the [MIT license](https://choosealicense.com/licenses/mit/).
