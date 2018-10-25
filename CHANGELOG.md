# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Handle trailing slash in url to make both urls correct

## [0.1.1] - 2018-10-25
### Added
- Format time columns and display it relatively to the current time
- Logo links to the Blockexplorer homepage
- Display icon instead of transaction text type
- Display icon instead of node text status

### Changed
- Make header and header elements shorter
- Add 'zebra-style' in all lists
- Remove less important columns on mobile devices
- Display only previous element on the Breadcrumb list in mobile view 

### Fixed
- Handle trailing slash in routes
- Fix for long breadcrumbs on desktops 

### Removed
- Remove unused Card component
- Remove redundant Header component

## [0.1.0] - 2018-10-02
### Added
- Dashboard page containing list of nodes, blocks and transactions
- List of nodes
- List of blocks
- List of transactions
- Node page containing details and list of accounts
- Block page containing details and list of messages
- Message page containing details and list of transactions
- Account page containing details and list of transactions
- Transaction page containing details
- Search by node, block, transaction, account, message 
- Breadcrumbs
- Icon Table Cells
- Relatively formatted date
- Removed redundant columns on mobile view
- Messages and transactions columns combined on mobile view 

[Unreleased]: https://github.com/adshares/ads-operator-panel/compare/v0.1.1...HEAD

[0.1.1]: https://github.com/adshares/ads-operator/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/adshares/ads-operator-panel/releases/tag/v0.1.0
