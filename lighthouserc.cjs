module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run dev',
      url: ['http://localhost:4200'],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --headless',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', {minScore: 0.5}],
        'categories:accessibility': ['error', {minScore: 0.8}],
        'categories:best-practices': ['warn', {minScore: 0.7}],
        'categories:seo': ['warn', {minScore: 0.8}],
        'categories:pwa': ['off', {minScore: 0.5}],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
};
