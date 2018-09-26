import { injectGlobal } from 'styled-components';
/* eslint no-unused-expressions: 0 */
injectGlobal`
:root {
  --blue: #105992;
  --dark-blue: 	#00415a;
  --light-blue: #4688cc;
  --ultra-light-blue: #b6d9fe;
  --indigo: #6610f2;
  --purple: #6f42c1;
  --pink: #e83e8c;
  --red: #dc3545;
  --orange: #fd7e14;
  --yellow: #ffc107;
  --green: #28a745;
  --teal: #20c997;
  --cyan: #17a2b8;
  --white: #fff;
  --white-gray: #fafafa;
  --grayish-white: #f2f2f2;
  --light-gray: #dedede;
  --dust-gray: #a5a7aa;
  --gray: #6c757d;
  --gray-dark: #343a40;
  --primary: #007bff;
  --secondary: #6c757d;
  --success: #28a745;
  --info: #17a2b8;
  --warning: #ffc107;
  --danger: #dc3545;
  --light: #c0d9f3;
  --dark: #343a40;
  --spacing-factor: 8px;
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 16px;
}

@font-face {
  font-family: "Cousine";
  src: url("assets/fonts/cousine/Cousine-Regular.ttf") format("ttf");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Cousine";
  src: url("assets/fonts/cousine/Cousine-Bold.ttf") format("ttf");
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: "Cousine";
  src: url("assets/fonts/cousine/Cousine-Italic.ttf") format("ttf");
  font-weight: normal;
  font-style: italic;
}

@font-face {
  font-family: "Cousine";
  src: url("assets/fonts/cousine/Cousine-BoldItalic.ttf") format("ttf");
  font-weight: bold;
  font-style: italic;
}

  html,
  body {
    height: 100%;
    width: 100%;
  
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  
  a {
  color: var(--light-blue);
  
  &:hover {
  color: var(--blue);
  }
  }
`;
