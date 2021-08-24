const plugins = [
    [
        'module-resolver',
        {
            root: ['.'],
            extensions: [
                '.ios.js',
                '.android.js',
                '.js',
                '.ios.jsx',
                '.android.jsx',
                '.jsx',
                '.jsx',
                '.js',
                '.json',
                '.svg',
            ],
            alias: {
                '@screens': './src/screens/index',
            },
        },
    ],
];

module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['.'],
                extensions: [
                    '.ios.js',
                    '.android.js',
                    '.js',
                    '.ios.jsx',
                    '.android.jsx',
                    '.jsx',
                    '.js',
                    '.json',
                ],
                alias: {
                    '@screens': './src/screens/index',
                    '@hooks': './src/hooks/index',
                    '@constants': './src/constants/index',
                    '@components': './src/components/index',
                    '@styles': './styles',
                    '@theme': './theme',
                },
            },
        ],
    ],
};
