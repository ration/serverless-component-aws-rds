function genPassword(length) {
    // This char space *should* contain valid chars for all database engines */
    const chars = "abcdefghijklmnopqrstuvwxyz!#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    let pass = "";
    for (let x = 0; x < length; ++x) {
        const i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}

/* Create db. you can set any parameter specified in https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/RDS.html#createDBInstance-property */
async function createDatabase({rds, dbInstanceClass, name, engine, masterUsername, params}) {
    const password = genPassword(16);
    let create = await rds.createDBInstance({
        DBInstanceClass: dbInstanceClass,
        DBInstanceIdentifier: name,
        Engine: engine,
        MasterUsername: masterUsername,
        MasterUserPassword: password,
        ...params
    }).promise();
    this.context.debug(`The master password for ${masterUsername} is '${password}'`);
    return create;
}

async function deleteDatabase({rds, name, skipFinalSnapshot}) {
    return await rds.deleteDBInstance({DBInstanceIdentifier: name, SkipFinalSnapshot: skipFinalSnapshot}).promise();
}

module.exports = {
    createDatabase,
    deleteDatabase
};