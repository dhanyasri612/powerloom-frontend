# Admin Access Setup

## Making a User Admin

To grant admin access to a user (yourself):

1. First, register your account through the app
2. Then run this command in the `server` directory:

```bash
cd server
npm run make-admin your@email.com
```

Replace `your@email.com` with your registered email address.

## Example

```bash
npm run make-admin dhanyasri@example.com
```

You'll see:
```
✅ User dhanyasri@example.com is now an admin!
```

## What This Does

- Updates your user role to "admin"
- Gives you access to the Admin panel
- Shows the "Admin" link in the navigation bar
- Allows access to:
  - Admin Dashboard (/admin)
  - Manage Products (/manage-products)
  - Manage Orders (/manage-orders)

## Security

- Only users with `role: "admin"` can access admin pages
- Non-admin users will see "Access Denied" if they try to access admin routes
- The Admin link is hidden from non-admin users in the navigation
