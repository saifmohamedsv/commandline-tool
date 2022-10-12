#!/usr/bin/env node
import fs from "fs";
import chalk from "chalk";
import path from "path";

const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, files) => {
  if (err) {
    console.log(err);
    return;
  }

  const statPromises = files.map((file) => lstat(path.join(targetDir, file)));
  const allStats = await Promise.all(statPromises);
  for (let stat of allStats) {
    const index = allStats.indexOf(stat);
    if (stat.isFile()) {
      console.log(files[index]);
    } else {
      console.log(chalk.blueBright(files[index]));
    }
  }
});
