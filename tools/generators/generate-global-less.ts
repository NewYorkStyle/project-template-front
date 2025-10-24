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

// Функция для генерации Less переменных
const generateLessVariables = (tokens: TDesignTokens): string => {
  let lessContent = '// Auto-generated from TypeScript\n\n';

  // Отступы
  lessContent += '// Отступы\n';
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    lessContent += `@spacing-${key}: ${value}px;\n`;
  });

  lessContent += '\n';

  // Радиусы
  lessContent += '// Радиусы скругления\n';
  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    lessContent += `@border-radius-${key}: ${value}px;\n`;
  });

  lessContent += '\n';

  // Размеры текста
  lessContent += '// Размеры текста\n';
  Object.entries(tokens.textSise).forEach(([key, value]) => {
    lessContent += `@text-size-${key}: ${value}px;\n`;
  });

  lessContent += '\n';

  // Брейкпоинты
  lessContent += '// Брейкпоинты\n';
  Object.entries(tokens.breakpoints).forEach(([key, value]) => {
    lessContent += `@breakpoint-${camelToKebab(key)}: ${value}px;\n`;
  });

  return lessContent;
};

// Функция для генерации основного Less файла с CSS переменными
const generateGlobalLess = (tokens: TDesignTokens): string => {
  let lessContent = '// Auto-generated from TypeScript\n\n';

  // Импорт переменных
  lessContent += `@import './variables.less';\n\n`;

  lessContent += `body {
  padding: 0;
  margin: 0;
}

`;

  // CSS переменные для переключения тем
  lessContent += `:root {\n`;
  lessContent += generateCssVariables(tokens.colors.light);
  lessContent += `}\n\n`;

  lessContent += `[data-theme="dark"] {\n`;
  lessContent += generateCssVariables(tokens.colors.dark);
  lessContent += `}`;

  return lessContent;
};

const workspaceRoot = path.resolve(__dirname, '../../');
console.log('📁 Workspace root:', workspaceRoot);

const stylesDir = path.join(workspaceRoot, 'src/app/styles');

// Создаем директорию, если её нет
if (!fs.existsSync(stylesDir)) {
  fs.mkdirSync(stylesDir, {recursive: true});
  console.log('📁 Created directory:', stylesDir);
}

// Генерируем и записываем variables.less
const variablesPath = path.join(stylesDir, 'variables.less');
const variablesContent = generateLessVariables(designTokens);
fs.writeFileSync(variablesPath, variablesContent);
console.log('✅ Less variables generated to:', variablesPath);
console.log('📄 Variables file size:', variablesContent.length, 'bytes');

// Генерируем и записываем global.less
const globalPath = path.join(stylesDir, 'global.less');
const globalContent = generateGlobalLess(designTokens);
fs.writeFileSync(globalPath, globalContent);
console.log('✅ Global less generated to:', globalPath);
console.log('📄 Global file size:', globalContent.length, 'bytes');

// Проверяем, что файлы создались
if (fs.existsSync(variablesPath) && fs.existsSync(globalPath)) {
  console.log('✅ Both files successfully created!');
} else {
  console.log('❌ Some files were not created!');
}
