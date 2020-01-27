const { mergeDeepRight, pick, equals } = require('ramda');
const AWS = require('aws-sdk');
const { Component } = require('@serverless/core');
const { createDatabase, deleteDatabase } = require('./rds');


const outputsList = ['name', 'arn', 'region'];

const defaults = {
  region: 'us-east-1',
  name: null,
  engine: 'postgres',
  dbInstanceClass: 'db.t2.micro',
  masterUsername: 'rdsadminuser',
  dbParams: {
    AllocatedStorage: 20
  }
};

class AwsRDS extends Component {
  async default(inputs = {}) {
    this.context.status('Deploying');
    const config = mergeDeepRight(defaults, inputs);

    if (!config.name) {
      throw new Error("Configuration must contain at least db name");
    }

    this.context.debug(
      `Starting deployment of RDS in the ${config.region} region.`);

    const rds = new AWS.RDS({
      region: config.region,
      credentials: this.context.credentials.aws
    });

    this.context.debug(
      `Setting up RDS`
    );

    await createDatabase.call(this, {rds: rds,
      dbInstanceClass: config.dbInstanceClass,
      name: config.name,
      engine: config.engine,
      masterUsername: config.masterUsername,
      params: config.dbParams
    });


    this.state.name = config.name;
    this.state.region = config.region;
    await this.save();
    return pick(outputsList, config);
  }

  async remove() {
    this.context.status('Deleting');

    const {name, region} = this.state;

    const rds = new AWS.RDS({
      region: region,
      credentials: this.context.credentials.aws
    });

    return await deleteDatabase.call(this, {rds: rds, name:name, skipFinalSnapshot: true});
  }
}

module.exports = AwsRDS;
