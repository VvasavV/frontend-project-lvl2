#!/usr/bin/env node

import commander from 'commander';
import parseFile from '../src/parseFile.js';
import dataDifferences from '../src/dataDifferences.js';
import render from '../src/formatters/index.js';

const program = commander
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const dataOld = parseFile(filepath1);
    const dataNew = parseFile(filepath2);

    const differences = dataDifferences(dataOld, dataNew);
    const result = render(differences, program.opts().format);

    console.log(result);
  });

program.parse(process.argv);
