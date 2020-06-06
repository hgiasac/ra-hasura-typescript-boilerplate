# ra-hasura-typescript-boilerplate

## Prerequisites

- [React 16+](https://reactjs.org/)
- [React Admin](https://redux.js.org/)
- [Redux](https://redux.js.org/)
- [Hasura data provider](https://github.com/Steams/ra-data-hasura-graphql)
- [Webpack](https://webpack.js.org/)

## Templates

I define multiple templates into branches. You can checkout template that  fit your use case:

- [auth-jwt](https://github.com/hgiasac/ra-hasura-typescript-boilerplate/tree/auth-jwt)
- [auth-firebase](https://github.com/hgiasac/ra-hasura-typescript-boilerplate/tree/auth-firebase)

For backend templates, go here: https://github.com/hgiasac/hasura-typescript-boilerplate

## Development

Copy `dotenv` to `.env` and edit your environemnt variables

```sh
npm run dev
# build source 
# This is used for test/staging build, so we don't optimize it 
sh ./scripts/build.sh
# build production locally
sh ./scripts/build.sh prod
# build on CI env
sh ./scripts/build.sh ci
# build on CI env
sh ./scripts/build.sh ci-prod
```

## CHANGELOG

[Read here](CHANGELOG.md)
