/*
 * Copyright (c) 2021-2023 Datalayer, Inc.
 *
 * MIT License
 */

'use client'

import { Jupyter, Notebook, CellSidebar } from '@datalayer/jupyter-react';
import { NotebookToolbar } from '@datalayer/jupyter-react/lib/examples/toolbars/NotebookToolbar';
import { Theme } from '@primer/react/lib/ThemeProvider';
import { jupyterServerDomain, jupyterServerToken} from './APIEndpoint.ts'

type NotebookComponentProps = {
  colorMode: 'light' | 'dark';
  theme: Theme;
}

export const NotebookComponent = (props: NotebookComponentProps) => {
  const { colorMode, theme } = props;
  return (
    <>
      <div style={{fontSize: 20}}>Jupyter Notebook in Next.js</div>
      <Jupyter
        jupyterServerHttpUrl={`http://localhost:3000/${jupyterServerDomain}`}
        jupyterServerWsUrl={`ws://localhost:3000/${jupyterServerDomain}`}
        jupyterToken={jupyterServerToken}
        colorMode={colorMode}
        theme={theme}
        collaborative={true}
      >
        <Notebook
          path="test_data/projects/1170ac08/workflows/2d734f62/edc330fc/inspect.ipynb"
          uid="notebook-nextjs-1"
          cellSidebarMargin={120}
          CellSidebar={CellSidebar}
          Toolbar={NotebookToolbar}
        />
    </Jupyter>
  </>
  )
}

export default NotebookComponent;
