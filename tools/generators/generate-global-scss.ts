import fs from 'fs';
import path from 'path';

import {
  type TColorPalette,
  type TDesignTokens,
  designTokens,
} from '../../src/shared/lib/constants/design-tokens';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Функция для генерации SCSS переменных
const generateScssVariables = (tokens: TDesignTokens): string => {
  let scssContent = '// Auto-generated from TypeScript\n\n';

  // Отступы
  scssContent += '// Отступы\n';
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    scssContent += `$spacing-${key}: ${value}px;\n`;
  });

  scssContent += '\n';

  // Радиусы
  scssContent += '// Радиусы скругления\n';
  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    scssContent += `$border-radius-${key}: ${value}px;\n`;
  });

  scssContent += '\n';

  // Размеры текста
  scssContent += '// Размеры текста\n';
  Object.entries(tokens.textSise).forEach(([key, value]) => {
    scssContent += `$text-size-${key}: ${value}px;\n`;
  });

  scssContent += '\n';

  // Брейкпоинты
  scssContent += '// Брейкпоинты\n';
  Object.entries(tokens.breakpoints).forEach(([key, value]) => {
    scssContent += `$breakpoint-${camelToKebab(key)}: ${value}px;\n`;
  });

  return scssContent;
};

// Функция для генерации основного SCSS файла с CSS переменными
const generateGlobalScss = (tokens: TDesignTokens): string => {
  let scssContent = '// Auto-generated from TypeScript\n\n';

  // Импорт переменных
  scssContent += `@use './variables.scss';\n\n`;

  scssContent += `body {
  padding: 0;
  margin: 0;
}

`;

  // CSS переменные для переключения тем
  scssContent += `:root {\n`;
  scssContent += generateCssVariables(tokens.colors.light);
  scssContent += `}\n\n`;

  scssContent += `[data-theme="dark"] {\n`;
  scssContent += generateCssVariables(tokens.colors.dark);
  scssContent += `}`;

  return scssContent;
};

const workspaceRoot = path.resolve(__dirname, '../../');
console.log('📁 Workspace root:', workspaceRoot);

const stylesDir = path.join(workspaceRoot, 'src/app/styles');

// Создаем директорию, если её нет
if (!fs.existsSync(stylesDir)) {
  fs.mkdirSync(stylesDir, {recursive: true});
  console.log('📁 Created directory:', stylesDir);
}

// Генерируем и записываем variables.scss
const variablesPath = path.join(stylesDir, 'variables.scss');
const variablesContent = generateScssVariables(designTokens);
fs.writeFileSync(variablesPath, variablesContent);
console.log('✅ SCSS variables generated to:', variablesPath);
console.log('📄 Variables file size:', variablesContent.length, 'bytes');

// Генерируем и записываем global.scss
const globalPath = path.join(stylesDir, 'global.scss');
const globalContent = generateGlobalScss(designTokens);
fs.writeFileSync(globalPath, globalContent);
console.log('✅ Global scss generated to:', globalPath);
console.log('📄 Global file size:', globalContent.length, 'bytes');

// Проверяем, что файлы создались
if (fs.existsSync(variablesPath) && fs.existsSync(globalPath)) {
  console.log('✅ Both files successfully created!');
} else {
  console.log('❌ Some files were not created!');
}
