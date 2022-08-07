# Change Log

All notable changes to this project will be documented in this file.


## [0.0.1] - 2022-05-31

### Added

### Fixed

### Changed
- Changed [mainNav](https://github.com/bracesproul/earmark-frontend/tree/main/src/components/Nav/MainNav) and [sideNav](https://github.com/bracesproul/earmark-frontend/tree/main/src/components/Nav/SideNav) component to include wrapping <a> so url is displayed in bottom left of browser on mouse hover
- Change [mainNav](https://github.com/bracesproul/earmark-frontend/tree/main/src/components/Nav/MainNav) to check if user is logged in and display different links based on auth status


## [0.0.2] - 2022-06-01

### Added
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

### Added
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

### Added
- Added base Firebase analytics to Earmark
- Added app (from firebase initialize app) as custom hook from useFirestore (will change to useFirebase in future)
- Success/Error/Warning alerts for verify email

### Fixed

### Changed
- Verify email functionality is now working inside [account settings](https://github.com/bracesproul/earmark-frontend/tree/main/pages/account) page
- Connect a google account now works
- Added code to add facebook/twitter account, getting unknown errors at the moment


## [0.0.5] - 2022-06-02

### Notes
Sign in with provider 1/3 working

### Added
- Button to sign in with google/facebook/twitter **FACEBOOK/TWITTER STILL GIVING UNKNOWN ERRORS**
- Added error/warning alerts for sign in with google/facebook/twitter
- Added sign in with google/facebook/twitter code to [useAuth](https://github.com/bracesproul/earmark-frontend/tree/main/src/lib/hooks/useAuth) hook

### Fixed

### Changed


## [0.0.6] - 2022-06-05

### Notes

### Added
- Icons to buttons for sign in with provider (google/facebook/twitter)
- /api/dashboard route to fetch data for the main /dashboard page
- "Skeleton" placeholder animation for dashboard page when data is still loading

### Fixed
- Connected Spending Overview, Top Merchants, Total Spending to backend (date changing still not working)

### Changed


## [0.0.7] - 2022-06-05

### Notes

### Added
- Code to change date range in api paramaters

### Fixed
- Connected the date range selection to work and recall new data on selection
- Fixed the placeholder animation for dashboard page when data is still loading

### Changed


## [0.0.8] - 2022-06-06

### Notes

### Added
- New Plaid Link export from [PlaidLink component folder](https://github.com/bracesproul/earmark-frontend/tree/main/src/components/PlaidLink) for connect bank through institutions page
- Connect bank through Plaid Link button on institutions page (code in [datagrid accounts](https://github.com/bracesproul/earmark-frontend/tree/main/src/components/DatagridAccounts)folder)
- Added step in [sign up](https://github.com/bracesproul/earmark-frontend/tree/main/src/components/Auth/SignUp) to link bank account to Earmark account

### Fixed
- Write to firebase through api call to backend instead of client side write for sign up process

### Changed
- Removed background color from all css files
- Changed card headers to be bold for all dashboard cards
- Changed table headers to be bold for all dashboard tables
- Changed select dropdown to be bold for all dashboard select dropdowns


## [0.0.9] - 2022-06-06

### Notes
Commit [main 83f5618](https://github.com/bracesproul/earmark-frontend/commit/83f5618)

Plaid Link sidenav option removed because it was recalling everytime the page was loaded, or a new page was loaded. This was making excess api calls. Switched to link banks through the institutions page or when you first create an account.

### Added
- Connected [Stacked Bar Chart](https://github.com/bracesproul/earmark-frontend/tree/main/src/components/ReCharts/StackedBarChart) & [Line Chart](https://github.com/bracesproul/earmark-frontend/tree/main/src/components/ReCharts/LineChartComponent) & [Pie Chart](https://github.com/bracesproul/earmark-frontend/tree/main/src/components/ReCharts/PieChartComponent) to backend, select date range working, categories not working
- Added [/api/visuals](https://github.com/bracesproul/earmark-frontend/blob/main/pages/api/visuals.ts) route for fetching data for visualizations 

### Fixed

### Changed
- Removed plaid link option from sidenav (see notes for more info)


## [0.0.10] - 2022-06-08

### Notes
Commit [main 641de87](https://github.com/bracesproul/earmark-frontend/commit/641de87)

Dynamic transaction code inside pages file, not yet inside it's own component folder

### Added
- Added funcationality to individual bank account transactions page at [/dashboard/[ins_id]](https://github.com/bracesproul/earmark-frontend/blob/main/pages/dashboard/%5Bins_id%5D.tsx)
- Added [/api/dynamicTransactions](https://github.com/bracesproul/earmark-frontend/blob/main/pages/api/dynamicTransactions.ts) for fetching data to populate the dynamic transactions page

### Fixed

### Changed


## [0.0.11] - 2022-06-08

### Notes
Commit [main 4830c83](https://github.com/bracesproul/earmark-frontend/commit/4830c83)

Todo - *Apply responsive code for datagrid in /dashboard/ins_id page to all other components which use mui datagrid*

### Added
- Added global ThemeProvider to _app.tsx for global standardization of colors
- Added DynamicTransactions folder to components to hold code for /dashboard/ins_id page
- Selected account button on /dashboard/ins_id page now is contained if that account is selected, outlined if not selected
- Mobile viewing for /dashboard/ins_id page works well

### Fixed
- errors now print to console as `console.error` instead of `console.log`

### Changed
- Removed unnecessary `console.log` statments
- Buttons now use the mui light color as default


## [0.0.12] - 2022-06-08

### Notes
Commit [main 5d81c60](https://github.com/bracesproul/earmark-frontend/commit/5d81c60)

### Added
- Added button inside 'account balances' component on /dashboard page to link to individual account transactions page
- Added tooltip to
    - transactions button inside 'account balances'
    - Account button options inside /dashboard/ins_id page (desktop only)
    - transactions and remove buttons inside /dashboard/institutions page

### Fixed
- On page load for /dashboard/ins_id page, the query paramater `account_id` is checked, if it is not present, the first account is selected, else the account is selected based on the query paramater
- Account details on /dashboard page is now connected to backend
- Added keys to components which map through arrays and didn't have key, causing warning errors

### Changed
- When "Transactions" button is clicked on /dashboard/institutions page, it now pushes `?account_id=<ACCOUNT ID>` to the url as a query paramter
- Disabled recurring, investments, transfers sidenav tabs because they're not setup yet
- Made institution name on account balances bold
- Removed connect bank from sidenav (excess api calls, moved to startup proccess and moved to /dashboard/institutions page)


## [0.0.13] - 2022-06-08

### Notes
Commit [main e08ddd7](https://github.com/bracesproul/earmark-frontend/commit/e08ddd7)

### Added

### Fixed
- Button to go to /dashboard/institutions from account details on /dashboard now works
- added `http://` to begining of url for backend server inside `globalVars` folder

### Changed


## [0.0.14] - 2022-06-24

### Notes
Commit [main 11186e9](https://github.com/bracesproul/earmark-frontend/commit/11186e9)
All `/dashboard` api calls are now cached for 24 hours*. Each call is cached, this means if a user never requests to see spending overview data from the past month and only looks at 24 hours and 7 days, the last month will not be cached and when that is requested it will make an api call.


*account details are cached for a month, however on each page load the account details are pulled from cache and a new request is made to check if any account details have changed. If so the cache is updated.

### Added
- Added caching to all api calls from `/dashboard`

### Fixed

### Changed
- Changed the entire file structure to be more industry standard and follow best practice
- Moved a lot of unused code to the `/archive` folder


## [0.0.15] - 2022-06-24

### Notes
Commit [main 908bca0](https://github.com/bracesproul/earmark-frontend/commit/908bca0)

### Added
- Added caching to all api calls from `/visualize`
- Added caching to all api calls from `/transactions`
- Added new api route `api/getAllTransactionsByCategory`

### Fixed

### Changed


## [0.0.16] - 2022-06-26

### Notes
Commit [main 1bbd901](https://github.com/bracesproul/earmark-frontend/commit/1bbd901)

### Added
- Added component for recurring transactions - `src/components/RecurringTransactions`
- Added recurring api route `/api/recurring`
- Added functionality to recurring page, calls backend, dialog with transaction summary, caches data, etc.
- Added allAccountInfo  `/api/allAccountInfo`
- Added caching to DatagridAccounts

### Fixed
- Fixed styling on recurring page inside `/styles/Dashboard/Investments.module.css`

### Changed
- Commented out captcha import inside `_app.tsx`
- Undisabled Recurring nav button from sidenav


## [0.0.17] - 2022-06-27

### Notes
Commit [main 2c7fd64](https://github.com/bracesproul/earmark-frontend/commit/2c7fd64)

*Now checks for undefined responses, if so it displays a seprate datagrid component with a message **

### Added

### Fixed
- Added proper error handling to `/recurring` tab*
- Changed font size for added, fixed, changed (added removed)

### Changed

### Removed


## [0.0.18] - 2022-06-29

### Notes
Commit [main f77c616](https://github.com/bracesproul/earmark-frontend/commit/f77c616)

### Added
- Added useRemoveCache hook, currently has func to remove cache for accounts on new account link.

### Fixed

### Changed
- Changed recurring api to call from global vars instead of from production server

### Removed


## [0.0.19] - 2022-07-15

### Notes
Commit to move code from laptop to desktop
Commit [main ](https://github.com/bracesproul/earmark-frontend/commit/)

### Added

### Fixed

### Changed

### Removed


## [0.0.20] - 2022-08-02

### Notes
Commit [main f4ab1c1](https://github.com/bracesproul/earmark-frontend/commit/f4ab1c1)
So many changes, some breaking changes that will need to be fixed

### Added
- Added useBackground fetch for all API calls -- inside custom hook now for easy access and debugging
- Added _middleware.tsx to check auth before granting user access to a given page

### Fixed

### Changed
- Changed how visualize works, uses url params for global state of dates and chart type
- Changed every api call inside a component/page to call the hook instead of a function inside said component

### Removed


## [0.0.21] - 2022-08-02

### Notes
Commit [main 1156698](https://github.com/bracesproul/earmark-frontend/commit/1156698)

### Added

### Fixed
- Fixed spacing and box sizing for dashboard, looks better on mobile and desktop now

### Changed

### Removed


## [0.0.22] - 2022-08-02

### Notes
Commit [main a9dc42b](https://github.com/bracesproul/earmark-frontend/commit/a9dc42b)

### Added

### Fixed

### Changed
- changed how the all transactions page works, now displays all transactions, but each account has its own datagrid

### Removed


## [0.0.23] - 2022-08-05

### Notes
Commit [main a9dc42b](https://github.com/bracesproul/earmark-frontend/commit/a9dc42b)
* Global theme will flicker on reload if theme !== default theme, unable to fix (next simply can't do it, from my understanding)
* uses cookies to store selected theme ['earmark-theme'] will either be 'light' or 'dark'

### Added
- Custom _document and _app, now _app.tsx automatically includes sidenav and color mode switch to all pages
  - This means I can get rid of my PageTemplate component, all pages can just include components
- Added global MUI theme in _app.tsx for changing theme to light/dark *
- Added custom theme switch to change app theme (light/dark mode)
- Added custom hook for app theme (light/dark mode)

### Fixed
- Fixed _middleware.tsx to check auth before granting user access to a given page
- Fixed sizing responsiveness on dashboard
- Fixed sizing responsiveness on all visualizations, will actually show up on mobile now

### Changed

### Removed
- Removed PageTemplate component from all pages, or other templates/page skeletons


## [0.0.24] - 2022-08-07

### Notes
Commit [main ](https://github.com/bracesproul/earmark-frontend/commit/)

### Added
- parseAmounts function for formatting currency amounts
  - ex takes number and returns with 2 decimal points and a `$` sign in front
  - `33.173888888` -> `$33.17`   ||   `-71.6` -> `-$71.60`
- TotalSpendingAccordion component for total spending accordion
- TotalSpendingDetails component for total spending details
- TotalSpending new component inside /v2 folder for total spending

### Fixed
- Total Spending on /dashboard, now displays total spending for all accounts

### Changed

### Removed