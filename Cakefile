{spawn, exec} = require 'child_process'
fs = require 'fs'
log = console.log

task 'build', ->
  coffeePath = './node_modules/coffee-script/bin/coffee'
  if fs.existsSync(coffeePath)
    run "#{coffeePath} -o lib -c src"
  else
    console.log('> skipping build because coffee-script is not installed')

task 'test', ->
  console.log('\nFIRST, rename this module on the following lines. When that\'s done, delete this `test` task from Cakefile and uncomment the real `test`. \n')
  run 'grep -i Service_Being_Integrated * */* 2>/dev/null && exit 1'

#task 'test', ->
#  run 'NODE_ENV=test TZ=GMT ./node_modules/.bin/mocha spec/* --compilers coffee:coffee-script/register --reporter spec --colors'

task 'clean', ->
  run 'rm -fr ./lib'

run = (args...) ->
  for a in args
    switch typeof a
      when 'string' then command = a
      when 'object'
        if a instanceof Array then params = a
        else options = a
      when 'function' then callback = a

  command += ' ' + params.join ' ' if params?
  cmd = spawn '/bin/sh', ['-c', command], options
  cmd.stdout.on 'data', (data) -> process.stdout.write data
  cmd.stderr.on 'data', (data) -> process.stderr.write data
  process.on 'SIGHUP', ->
    cmd.kill()
  cmd.on 'exit', (code) ->
    process.exit(code)
