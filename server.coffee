
# Requires
connect = require('connect')

app = connect().use(connect.logger('dev')).use(connect.static('publish'))
app.listen 3009
