import NextHead from 'next/head';
import { string, oneOfType, arrayOf, node } from 'prop-types';

const Layout = ({ children, title }) => (
  <React.Fragment>
    <NextHead>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/static/favicon.ico" />
      <link rel="stylesheet" media="all" href="/static/reset.css" />
      <link rel="stylesheet" media="all" href="/static/styles.css" />
      <title>{title}</title>
    </NextHead>
    <div className="layout">
      {children}
    </div>
  </React.Fragment>
);

Layout.propTypes = {
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
  title: string.isRequired,
};

export default Layout;
