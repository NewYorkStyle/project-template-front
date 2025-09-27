export const withIgnoreWarnings = (config: any) => {
  config.ignoreWarnings = [
    ...(config.ignoreWarnings || []),
    /Failed to parse source map/,
  ];
  return config;
};
