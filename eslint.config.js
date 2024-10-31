import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginImport from 'eslint-plugin-import';
//@ts-nocheck
export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    // eslintPluginImport.configs.recommended,
    {
        plugins: {
            import: eslintPluginImport,
        },
    },
    {
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                },
            },
        },
        rules: {
            semi: ['warn', 'always'],
            quotes: ['warn', 'double'],
            '@typescript-eslint/no-unused-vars': ['warn'],
            '@typescript-eslint/explicit-function-return-type': [
                'warn',
                {
                    allowExpressions: true,
                    allowTypedFunctionExpressions: true,
                },
            ],
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'import/order': [
                'error',
                {
                    'newlines-between': 'always',
                    groups: ['builtin', ['internal', 'external'], ['sibling', 'parent', 'index']],
                    pathGroups: [
                        {
                            pattern: '@src/**',
                            group: 'external',
                            position: 'after',
                        },
                    ],
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
        },
    },
];
