#!/usr/bin/env node
import {execSync} from 'child_process';
import {readFileSync} from 'fs';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getChangedFiles = () => {
  try {
    console.log('🔍 Checking for changed files...');
    // Определяем окружение
    const isCI = process.env.CI === 'true';
    let changedFiles = [];

    if (isCI) {
      // Для PR: GITHUB_BASE_REF - целевая ветка, GITHUB_HEAD_REF - исходная ветка
      const baseRef = process.env.GITHUB_BASE_REF;
      const headRef = process.env.GITHUB_HEAD_REF;

      if (baseRef && headRef) {
        return execSync(
          `git diff --name-only origin/${baseRef}...origin/${headRef}`,
          {encoding: 'utf8'}
        )
          .split('\n')
          .filter(Boolean);
      } else {
        // Fallback для push событий
        return execSync('git diff --name-only HEAD~1 HEAD', {encoding: 'utf8'})
          .split('\n')
          .filter(Boolean);
      }
    } else {
      // Локально: staged + unstaged изменения
      const stagedFiles = execSync('git diff --name-only --cached', {
        encoding: 'utf8',
      })
        .split('\n')
        .filter(Boolean);

      const unstagedFiles = execSync('git diff --name-only', {encoding: 'utf8'})
        .split('\n')
        .filter(Boolean);

      changedFiles = [...new Set([...stagedFiles, ...unstagedFiles])];
    }

    console.log(`📁 Found ${changedFiles.length} changed files`);
    return changedFiles;
  } catch (error) {
    console.error('❌ Error getting changed files:', error.message);
    return [];
  }
};

const convertPatternToRegex = (pattern) => {
  const normalizedPattern = pattern.replace(/\\/g, '/');

  const regexPattern =
    '^' +
    normalizedPattern.replace(/\*\*/g, '(.+)').replace(/\*/g, '([^/]*)') +
    '$';

  return new RegExp(regexPattern);
};

const getAffectedTags = (changedFiles, mapping) => {
  const affectedTags = new Set();

  changedFiles.forEach((file) => {
    const normalizedFile = file.replace(/\\/g, '/');

    for (const [tag, patterns] of Object.entries(mapping.tags)) {
      if (
        patterns.some((pattern) =>
          convertPatternToRegex(pattern).test(normalizedFile)
        )
      ) {
        affectedTags.add(tag);
        console.log(`✅ File "${normalizedFile}" → tag "${tag}"`);
      }
    }
  });

  return affectedTags;
};

const main = () => {
  console.log('🚀 Starting selective test runner...\n');

  const changedFiles = getChangedFiles();

  if (changedFiles.length === 0) {
    console.log('🏁 No files changed, nothing to test');
    process.exit(0);
  }

  try {
    const mappingPath = join(__dirname, './test-mapping.json');
    const mapping = JSON.parse(readFileSync(mappingPath, 'utf8'));

    const affectedTags = getAffectedTags(changedFiles, mapping);
    console.log(
      `\n🏷️  Affected tags: ${Array.from(affectedTags).join(', ') || 'none'}`
    );

    let command;

    if (affectedTags.has('@shared')) {
      console.log('🔀 Shared files changed - running ALL tests');
      command = 'npx playwright test';
    } else if (affectedTags.size > 0) {
      const tags = Array.from(affectedTags).join('|');
      console.log(`🎯 Running tests with tags: ${tags}`);
      command = `npx playwright test --grep "${tags}"`;
    } else {
      console.log('⏭️  No matching tags found - no tests to run');
      process.exit(0);
    }

    console.log(`\n▶️  Executing: ${command}`);
    console.log('─'.repeat(50));

    execSync(command, {stdio: 'inherit'});
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

main();
