# Change Log

All notable changes to this project will be documented in this file.

## [0.0.1] - 2022-05-31

#### Added

### Fixed

### Changed

- Changed [mainNav](https://github.com/bracesproul/earmark-frontend/tree/main/src/components/Nav/MainNav) and [sideNav](https://github.com/bracesproul/earmark-frontend/tree/main/src/components/Nav/SideNav) component to include wrapping <a> so url is displayed in bottom left of browser on mouse hover
- Change [mainNav](https://github.com/bracesproul/earmark-frontend/tree/main/src/components/Nav/MainNav) to check if user is logged in and display different links based on auth status

## [0.0.2] - 2022-06-01

#### Added
- Added "Authentication" section to [account settings](https://github.com/bracesproul/earmark-frontend/tree/main/src/components/Account/Account)
    - Added list with options to connect your: Google, Twitter, Facebook or Apple account for 3rd party auth to Earmark (just ui, not functional yet)
    - Added list with options to confirm your phone number and email address (just ui, not functional yet)

### Fixed
- Added `key` for react indexing elements to parent element inside Sidenav mapping through pages component

### Changed
- Changed font size of titles for [account settings elements](https://github.com/bracesproul/earmark-frontend/tree/main/src/components/Account/Account) to be 25px and h5