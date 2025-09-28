/* eslint-disable no-console */
import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';

const packageJsonPath = join(process.cwd(), 'package.json');
const versionFilePath = join(
  process.cwd(),
  'libs/common/src/shared/constants/version.ts'
);

try {
  // Читаем версию из package.json
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  const version = packageJson.version;

  // Обновляем файл с версией
  const versionContent = `// Версия приложения - генерируется автоматически
export const APP_VERSION = '${version}';
`;

  writeFileSync(versionFilePath, versionContent, 'utf8');

  console.log(`✅ Версия обновлена до ${version}`);
} catch (error) {
  console.error('❌ Ошибка при обновлении версии:', error);
  process.exit(1);
}
