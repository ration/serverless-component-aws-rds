# WIP

This is a work in progress. 

* [x] Create PostgreSQL Database
* [x] Remove PostgreSQL Database
* [x] Set arbitrary parameters
* [ ] Block deletion(!)


# aws-rds


Easily provision AWS RDS Databases using [Serverless Components](https://github.com/serverless/components).

&nbsp;

1. [Install](#1-install)
2. [Create](#2-create)
3. [Configure](#3-configure)
4. [Deploy](#4-deploy)

&nbsp;

### 1. Install

```shell
$ npm install -g serverless
```

### 2. Create

Just create a `serverless.yml` file

```shell
$ touch serverless.yml
$ touch .env      # your AWS api keys
```

```
# .env
AWS_ACCESS_KEY_ID=XXX
AWS_SECRET_ACCESS_KEY=XXX
```

### 3. Configure

```yml
# serverless.yml

myTable:
  component: 'serverless-aws-rds'
  inputs:
    name: pg-test-table
    engine: postgres
```


### 4. Deploy

```shell
$ serverless
```

&nbsp;

To see the master password, debug must be enabled.

### New to Components?

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
