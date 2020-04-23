# ra-hasura-typescript-boilerplate

This admin application is used for integrating [Hasura backend typescript boilerplate](https://github.com/hgiasac/hasura-typescript-boilerplate/tree/auth-jwt
) with JWT authentication

## Prerequisites

- [React 16+](https://reactjs.org/)
- [React Admin](https://redux.js.org/)
- [Redux]((https://redux.js.org/))
- [Hasura data provider](https://github.com/Steams/ra-data-hasura-graphql)
- [Parcel](https://parceljs.org/)

## Development


```sh
npm start
# build source
npm run build
# build production
npm run build:prod
```

**Note**:

Sometimes there will have some error because of Parcel cache. To fix that, just run `npm run clean` or delete `.parcel-cache` folder and rerun