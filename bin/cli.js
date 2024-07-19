#!/usr/bin/env node
import { execSync } from 'child_process';

const runCommand = (command) => {
    try {
        execSync(`${command}`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed to run: ${command}`, e);
        return false;
    }
    return true;
};

const repoName = process.argv[2];

if (!repoName) {
    console.error('Please provide a repository name');
    process.exit(1);
}

const gitCheckout = `git clone --depth 1 https://github.com/NehemiahDias/reactts-vite-tailwind ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm i`;

console.log(`Cloning repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckout);
if (!checkedOut) process.exit(-1);

const packageJsonPath = path.join(repoName, 'package.json');

try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = repoName; // Update the name
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2)); // Format JSON
    console.log(`Updated package.json with name: ${repoName}...${packageJson}`);
} catch (error) {
    console.error('Error updating package.json:', error);
    process.exit(-1);
}

// Initialize a new Git repository
console.log(`Initializing new Git repository for ${repoName}`);
const initGit = `cd ${repoName} && rm -rf .git && git init && git add . && git commit -m "Initial commit"`;
const gitInit = runCommand(initGit);
if (!gitInit) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installDeps = runCommand(installDepsCommand);

if (!installDeps) process.exit(-1);

console.log(`You are ready! Follow the following commands to get started:\ncd ${repoName} && npm i && npm run dev`);
