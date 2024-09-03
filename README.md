# SF Food Truck Finder

## Project Goal

Develop a web application that allows users to find food trucks in San Francisco using a CSV dataset.

## Getting Started

This is a [Next.js App Router build](https://nextjs.org/docs/app).

## Deployment

The app is deployed on Vercel and can be accessed at [https://sf-food-truck.samfort.in/](https://sf-food-truck.samfort.in/). The production site is deployed automatically when a PR is merged into the `main` branch.

The staging site can be accessed at [https://sf-food-truck-staging.samfort.in/](https://sf-food-truck-staging.samfort.in/). The staging site is deployed automatically when a PR is merged into the `develop` branch.

## Testing

This app is setup to run Jest tests. To run the tests, run the following command:

```bash
npm run test
```

The Jest extension https://marketplace.cursorapi.com/items?itemName=Orta.vscode-jest is recommended for assistance with running tests.

## Debugging

You can debug the app by running the following command by makig sure the .vscode/launch.json file is set up correctly. In VSCode, you can run the Debugger by clicking the debug button in the sidebar, selecting one of the debug options, and then clicking the green play button.

## Linting

This app is setup to run ESLint. To run the linter, run the following command:

```bash
npm run lint
```

## Database and Environment Variables

This app is using a Postgres database to store the food truck data. The data is loaded from a CSV file and then stored in Postgres. The data is then queried using Postgres.

To bring in the evironment variables for the database locally, follow these steps.

1. You will need to first be a collaborator on the project.
2. Install the Vercel CLI `npm i -g vercel@latest`
3. Link the project `vercel link`
4. Pull the environment variables `vercel env pull .env.development.local`

Food Truck data is populated from the [https://data.sfgov.org/api/views/rqzj-sfat/rows.csv](https://data.sfgov.org/api/views/rqzj-sfat/rows.csv) API endpoint daily at 11 AM UTC via a cron job.

## Next steps:

### Features to Implement

1. **User Authentication**: Implement user authentication to allow users to save their favorite food trucks.
2. **Pagination**: Add pagination to the food truck table.
3. **Current Location**: Add a button to the food truck table to allow users to find food trucks near them.
4. **Favorite Food Trucks**: Add a page to view the user's favorite food trucks.

### Technical Debt

1. **Testing**: Increase test coverage, especially for critical components and API routes.
