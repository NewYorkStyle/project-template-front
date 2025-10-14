import path from 'path';
import {fileURLToPath} from 'url';

// Получаем __dirname для ES модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
 * Утилита-плагин, автоматически добавляющая style-resources-loader
 * сразу после less-loader во всех правилах.
 * Позволяет инжектить общий список Less-ресурсов (переменные/миксины)
 * во ВСЕ .less файлы без явных импортов.
 */
export const withGlobalLessResources = () => (config) => {
  const list = [
    path.resolve(__dirname, '../../../src/app/styles/variables.less'),
  ];

  const ensureArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

  const walk = (rule) => {
    if (!rule) return;
    if (Array.isArray(rule.oneOf)) rule.oneOf.forEach(walk);
    if (Array.isArray(rule.rules)) rule.rules.forEach(walk);

    if (rule.use) {
      const useArr = ensureArray(rule.use);
      const lessIdx = useArr.findIndex((u) => {
        const loader = typeof u === 'string' ? u : u && u.loader;
        return loader && loader.includes('less-loader');
      });

      if (lessIdx !== -1) {
        const already = useArr.some((u) => {
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

export default withGlobalLessResources;
