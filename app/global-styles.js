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
    --green: #009c0f;
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
    --light: #f1f1f1;
    --dark: #343a40;
    --spacing-factor: 8px;
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --font-family-content:  Roboto, Arial, sans-serif;
    --font-family-title: Lato, Arial, sans-serif;
    font-size: 16px;
  }

  html,
  body {
    height: 100%;
    width: 100%;
  
  }

  body {
    font-family: var(--font-family-content);
  }
  
  p,a,li,blockquote {
    font-family: var(--font-family-content);
    font-weight: 400;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-title);
    font-weight: 700;
  }
  
  h1 { 
    font-size: 1.66em;
  } 
   
  h2 {
    font-size: 1.5em;
  }
   
  h3 { 
    font-size: 1.33em;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
  }
  
  a {
    color: var(--light-blue);
    
    &:hover {
      color: var(--blue);
    }
  }
`;
