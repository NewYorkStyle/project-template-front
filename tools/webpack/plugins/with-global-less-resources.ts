import * as path from 'path';

/*
 * Утилита-плагин для composePlugins, автоматически добавляющая
 * style-resources-loader сразу после less-loader во всех правилах.
 * Позволяет инжектить общий список Less-ресурсов (переменные/миксины)
 * во ВСЕ .less файлы без явных импортов.
 */
export const withGlobalLessResources = () => (config: any) => {
  const list = [
    path.resolve(__dirname, '../../../libs/common/src/styles/global.less'),
  ];

  const ensureArray = (v: any) => (Array.isArray(v) ? v : v ? [v] : []);

  const walk = (rule: any) => {
    if (!rule) return;
    if (Array.isArray(rule.oneOf)) rule.oneOf.forEach(walk);
    if (Array.isArray(rule.rules)) rule.rules.forEach(walk);

    if (rule.use) {
      const useArr = ensureArray(rule.use);
      const lessIdx = useArr.findIndex((u: any) => {
        const loader = typeof u === 'string' ? u : u && u.loader;
        return loader && loader.includes('less-loader');
      });

      if (lessIdx !== -1) {
        const already = useArr.some((u: any) => {
          const loader = typeof u === 'string' ? u : u && u.loader;
          return loader && loader.includes('style-resources-loader');
        });

        if (!already) {
          useArr.splice(lessIdx + 1, 0, {
            loader: 'style-resources-loader',
            options: {patterns: list},
          });
          rule.use = useArr;
        }
      }
    }
  };

  const rules = (config.module && config.module.rules) || [];
  rules.forEach(walk);

  return config;
};
