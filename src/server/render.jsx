import Helmet from 'react-helmet';

import isProduction from './isProduction';
import { STATIC_PATH, WDS_PORT } from './config';

const render = () => {
  const head = Helmet.rewind();

  return (
    `<!doctype html>
    <html>
      <head>
        ${head.title}
        ${head.meta}
        <link rel="icon" type="image/png" href="${STATIC_PATH}/img/favicon.png">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
      </head>
      <body>
        <div class="app"></div>
        <script src="${isProduction ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
      </body>
    </html>`
  );
};

export default render;
