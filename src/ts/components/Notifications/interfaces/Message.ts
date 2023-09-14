export default interface IMessage {
  id: number;
  title: string;
  description?: string;
  type?: 'error' | 'warning' | 'success' | 'info';
}
