const publicIp = require('public-ip');

(async () => {
    console.log(await publicIp.v4());
})();




//npm install express cookie-parser morgan mysql2 helmet compression express-session express-mysql-session csurf passport passport-local debug
