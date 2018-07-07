import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#aee571',
      main: '#7cb342',
      dark: '#4b830d',
      contrastText: '#fafafa',
    },
    secondary: {
      light: '#fff263',
      main: '#fbc02d',
      dark: '#c49000',
      contrastText: '#fafafa',
    },
  },
});

export default theme;
