
# Requires
connect = require('connect')

app = connect().use(connect.logger('dev')).use(connect.static('publish'))
app.listen process.env.VCAP_APP_PORT or 3000
