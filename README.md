# LeadConduit Integration Scaffold

Use this module as a starting-place scaffold for LeadConduit integrations. It includes standard structure and example code for both inbound and outbound integrations. 

Learn more about the [LeadConduit platform](http://activeprospect.com/products/leadconduit/).

## Initializing with `init.sh`

The `init.sh` script can be used to initialize a new integration module based on this template. It takes one parameter: the single-word name of the service being integrated with (e.g., "SendGrid"). This will create the directory, copy files into it, and crudely customize them.

## Customization steps 

1. Make a copy of this entire project. 
2. If you cloned it from github, delete the `.git` directory, and then run `git init` to create a new repo
3. run `npm install` to install the default node modules needed to start development
4. run `cake test` - this scaffold includes a dummy `test` task that searches for text substitutions you haven't made yet. Replace all the instances of "service_being_integrated" with the name of the service you're making an integration for. Once that's done, delete that task from `Cakefile` and uncomment the real `test` task, which should have all passing tests to start with. Get used to writing tests and executing them with `cake test`. **Your integration will not be added to the LeadConduit platform without adequate test coverage.**
5. Integrations may be made for requests that are "inbound" to LeadConduit, or for posts that are "outbound" from LeadConduit, or both. Customize or delete the [CoffeeScript](http://coffeescript.org/) files in the `src` and `spec` directories as needed.
6. create a Github repository and push your code
7. _review by ActiveProspect, changes or fixes as necessary_
8. _module is published to [npm](https://npmjs.org/)_
9. _module is made available in LeadConduit_


_Delete this line and everything above when your integration module is ready to publish._


# LeadConduit Service_Being_Integrated Integration

This module is for use on the LeadConduit platform, to integrate with [Service_Being_Integrated](https://service_being_integrated.com).

[![Build Status](https://travis-ci.org/service_being_integrated.png?branch=master)](https://travis-ci.org/service_being_integrated/)
