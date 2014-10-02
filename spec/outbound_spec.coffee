assert = require('chai').assert
querystring = require('querystring')
outbound = require('../src/outbound')

describe 'Send Request', ->

  it 'should have correct base url', ->
    assert.equal 'https://app.leadconduit.com/flows/542c850be1e88a0250a5eee7/sources/53ab40789d29c9d94400004b/submit', request().url

  it 'should be a POST', ->
    assert.equal request().method, 'POST'

  it 'should accept JSON', ->
    assert.equal request().headers.Accept, 'application/json'

  it 'should be form url encoded content type', ->
    assert.equal request().headers['Content-Type'], 'application/x-www-form-urlencoded'

  it 'should have the lead email', ->
    qs = querystring.parse(request().body)
    assert.equal qs.email, 'foo@bar.com'

  it 'should have the service_being_integrated account ID', ->
    qs = querystring.parse(request().body)
    assert.equal qs.service_being_integrated_account_id, 'F00'

  it 'should have unmappable value 1', ->
    qs = querystring.parse(request().body)
    assert.equal qs.unmappable_val_1, 'abracadabra'


  request = () ->
    vars =
      service_being_integrated_account_id:  'F00'
      lead:
        email: 'foo@bar.com'

    outbound.request(vars)


describe 'Handle Response', ->

  it 'should parse success', ->
    res = response(body: { outcome: 'success', lead: {id: '542d6ebcfe956a4622bc075b' }})
    assert.equal res.outcome, 'success'
    assert.equal res.service_being_integrated.appended_value, 'even'

  it 'should parse failure', ->
    res = response(body: { outcome: 'failure', reason: 'something bad happened', lead: {id: '542d6ebcfe956a4622bc075b'} })
    assert.equal res.outcome, 'failure'
    assert.equal res.reason, 'something bad happened'

  it 'should parse error', ->
    res = response(status: 404, body: { message: 'Source not found' })
    assert.equal res.outcome, 'error'
    assert.equal res.reason, '{"message":"Source not found"}'


  response = (res={}) ->
    res.headers ?= {}
    res.status ?= 200
    res.headers['Content-Type'] ?= 'application/json'
    res.body ?= { message: 'success' }
    res.body = JSON.stringify(res.body)
    outbound.response({}, {}, res)
