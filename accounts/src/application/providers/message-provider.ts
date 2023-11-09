export interface MessageProvider {
  connect: () => Promise<void>;
  sendMessage: (message: string, payload: Buffer) => Promise<void>;
  onMessage: <T>(message: string, callback: (data: T) => Promise<void>) => void;
}
