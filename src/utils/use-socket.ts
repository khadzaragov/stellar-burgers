import { useEffect } from 'react';

export function useSocket<T>(url: string, onMessage: (data: T) => void) {
  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data) as T;
      onMessage(data);
    };

    return () => {
      socket.close();
    };
  }, [url, onMessage]);
}
