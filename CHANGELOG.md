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


## [0.0.3] - 2022-06-02

### Notes
New dashboard components only have static data, not hooked up to backend yet

#### Added
- Added new [/Dashboard](https://github.com/bracesproul/earmark-frontend/tree/main/src/components/Dashboard) folder inside [/src/components](https://github.com/bracesproul/earmark-frontend/tree/main/src/components)
- Added to [dashboard](https://github.com/bracesproul/earmark-frontend/blob/main/pages/dashboard/index.tsx)
    - Account Balance
    - Budgets
    - Goals
    - Spending Overview
    - Top Merchants
    - Total Spending
- New [page template](https://github.com/bracesproul/earmark-frontend/tree/main/src/components/PageTemplate), includes head, main, footer. Can add children to it (cleaner than old <Head /> component)

### Fixed

### Changed
- Moved transactions datagrid and api call from [/dashboard](https://github.com/bracesproul/earmark-frontend/blob/main/pages/dashboard/index.tsx) to [/dashboard/transactions](https://github.com/bracesproul/earmark-frontend/blob/main/pages/dashboard/transactions.tsx)
- Changed icon url to be static variable instead of passed by props in old <Head /> component - [head component](https://github.com/bracesproul/earmark-frontend/tree/main/src/components/Head)


## [0.0.4] - 2022-06-02

### Notes
Added verify email functionality

#### Added
- Added base Firebase analytics to Earmark
- Added app (from firebase initialize app) as custom hook from useFirestore (will change to useFirebase in future)
- Success/Error/Warning alerts for verify email

### Fixed

### Changed
- Verify email functionality is now working inside [account settings](https://github.com/bracesproul/earmark-frontend/tree/main/pages/account) page
- Connect a google account now works
- Added code to add facebook/twitter account, getting unknown errors at the moment