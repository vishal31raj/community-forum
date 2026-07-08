# Community Forum – Notes

## Setup

### Install dependencies

### Server

```bash
cd server
npm install
```

### Client

```bash
cd client
npm install
```

---

## Configure environment

Create a `.env` file inside the `server` directory.

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=community_forum
```

---

## Create database schema

From the `server` directory:

```bash
npm run migrate
```

---

## Seed sample data

```bash
npm run seed
```

This creates:

- 4 users (3 students, 1 moderator)
- 2 courses
- enrollments
- posts
- likes
- comments
- saved posts

---

## Start the API

```bash
npm run dev
```

Runs on:

```
http://localhost:3000
```

---

## Start the UI

```bash
cd client
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## Run unit + API tests

From the server:

```bash
npm test
```

Current test coverage includes:

- Unit tests for save / unsave service logic
- API happy path
- Authorization boundary

---

# Key Design Decisions

## Database schema

The application uses a normalized relational schema.

Core tables:

- Users
- Courses
- Enrollments
- Posts
- SavedPosts
- PostLikes
- Comments

Students are related to courses through the `Enrollments` table, allowing the feed to be filtered efficiently while supporting many-to-many relationships.

Posts belong to both:

- an author
- a course

This allows permissions to be enforced at the course level.

---

## Authentication

Authentication is intentionally lightweight for the assignment.

Every request sends:

```
x-user-id
```

The authentication middleware:

- validates the header
- loads the user
- attaches the user to `req.user`

Business authorization is implemented inside the service layer rather than controllers.

Examples:

- Only students can create posts.
- Students may only create/view posts for enrolled courses.
- Moderators may delete any post.
- Students may delete only their own posts.

Keeping authorization inside services keeps controllers thin and makes business rules easier to test.

---

## Efficient saved/liked flags

Rather than executing additional queries per post, the feed uses SQL `EXISTS` subqueries to compute:

- hasSaved
- hasLiked

Example:

```sql
EXISTS (
    SELECT 1
    FROM saved_posts
    WHERE
        post_id = posts.id
        AND user_id = ?
        AND deleted_at IS NULL
)
```

Counts (likes, comments, saves) are also calculated using SQL aggregate subqueries, allowing the feed to be retrieved in a single database query and avoiding N+1 query problems.

---

## Soft deletes

Posts and saved posts use soft deletion via a `deleted_at` timestamp.

Benefits:

- data recovery
- auditability
- easy reactivation of saved posts
- historical integrity

---

## Internationalization

The frontend uses **react-i18next** with English and Spanish message catalogs.

Pluralization is handled through i18next's plural rules.

Example:

- 1 save
- 2 saves

without custom frontend logic.

---

## React Query

Server state is managed using React Query.

Mutations invalidate affected queries to keep:

- feed
- saved posts
- post details

synchronized without manual state management.

---

# Trade-offs

Given the assignment time constraints, several features were intentionally simplified.

### Authentication

A real authentication system (JWT/OAuth/session cookies) was replaced with a simple `x-user-id` header to keep the focus on backend architecture and authorization.

---

### Pagination

Pagination is offset-based.

Cursor pagination would scale better for large datasets.

---

### Validation

Validation is implemented for API requests only.

Client-side form validation was intentionally kept minimal.

---

### Search and filtering

Only the required feed functionality was implemented.

Full-text search and advanced filtering were omitted.

---

### Test coverage

The required unit and API tests were implemented.

Additional integration tests and frontend tests were left out due to time.

---

### File uploads

The application currently supports text posts only.

Media uploads were intentionally excluded.

---

# What I'd Do Next

With another day, I would prioritize:

## 1. Real authentication

Replace the mock header authentication with:

- JWT
- refresh tokens
- proper login/logout

---

## 2. Optimistic updates

Use React Query optimistic mutations for:

- save
- like
- comment

to eliminate the brief loading delay.

---

## 3. Better pagination

Implement cursor-based pagination for improved scalability.

---

## 4. Frontend testing

Add:

- React Testing Library
- Vitest component tests
- Playwright end-to-end tests

---

## 5. Performance improvements

- Database indexes for feed queries
- Query profiling
- Response caching where appropriate

---

## 6. Notifications

Notify authors when:

- someone comments
- someone likes
- someone replies

---

## 7. Rich post features

- Markdown editor
- Image uploads
- Editing posts
- Mention users
- Tags

---

## 8. Better moderation tools

- Restore deleted posts
- Report inappropriate content
- Moderation dashboard
- Audit logs

---

Overall, the project was designed to emphasize clean separation of concerns, efficient database access, service-layer authorization, and a maintainable architecture while implementing the required assignment features within the available time.
