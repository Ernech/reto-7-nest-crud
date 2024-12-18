const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './', // Raíz del proyecto
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$', // Patrón para archivos de prueba
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    // Ajustes explícitos si pathsToModuleNameMapper falla
    '@controllers/(.*)': '<rootDir>/src/controllers/$1',
    '@services/(.*)': '<rootDir>/src/services/$1',
    '@dto/(.*)': '<rootDir>/src/dto/$1',
    '@enum/(.*)': '<rootDir>/src/enums/$1',
    '@db/(.*)': '<rootDir>/src/db/$1',
  },
};
