export interface Urls {
  get: string;
  cancel: string;
}

export interface Input {
  prompt: string;
}

export interface Metrics {}

export interface ReplicatePromptResponse {
  id: string;
  version: string;
  urls: Urls;
  created_at: Date;
  completed_at?: any;
  status: string;
  input: Input;
  output?: any;
  error?: any;
  logs?: any;
  metrics: Metrics;
}
