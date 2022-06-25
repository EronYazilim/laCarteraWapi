module.exports = {
  YOL: function() {
    if (process.platform === "win32")
    {
      return "C:/inetpub/wwwroot/projeler/laCarteraWapi/uploads/"
    } 
    else if (process.platform === "darwin")
    {
      return "/Library/WebServer/Documents/projeler/laCarteraWapi/uploads/"        
    } 
    else if (process.platform === "linux") 
    {
      return "/home/eron/wapi/laCarteraWapi/uploads/"
    }
  },
};