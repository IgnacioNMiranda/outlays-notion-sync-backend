import type { AWS } from '@serverless/typescript'

import outlays from '@functions/outlays'
import customLambdaAuthorizer from '@functions/authorizer'

const serverlessConfiguration: AWS = {
  service: 'outlays-notion-sync-backend',
  frameworkVersion: '3',
  useDotenv: true,
  // plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-associate-waf'],
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: ['${self:provider.stage}-api-key'],
    },
    stage: '${opt:stage, "dev"}',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      NOTION_ACCESS_TOKEN: '${file(.env.yml):NOTION_ACCESS_TOKEN}',
      NOTION_NAME_PROPERTY_KEY: '${file(.env.yml):NOTION_NAME_PROPERTY_KEY}',
      NOTION_DATE_PROPERTY_KEY: '${file(.env.yml):NOTION_DATE_PROPERTY_KEY}',
      NOTION_TAGS_PROPERTY_KEY: '${file(.env.yml):NOTION_TAGS_PROPERTY_KEY}',
      NOTION_PRICE_PROPERTY_KEY: '${file(.env.yml):NOTION_PRICE_PROPERTY_KEY}',
      NOTION_PAYMENT_METHOD_PROPERTY_KEY: '${file(.env.yml):NOTION_PAYMENT_METHOD_PROPERTY_KEY}',
      NOTION_PURCHASE_YEAR_PROPERTY_KEY: '${file(.env.yml):NOTION_PURCHASE_YEAR_PROPERTY_KEY}',
      NOTION_CARD_PAYMENTS_PROPERTY_KEY: '${file(.env.yml):NOTION_CARD_PAYMENTS_PROPERTY_KEY}',
      NOTION_OUTLAYS_DATABASE_ID: '${file(.env.yml):NOTION_OUTLAYS_DATABASE_ID}',
      NOTION_YEARS_DATABASE_ID: '${file(.env.yml):NOTION_YEARS_DATABASE_ID}',
      NOTION_YEARS_NAME_PROPERTY_KEY: '${file(.env.yml):NOTION_YEARS_NAME_PROPERTY_KEY}',
      NOTION_CARD_PAYMENTS_DATABASE_ID: '${file(.env.yml):NOTION_CARD_PAYMENTS_DATABASE_ID}',
      NOTION_CARD_PAYMENTS_NAME_PROPERTY_KEY: '${file(.env.yml):NOTION_CARD_PAYMENTS_NAME_PROPERTY_KEY}',
      NOTION_CREDIT_CHARGE_DAY: '${file(.env.yml):NOTION_CREDIT_CHARGE_DAY}',
      AUTH_TOKEN: '${file(.env.yml):AUTH_TOKEN}',
    },
  },
  // import the function via paths
  functions: { outlays, customLambdaAuthorizer },
  package: { individually: true },
  // resources: {
  //   Resources: {
  //     WAFRegionalWebACL: {
  //       Type: 'AWS::WAFv2::WebACL',
  //       Properties: {
  //         Name: 'ApiGateway-HTTP-Flood-Prevent-Auto-${self:provider.stage}',
  //         Scope: 'REGIONAL',
  //         Description: 'WAF Regional Web ACL to Prevent HTTP Flood DDos Attack',
  //         DefaultAction: {
  //           Allow: {},
  //         },
  //         VisibilityConfig: {
  //           SampledRequestsEnabled: true,
  //           CloudWatchMetricsEnabled: true,
  //           MetricName: 'ApiGateway-HTTP-Flood-Prevent-Metric',
  //         },
  //         Rules: [
  //           {
  //             Name: 'HTTP-Flood-Prevent-Rule',
  //             Priority: 0,
  //             Action: {
  //               Block: {},
  //             },
  //             VisibilityConfig: {
  //               SampledRequestsEnabled: true,
  //               CloudWatchMetricsEnabled: true,
  //               MetricName: 'HTTP-Flood-Prevent-Rule-Metric',
  //             },
  //             Statement: {
  //               RateBasedStatement: {
  //                 AggregateKeyType: 'IP',
  //                 Limit: 2000,
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   },
  // },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    // associateWaf: {
    //   name: '${self:resources.Resources.WAFRegionalWebACL.Properties.Name}',
    //   // Ref: https://stackoverflow.com/questions/67703857/using-aws-waf-with-serverless-associate-waf
    //   version: 'V2',
    // },
  },
}

module.exports = serverlessConfiguration
