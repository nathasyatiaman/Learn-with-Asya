
export interface Message {
  role: 'user' | 'asya';
  text: string;
  timestamp: Date;
}

export enum AppMode {
  HOME = 'HOME',
  LIVE = 'LIVE',
  CHAT = 'CHAT',
  VOCABULARY = 'VOCABULARY',
  PROGRESS = 'PROGRESS'
}

export interface VocabItem {
  word: string;
  translation: string;
  definition: string;
  example: string;
  scenario: string;
}

export interface ProgressStats {
  vocabularyCount: number;
  grammarScore: number;
  speakingTime: number; // in minutes
  fluencyLevel: number; // 0-100
  recentActivity: { date: string; topic: string; score: number }[];
}
