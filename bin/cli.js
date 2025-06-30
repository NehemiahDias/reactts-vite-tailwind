#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current script
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read version from package.json dynamically
const getVersion = () => {
    try {
        const packageJsonPath = path.join(__dirname, '..', 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        return packageJson.version;
    } catch (error) {
        console.error('Could not read version from package.json:', error.message);
        return 'unknown';
    }
};

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
    try {
        if (fs.existsSync(targetPath)) {
            const stat = fs.lstatSync(targetPath);
            if (stat.isDirectory()) {
                fs.rmSync(targetPath, { recursive: true, force: true });
                console.log(`Deleted directory: ${targetPath}`);
            } else {
                fs.unlinkSync(targetPath);
                console.log(`Deleted file: ${targetPath}`);
            }
        } else {
            console.log(`Path does not exist: ${targetPath}`);
        }
    } catch (error) {
        console.error(`Error deleting ${targetPath}:`, error.message);
    }
};

const repoName = process.argv[2];

if (!repoName) {
    console.error('Please provide a repository name');
    process.exit(1);
}

const gitCheckout = `git clone --depth 1 https://github.com/NehemiahDias/reactts-vite-tailwind ${repoName}`;

// Get dynamic version
const currentVersion = getVersion();

console.log(
    `Cloning repository with name ${repoName}\nUsing reactts-vite-tailwind by \x1b[35mNitro\x1b[0m \x1b[33mv${currentVersion}\x1b[0m`
);
const checkedOut = runCommand(gitCheckout);
if (!checkedOut) process.exit(-1);

// Delete unwanted files and folders
console.log('Cleaning up repository files...');
const repoPath = path.join(process.cwd(), repoName);

deletePath(path.join(repoPath, '.git'));
deletePath(path.join(repoPath, '.github'));
deletePath(path.join(repoPath, '.npmrc'));
deletePath(path.join(repoPath, 'bin'));

const packageJsonPath = path.join(repoPath, 'package.json');

try {
    if (fs.existsSync(packageJsonPath)) {
        const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
        const packageJson = JSON.parse(packageJsonContent);

        // Update the name and version
        packageJson.name = repoName;
        packageJson.version = '0.0.1';

        // Remove unwanted fields
        delete packageJson.bin;
        delete packageJson.repository;
        delete packageJson.publishConfig;

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log(`Updated package.json with name: ${repoName}, version: 0.0.1, and removed unwanted fields`);
    } else {
        console.error(`package.json not found at: ${packageJsonPath}`);
        process.exit(-1);
    }
} catch (error) {
    console.error('Error updating package.json:', error.message);
    process.exit(-1);
}

// Initialize a new Git repository
console.log(`Initializing new Git repository for ${repoName}`);
const initGit = `cd ${repoName} && git init && git add . && git commit -m "Initial commit"`;
const gitInit = runCommand(initGit);
if (!gitInit) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installDepsCommand = `cd ${repoName} && npm install`;
const installDeps = runCommand(installDepsCommand);

if (!installDeps) process.exit(-1);

console.log(`You are ready! Follow the following commands to get started:\ncd ${repoName} && npm run dev`);
