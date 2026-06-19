# Student Notes Application

## Setup Steps

1. Clone repository
2. Run `composer install`
3. Run `npm install`
4. Configure env details `.env`
6. Configure database
7. Run `php artisan migrate`
8. Run `php artisan serve`
9. Run `npm run dev`

## Completed Features

* Create notes
* View notes list
* Archive notes
* Priority filtering
* Pagination
* Validation
* Success failed toast notifications
* Responsive interface using Tailwind CSS
* Unit test

## Skipped Due To Time

* Authentication
* User for notes
* Full authorization policy based on authenticated users

## Trade-offs / Assumptions

* Notes are public and not tied to users.
* Priority filtering is performed on the client side.
* Authorization was not implemented because no authentication system exists.
* Pagination is handled server-side using Laravel pagination.
* Toast notifications are used instead of modal dialogs.
