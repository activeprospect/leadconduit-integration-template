querystring = require('querystring')

#
# Request Function -------------------------------------------------------
#
request = (vars) ->

  #
  # This function creates the full request that will be posted to the outbound service endpoint.
  # Its input is `vars`, an object containing the original lead data (under `vars.lead`), and
  # all appended data (under other `vars` keys as appropriate).
  #
  # It will return a JavaScript object that includes:
  #  * method  - a string, e.g., "POST"
  #  * url     - a string, the URL of the endpoint
  #  * headers - an object with HTTP header options:
  #    * "Content-Type": "application/x-www-form-urlencoded"
  #    * "Accept": "application/json"
  #    * etc.
  #  * body    - an object with the HTTP body, e.g., encoded key/value pairs
  #

  # data to be included in the body can simply be constructed as an object literal
  body =
    unmappable_val_1: "abracadabra"
    unmappable_val_2: vars.lead.email.domain if vars.lead.email?
    service_being_integrated_account_id: vars.service_being_integrated_account_id

  # ...using whatever business logic is necessary
  if Date.now() % 2 == 0
    body["unmappable_val_3"] = 'evn'
  else
    body["unmappable_val_3"] = 'odd'

  # this optional code adds all key/value pairs from the original lead to the request body
  for key, value of vars.lead
    body[key] = value?.normal or value?.raw or value

  # in this case, the body data needs to be URL encoded
  body = querystring.encode(body)

  request_object =
    url:    "https://app.leadconduit.com/flows/542c850be1e88a0250a5eee7/sources/53ab40789d29c9d94400004b/submit"
    method: "POST"
    headers:
      Accept:           "application/json"
      "Content-Type":   "application/x-www-form-urlencoded"
      "Content-Length": body.length
    body: body

  return request_object

#
# This array defines all the fields that this integration can send. These can be mapped in each flow's configuration.
#
request.variables = ->
  [
    { name: 'lead.email', description: 'Recipient email address', required: true },
    { name: 'lead.title', description: 'Recipient title', required: false },
    { name: 'lead.first_name', description: 'Recipient first name', required: false },
    { name: 'lead.last_name', description: 'Recipient last name', required: false },
    { name: 'service_being_integrated_account_id', description: 'Account ID for Service_Being_Integrated', required: false }
  ]


#
# Response Function ------------------------------------------------------
#
#
response = (vars, req, res) ->

  #
  # This function parses the response returned by the outbound service endpoint.
  # Its input is the response object that includes:
  #  * status  - numeric HTTP status (e.g., 200, 404, 500)
  #  * headers - an object with HTTP header options
  #  * body    - a string with the response body
  #

  if res.status == 200
    # LeadConduit's response looks like: {"outcome":"success","lead":{"id":"542d6ebcfe956a4622bc075b"}}
    # or: {"outcome":"failure","reason":"Halted (test lead).","lead":{"id":"542d6fcdfe956a4622bc075e"}}
    body = JSON.parse(res.body)

    if body.outcome == 'failure'
      outcome: 'failure'
      reason: body.reason
      service_being_integrated:
        appended_value: map_id body.lead.id
    else
      # 'reason' is not set when outcome is success
      outcome: 'success',
      service_being_integrated:
        appended_value: map_id body.lead.id
  else
    outcome: 'error'
    reason: res.body

#
# This array defines the fields that are available on the lead after the integration completes.
# 'outcome' and 'reason' are standard and always required.
#
response.variables = ->
  [
    { name: 'outcome', type: 'string', description: 'Integration outcome (success, failure, or error)' },
    { name: 'reason', type: 'string', description: 'If outcome is error, the error reason' },
    { name: 'service_being_integrated.appended_value', type: 'string', description: 'Some data returned by Service_Being_Integrated to append to the lead' }
  ]


#
# Helpers ----------------------------------------------------------------
#

# A silly sample helper function. Note that it isn't exported, then delete it.
map_id = (id) ->
  return if (parseInt(id) % 2 == 0) then 'even' else 'odd'


#
# Exports ----------------------------------------------------------------
#
module.exports =
  request: request
  response: response
