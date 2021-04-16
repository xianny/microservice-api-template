# 0x Microservice API Template

## Quick Start
```
yarn install && yarn build && yarn start
```

## Development

Authenticate your Docker daemon with AWS ECR (one-time only):
```
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin {account}.dkr.ecr.us-east-1.amazonaws.com
```
More info: https://docs.aws.amazon.com/AmazonECR/latest/userguide/registry_auth.html


Run the dependencies:
```
docker-compose up
```

Start the API instance:

```
yarn start:dev
```

## Documentation

Docs are auto-generated from comments and typings. They are served at `/docs`.
To change settings or add custom components, edit `swaggerConfig.json`.

## Testing

Unit tests:
```
yarn test
```

You can create a new service in Assertible and import the OpenAPI spec to automatically create smoke tests. 

## Deployment

See the `drone.yml` file. 

## Configuration

Config options are picked up from environment variables by `dotenv`.
