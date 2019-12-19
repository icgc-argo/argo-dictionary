# Data Dictionary

This is a working space for collaborating on the ARGO Data Dictionary.

File Schemas are found in `/schemas`

Variables, such as recurring scripts, regex, or code lists are found in `/references`. These values can be used in the `restrictions` section of a schema by refering to them with this pattern: `#/path/to/value`.

Example variable usage:

```
{
  "name": "submitter_donor_id",
  "valueType": "string",
  "description": "Unique identifier of the donor, assigned by the data provider.",
  "meta": {
    "examples": "90234,BLD,donor_89,AML-90"
  },
  "restrictions": {
      "required": true,
      "regex": "#/regex/submitter_id"
  }
}
```

More information on writing schemas can be found [here](https://wiki.oicr.on.ca/pages/viewpage.action?pageId=134938807).

## Scripts

Scripts are provided in NodeJS, requiring npm and Node installed locally.

**To use these commands** first install the npm dependencies by running: `npm install`

### Compile Whole Dictionary

`npm run compile`

Will collect all schemas and references and format them into a full dictionary object that could be uploaded to lectern. An abridged version of the dictionary will be printed to the console, and the full compiled dictionary will be output to the file `./dictionary.json`

You will be prompted to provide the dictionary name and version number, or leave them blank and accept the defaults (`ICGC-ARGO Data Dictionary` and `0.0` respectively).

> Note: The `dictionary.json` file is ignored by git. This file can be uploaded to Lectern, for example, but it shouldn't appear in this repo.
