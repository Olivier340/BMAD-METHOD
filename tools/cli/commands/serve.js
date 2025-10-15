const chalk = require('chalk');
const { spawn } = require('node:child_process');
const getPort = (...args) => import('get-port').then((m) => m.default(...args));

module.exports = {
  command: 'serve',
  description: 'Start BMad Visual Studio web interface',
  options: [
    ['-p, --port <port>', 'Port number', '3000'],
    ['--no-browser', 'Do not open browser automatically'],
  ],
  action: async (options) => {
    try {
      const port = parseInt(options.port, 10);

      // Try to find an available port if the specified one is taken
      const availablePort = await getPort({ port });

      console.log(chalk.green('\n✨ Starting BMad Visual Studio...'));
      console.log(chalk.cyan(`   Server will run on port ${availablePort}`));

      // Start the server using node for the BMad Serve server
      const serverProcess = spawn('node', ['bmad-serve.js'], {
        cwd: process.cwd(),
        stdio: 'inherit',
        env: { ...process.env, PORT: availablePort.toString() },
      });

      serverProcess.on('error', (error) => {
        console.error(chalk.red('Failed to start server:'), error.message);
        process.exit(1);
      });

      serverProcess.on('exit', (code) => {
        if (code !== 0) {
          console.error(chalk.red(`Server exited with code ${code}`));
        }
      });

      // Handle graceful shutdown
      process.on('SIGINT', () => {
        console.log(chalk.yellow('\nShutting down BMad Visual Studio...'));
        serverProcess.kill('SIGINT');
        process.exit(0);
      });

      process.on('SIGTERM', () => {
        console.log(chalk.yellow('\nShutting down BMad Visual Studio...'));
        serverProcess.kill('SIGTERM');
        process.exit(0);
      });
    } catch (error) {
      console.error(chalk.red('Failed to start server:'), error.message);
      process.exit(1);
    }
  },
};
