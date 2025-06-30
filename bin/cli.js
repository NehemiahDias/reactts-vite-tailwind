#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const runCommand = (command) => {
    try {
        execSync(`${command}`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed to run: ${command}`, e);
        return false;
    }
    return true;
};

const deletePath = (targetPath) => {
    if (fs.existsSync(targetPath)) {
        const stat = fs.lstatSync(targetPath);
        if (stat.isDirectory()) {
            // Recursively delete directory contents
            fs.readdirSync(targetPath).forEach((file) => {
                const curPath = path.join(targetPath, file);
                deletePath(curPath);
            });
            fs.rmdirSync(targetPath);
            console.log(`Deleted directory: ${targetPath}`);
        } else {
            // Delete file
            fs.unlinkSync(targetPath);
            console.log(`Deleted file: ${targetPath}`);
        }
    }
};

const repoName = process.argv[2];

if (!repoName) {
    console.error('Please provide a repository name');
    process.exit(1);
}

const gitCheckout = `git clone --depth 1 https://github.com/NehemiahDias/reactts-vite-tailwind ${repoName}`;

console.log(`Cloning repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckout);
if (!checkedOut) process.exit(-1);

// Delete unwanted files and folders
console.log('Cleaning up repository files...');
deletePath(path.join(repoName, '.git'));
deletePath(path.join(repoName, '.github'));
deletePath(path.join(repoName, '.npmrc'));

const packageJsonPath = path.join(repoName, 'package.json');

try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Update the name
    packageJson.name = repoName;

    // Remove unwanted fields
    delete packageJson.bin;
    delete packageJson.repository;
    delete packageJson.publishConfig;

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`Updated package.json with name: ${repoName} and removed unwanted fields`);
} catch (error) {
    console.error('Error updating package.json:', error);
    process.exit(-1);
}

// Initialize a new Git repository
console.log(`Initializing new Git repository for ${repoName}`);
const initGit = `cd ${repoName} && git init && git add . && git commit -m "Initial commit"`;
const gitInit = runCommand(initGit);
if (!gitInit) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installDepsCommand = `cd ${repoName} && npm i`;
const installDeps = runCommand(installDepsCommand);

if (!installDeps) process.exit(-1);

console.log(`You are ready! Follow the following commands to get started:\ncd ${repoName} && npm run dev`);
