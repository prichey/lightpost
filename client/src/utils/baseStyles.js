import { injectGlobal } from 'styled-components';

export default () => {
  injectGlobal`
    html {
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      font-weight: 400;
      font-size: 62.5%;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      font-size: 16px;
      overflow-x: hidden;
      position: relative;
    }

    * {
      margin: 0;
      padding: 0;
    }

    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    ul,
    ol {
      list-style: none;
    }

    img {
      display: inline-block;
      vertical-align: top;
    }

    pre,
    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
  `;
};
