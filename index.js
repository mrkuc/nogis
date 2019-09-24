#!/usr/bin/env node

const nogis = require('./nogis.js');
const queries = process.argv.slice(2);

if (queries.length == 0) {
    console.error("Usage: nogis search-query");
    process.exit(1);
}
nogis.search(queries).catch(err => console.log(err));
