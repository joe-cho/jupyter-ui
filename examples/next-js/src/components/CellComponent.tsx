/*
 * Copyright (c) 2021-2023 Datalayer, Inc.
 *
 * MIT License
 */

'use client'

import { Jupyter, Cell } from '@datalayer/jupyter-react';
import { Theme } from '@primer/react/lib/ThemeProvider';
import { jupyterServerDomain, jupyterServerToken} from './APIEndpoint.ts'

type CellComponentProps = {
  colorMode: 'light' | 'dark';
  theme: Theme;
}

export const CellComponent = (props: CellComponentProps) => {
  const { colorMode, theme } = props;
  return (
    <>
      <div style={{fontSize: 20}}>Jupyter Cell in Next.js</div>
      <Jupyter
        jupyterServerHttpUrl={`http://localhost:3000/${jupyterServerDomain}`}
        jupyterServerWsUrl={`ws://localhost:3000/${jupyterServerDomain}`}
        jupyterToken={jupyterServerToken}
        colorMode={colorMode}
        theme={theme}
      >
        <Cell/>
    </Jupyter>
  </>
  )
}

export default CellComponent;
