// @ts-check
import { defineConfig } from 'agrippa';

export default defineConfig({
  options: {
    baseDir: './components',
    styleFileOptions: {
      module: true,
    },
    styling: 'scss',
  }
});