
# Requires
express = require('express')
log = require('glogger')('GUYHT')

port = process.env.VCAP_APP_PORT or 3000
log.info "Starting server on port #{port}"

app = express().use(express.logger({format: 'tiny', stream: log.stream()})).use(express.compress()).use(express.responseTime()).use(express.static('publish'))

# Need to redirect all /blog urls to blog.guy.ht
app.get '/blog*', (req, res) ->
    url = req.url
    log.info "Redirecting blog request for #{url}"

    # Strip /blog from url
    url = url.replace '/blog', ''
    res.redirect "http://blog.guy.ht#{url}", 301

app.listen port
