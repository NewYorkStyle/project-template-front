import path from 'path';
import {fileURLToPath} from 'url';

// Получаем __dirname для ES модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
 * Утилита-плагин, автоматически добавляющая style-resources-loader
 * сразу после sass-loader во всех правилах.
 * Позволяет инжектить общий список SCSS-ресурсов (переменные/миксины)
 * во ВСЕ .scss файлы без явных импортов.
 */
export const withGlobalScssResources = () => (config) => {
  const list = [
    path.resolve(__dirname, '../../../src/app/styles/variables.scss'),
  ];

  const ensureArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

  const walk = (rule) => {
    if (!rule) return;
    if (Array.isArray(rule.oneOf)) rule.oneOf.forEach(walk);
    if (Array.isArray(rule.rules)) rule.rules.forEach(walk);

    if (rule.use) {
      const useArr = ensureArray(rule.use);
      const sassIdx = useArr.findIndex((u) => {
        const loader = typeof u === 'string' ? u : u && u.loader;
        return loader && loader.includes('sass-loader');
      });

      if (sassIdx !== -1) {
        const already = useArr.some((u) => {
          const loader = typeof u === 'string' ? u : u && u.loader;
          return loader && loader.includes('style-resources-loader');
        });

        if (!already) {
          useArr.splice(sassIdx + 1, 0, {
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

export default withGlobalScssResources;
