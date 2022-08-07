import {extendTheme, withDefaultColorScheme} from '@chakra-ui/react'

export const theme = extendTheme(  withDefaultColorScheme({
    colorScheme: 'purple',
    components: ['Button', 'Badge'],
}),{
    colors: {
        neutral_gray: {
            '900': '#09090A',
            '800': '#121214',
            '700': '#1B1B1E',
            '600': '#29292E',
            '500': '#323238',
            '400': '#505059',
            '300': '#7C7C8A',
            '200': '#8D8D99',
            '100': '#C4C4CC',
            '50': '#E1E1E6',
        },
        neutral_purple: {
            '900': '#110F17',
            '800': '#1A1821',
            '700': '#282433',
            '600': '#363142',
            '500': '#544E66',
            '400': '#6C6480',
            '300': '#847C99',
            '200': '#BDB5D3',
            '100': '#DBD3F0',
            '50': '#F4F3F6',
        },
        purple: {
            '500': '#301A5D',
            '400': '#5E3EA1',
            '300': '#7855C3',
            '200': '#956FE5',
            '100': '#AF89FF',
        },
        pink: {
            '500': '#8C2841',
            '400': '#E7426B',
            '300': '#F56B8E',
            '200': '#F487A3',
            '100': '#FFBDCE',
        },
        green: {
            '500': '#29541C',
            '400': '#4EA135',
            '300': '#74C85B',
            '200': '#C6FFB4',
            '100': '#D8EAD3',
        },
        red: {
            '500': '#7C221F',
            '400': '#B43B37',
            '300': '#FF706B',
            '200': '#FF9C99',
            '100': '#FFD2CC',
        },
        yellow: {
            '500': '#5E4600',
            '400': '#987A23',
            '300': '#FAC833',
            '200': '#FCDE83',
            '100': '#F0EFBC',
        },
    },
    fonts: {
        heading: `'Public Sans', sans-serif`,
        body: `'Public Sans', sans-serif`,
    },
    styles: {
        global: {
            body: {
                bg: 'neutral_gray.900',
                color: 'neutral_gray.100'
            }
        }
    }
})
