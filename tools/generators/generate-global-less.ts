/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import {
  TColorPalette,
  TDesignTokens,
  designTokens,
} from '../../libs/common/src/shared/constants';

// Функция для преобразования camelCase в kebab-case
const camelToKebab = (str: string): string => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

// Функция для генерации CSS переменных из палитры цветов
const generateCssVariables = (palette: TColorPalette, prefix = ''): string => {
  let cssVariables = '';

  Object.entries(palette).forEach(([key, value]) => {
    const cssVarName = `--${prefix}${camelToKebab(key)}`;
    cssVariables += `  ${cssVarName}: ${value};\n`;
  });

  return cssVariables;
};

export const generateLessVariables = (tokens: TDesignTokens): string => {
  let lessContent = '// Auto-generated from TypeScript\n\n';

  // Размеры
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    lessContent += `@spacing-${key}: ${value}px;\n`;
  });

  lessContent += '\n';

  // Радиусы
  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    lessContent += `@border-radius-${key}: ${value}px;\n`;
  });

  lessContent += '\n';

  // CSS переменные для переключения тем
  lessContent += `:root {\n`;
  lessContent += generateCssVariables(tokens.colors.light);
  lessContent += `}\n\n`;

  lessContent += `[data-theme="dark"] {\n`;
  lessContent += generateCssVariables(tokens.colors.dark);
  lessContent += `}`;

  return lessContent;
};

const workspaceRoot = path.resolve(__dirname, '../../../../../');
console.log('📁 Workspace root:', workspaceRoot);

const outputPath = path.join(
  workspaceRoot,
  'libs/common/src/styles/global.less'
);
console.log('📄 Output path:', outputPath);

// Создаем директорию, если её нет
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, {recursive: true});
  console.log('📁 Created directory:', outputDir);
}

// Генерируем содержимое
const lessContent = generateLessVariables(designTokens);

// Записываем файл
fs.writeFileSync(outputPath, lessContent);

console.log('✅ Less variables generated to:', outputPath);
console.log('📄 File size:', lessContent.length, 'bytes');

// Проверяем, что файл создался
if (fs.existsSync(outputPath)) {
  console.log('✅ File successfully created!');
} else {
  console.log('❌ File was not created!');
}
