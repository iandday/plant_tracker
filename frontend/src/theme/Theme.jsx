import { amber, deepOrange, grey, blue, common } from '@mui/material/colors';

//https://coolors.co/0b1029-383d59-ac3d51-491a2f-1c4075
const palette = {
    light: {
        primary: {
            main: '#34C0AC',
            light: '#B1DED3',
            dark: '#00765A',
        },
    },
    dark: {
        primary: {
            main: '#AC3D51',
            light: '',
            dark: '',
        },
        secondary: {
          main: '#491A2F',
          light: '',
          dark: '',
      }
    }
};

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? //light
      {
          primary: {
            main: palette.light.primary.main,
            light: palette.light.primary.light,
            dark: palette.light.primary.dark,
          },

          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : 
      //dark
      {
          primary: {
            main: palette.dark.primary.main,
            light: palette.dark.primary.light,
            dark: palette.dark.primary.dark,
          },
          secondary: {
            main: palette.dark.secondary.main,
            light: palette.dark.secondary.light,
            dark: palette.dark.secondary.dark,
          },
          divider: 'rgba(74,73,73,0.76)',
          background: {
            default: '#0B1029',
            paper: '#383D59',
          },
          text: {
            primary: '#DDDDDD',
            secondary: grey[500],
          },
        }),
  },
  typography: {
    fontFamily: [
      'Oswald',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    body1: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
  },
});

export const getThemedComponents = (mode) => ({
  components: {
    ...(mode === 'light'
      ? {
          MuiAppBar: {
            styleOverrides: {
              colorPrimary: {
               // backgroundColor: grey[800],
              },
            },
          },
          MuiLink: {
            variant: 'h3',
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                color: common.white,
                fontFamily:
                  "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                fontSize: 20,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              },
            },
            variants: [
              {
                props: { variant: 'contained' },
                style: {
                  fontFamily:
                    "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                },
              },
              {
                props: { variant: 'outlined' },
                style: {
                  color: palette.light.primary.main,
                },
              },
              {
                props: { variant: 'primary', color: 'primary' },
                style: {
                  border: '4px dashed blue',
                },
              },
            ],
          },
          MuiList: {
            styleOverrides: {
              root: {},
            },
          },
          MuiMenuItem: {
            styleOverrides: {
              root: {
                color: common.white,
                alignItems: 'stretch',
                fontFamily:
                  "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
              },
            },
          },
          MuiAccordion: {
            styleOverrides: {
              root: {
                color: common.white,
                fontFamily:
                  "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
              },
            },
          },
        }
      : {
        MuiBottomNavigationAction:{
          styleOverrides: {
            "& $elected": {
              color: blue}
          }
        },
        MuiAppBar: {
            styleOverrides: {
              colorPrimary: {
                backgroundColor: blue[800],
              },
            },
          },
        }),
  },
});