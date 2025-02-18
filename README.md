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
3. prompt you for which parts of the template you'll need
4. copy the necessary source files, customized (roughly) with the real service name  

At this point you should be able to successfully run `npm install` and `npm test`
in the new directory. Remove whatever code isn't needed for the new integration
and customize as needed.
