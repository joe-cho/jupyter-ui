/*
 * Copyright (c) 2021-2023 Datalayer, Inc.
 *
 * MIT License
 */

import { useEffect } from 'react';
import { JupyterLabTheme } from './JupyterLabTheme';

type Props = {
  theme: JupyterLabTheme;
};

export const JupyterLabCss = (props: Props) => {
  const { theme } = props;
  useEffect(() => {
    import('@jupyterlab/apputils/style/index.js');
    import('@jupyterlab/rendermime/style/index.js');
    import('@jupyterlab/codeeditor/style/index.js');
    import('@jupyterlab/cells/style/index.js');
    import('@jupyterlab/documentsearch/style/index.js');
    import('@jupyterlab/outputarea/style/index.js');
    import('@jupyterlab/console/style/index.js');
    import('@jupyterlab/completer/style/index.js');
    import('@jupyterlab/codemirror/style/index.js');
    import('@jupyterlab/codeeditor/style/index.js');
    import('@jupyterlab/cells/style/index.js');
    import('@jupyterlab/notebook/style/index.js');
    import('@jupyterlab/filebrowser/style/index.js');
    import('@jupyterlab/terminal/style/index.js');
    switch (theme) {
      case 'light': {
        import('@jupyterlab/theme-light-extension/style/theme.css');
        break;
      }
      case 'dark': {
        import('@jupyterlab/theme-dark-extension/style/theme.css');
        break;
      }
    }
    import('@jupyterlab/ui-components/style/index.js');
    // ipywidgets.
    import('@jupyter-widgets/base/css/index.css');
    import('@jupyter-widgets/controls/css/widgets-base.css');
  }, [theme]);
  return <div id="dla-JupyterLabCss-id"></div>;
};

JupyterLabCss.defaultProps = {
  theme: 'light',
};

export default JupyterLabCss;
