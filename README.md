# Github Team Management Tool

**Very** simple CLI for managing github org teams and users.

## Usage

1. clone / fork this repo
2. set your `GH_CSV_SYNC_TOKEN` environment variable to a github token you've created
3. update the team / user settings 
4. run `npm install`
5. run `./gh-csv-sync.js`

## TODO

- support for loading team / user config from various file formats like CSV
- CLI niceties like dry-run option, for example
- support for creating/managing teams in addition to just adding / removing users
- plenty more..

## Contributing

Pull requests are welcome.

## CHANGELOG

- v0.0.1 - 4.7.14: initial release - basic adding / deleting of users to hardcoded teams and org
