module.exports = {
  apps : [{
    script: 'laCartera.js',
    watch: '.',
    name: 'laCartera',
    ignore_watch: 
    [
      "node_modules",
      "pm2Log",
      ".gitignore",
      "./dbConfig/swagger_admin_view.json",
      "./dbConfig/swagger_mobil_view.json",
      "./ecosystem.config.js",
      "uploads"
    ],
    error_file: './pm2Log/error.log',
    out_file: './pm2Log/output.log',
    // instances : "max",
    // exec_mode : "cluster"
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
