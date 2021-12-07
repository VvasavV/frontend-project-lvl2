#!/usr/bin/env node

import commander from 'commander';
import generateDifferences from '../src/generateDifferences.js';

const program = commander
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const result = generateDifferences(filepath1, filepath2, program.opts().format);

    console.log(result);
  });

program.parse(process.argv);
