#!/usr/bin/env node

import commander from 'commander';
import parseFile from '../src/parseFile.js';
import dataDifferences from '../src/dataDifferences.js';
import stylish from '../src/stylish.js';

const program = commander
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const dataOld = parseFile(filepath1);
    const dataNew = parseFile(filepath2);

    const differences = dataDifferences(dataOld, dataNew);
    const result = stylish(differences);

    console.log(result);
  });

program.parse(process.argv);
