import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Box, Text, ToggleSwitch } from "@primer/react";
import { BoxPanel } from '@lumino/widgets';
import { NotebookPanel } from '@jupyterlab/notebook';
// import { NotebookTracker } from '@jupyterlab/notebook';
import { Widget } from '@lumino/widgets';
import Jupyter from '../jupyter/Jupyter';
import Lumino from '../jupyter/lumino/Lumino';
import JupyterLabApp from "../components/app/JupyterLabApp";
import JupyterLabAppAdapter from "../components/app/JupyterLabAppAdapter";

import * as ipywidgetsExtension from '@jupyter-widgets/jupyterlab-manager';
import * as plotlyExtension from 'jupyterlab-plotly/lib/jupyterlab-plugin';
import * as mimePlotlyExtension from 'jupyterlab-plotly/lib/plotly-renderer';

const PATHS = [
  "ipywidgets.ipynb",
  "plotly.ipynb",
]

const PATH_INDEX = 1;

const height = "900px";

const JupyterLabHeadlessAppExample = () => {
  const [boxPanel, setBoxPanel] = useState<BoxPanel>();
  const [_, setJupyterlabAdapter] = useState<JupyterLabAppAdapter>();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isOn, setIsOn] = useState(false);
  const onClick = () => {
    boxPanel?.dispose();
    if (isOn) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
    setIsOn(!isOn);
  }
  const handleSwitchChange = (on: boolean) => {
    setIsOn(on);
  }
  const onReady = async (jupyterlabAdapter: JupyterLabAppAdapter) => {
    setJupyterlabAdapter(jupyterlabAdapter);
    const jupyterlab = jupyterlabAdapter.jupyterlab;
    await jupyterlab.commands.execute('apputils:reset');
    const notebookPanel = await jupyterlab.commands.execute('docmanager:open', { path: PATHS[PATH_INDEX], factory: 'Notebook', kernel: { name: 'python3' } }) as NotebookPanel;
//    const notebookTracker = jupyterlabAdapter.service("@jupyterlab/notebook-extension:tracker") as NotebookTracker;
    Object.defineProperty((jupyterlabAdapter.shell as any), 'currentWidget', {
      get: function() { return notebookPanel },
      set: function(widget: Widget | null) {},
    });
    const boxPanel = new BoxPanel();
    boxPanel.addClass('dla-Jupyter-Notebook');
    boxPanel.spacing = 0;
    boxPanel.addWidget(notebookPanel);
    setBoxPanel(boxPanel);
  }
  return (
    <>
      <Jupyter startDefaultKernel={false} disableCssLoading={true} theme={theme}>
        <Box display="flex">
          <Box mr={3}>
            <Text as="h2">JupyterLab Headless Application</Text>
          </Box>
          <Box>
            <Box>
            <Text fontSize={2} fontWeight="bold" id="switch-label" display="block" mb={1}>Dark theme</Text>
            </Box>
            <Box>
              <ToggleSwitch
                size="small"
                onClick={onClick}
                onChange={handleSwitchChange}
                checked={isOn}
                statusLabelPosition="end"
                aria-labelledby="switch-label"
              />
            </Box>
          </Box>
        </Box>
        { boxPanel &&
          <div style={{ position: "relative" }}>
            <Box className="jp-LabShell"
              sx={{
                '& .dla-Jupyter-Notebook': {
                  height,
                  maxHeight: height,
                  width: '100%',
                }
              }}
            >
              <Box>
                <Lumino>{boxPanel}</Lumino>
              </Box>
            </Box >
          </div>
        }
        <JupyterLabApp
          extensions={[
            ipywidgetsExtension,
            plotlyExtension,
          ]}
          mimeExtensions={[
            mimePlotlyExtension,
          ]}
          theme={theme}
          hostId={`jupyterlab-app-${isOn}`}
          headless={true}
          onReady={onReady}
        />
      </Jupyter>
    </>
  )
}

const div = document.createElement('div');
document.body.appendChild(div);
const root = createRoot(div)

root.render(<JupyterLabHeadlessAppExample/>);
