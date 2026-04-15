module.exports = {
  apps: [{
    name: 'gustaw',
    script: 'npm',
    args: 'start',
    cwd: '/home/project/gustaw-fin',
    instances: 1,
    exec_mode: 'fork',
    max_memory_restart: '400M',
    env: {
      NODE_ENV: 'production'
    },
    error_file: '/root/.pm2/logs/gustaw-error.log',
    out_file: '/root/.pm2/logs/gustaw-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false
  }]
};

