import { ipcRenderer } from 'electron';

// Secure wrapper for renderer-main communication
export const sendToMain = (channel: string, data?: any) => {
  ipcRenderer.send(channel, data);
};

export const onMainEvent = (channel: string, callback: (event: any, ...args: any[]) => void) => {
  ipcRenderer.on(channel, callback);
};
