# LeadConduit Integration Template

Use this module as a starting-place scaffold for LeadConduit integrations.
It includes standard structure and example code for both inbound and outbound
integrations.

**Note:** this is a source-only repository. It should never be published
as a package to npm.

## Initializing with `init.sh`

The `init.sh` script can be used to initialize a new integration module based
on this template. It takes one parameter: the quoted name of the service being
integrated with (e.g., "SendGrid" or "Amazon Web Services"). This will:

1. create the conventionally-named directory at the same level as this template repo (i.e., at `../`)
2. initialize a `git` repo, including a dummy `README` and a new working branch called `init`
3. copy all the source files into there
4. (roughly) customize the copied source with the real service name  

For example: 

```bash
urprompt> pwd
/Users/me/src/leadconduit-integration-template  # this repo's dir
urprompt> ./init.sh "America Online"
Initialized empty Git repository in /Users/me/src/leadconduit-integration-america-online/.git/
[master (root-commit) cc59218] initialize repo
 1 file changed, 1 insertion(+)
 create mode 100644 README.md
Switched to a new branch 'init'
/Users/me/src/leadconduit-integration-template
.eslintrc.js -> ../leadconduit-integration-america-online/.eslintrc.js
.gitignore -> ../leadconduit-integration-america-online/.gitignore

# etc., for a bunch of files
```

At this point you should be able to successfully run `npm install` and `npm test`
in the new directory. Remove whatever code isn't needed for the new integration
and customize as needed.

_**Delete this line and everything above when your integration module is ready to publish.**_


# LeadConduit Service_Being_Integrated Integration

[![Build Status](https://github.com/activeprospect/leadconduit-integration-service_being_integrated/workflows/Node.js%20CI/badge.svg)](https://github.com/activeprospect/leadconduit-integration-service_being_integrated/actions)

This module is for use on the LeadConduit platform, to integrate with [Service_Being_Integrated](https://service_being_integrated.com).
