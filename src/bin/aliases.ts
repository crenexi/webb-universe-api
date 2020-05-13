import moduleAlias from 'module-alias';
import path from 'path';

const pathsConfig: any = {
  "@config": "config",
  "@typeorm": "typeorm",
};

const baseDir = path.basename(path.dirname(__dirname));
const rootPath = path.resolve(__dirname, '..', '..');

const aliases = Object.keys(pathsConfig).reduce((aliases, key) => {
  const value = path.resolve(rootPath, baseDir, pathsConfig[key]);
  return { ...aliases, [key]: value };
}, {});

moduleAlias.addAliases(aliases);
