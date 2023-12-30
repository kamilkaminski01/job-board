# Job Board
Job Board is a recruitment platform aimed at the IT industry and recruiters
that seek for employees who will meet their expectations. It allows registered
users to find their dream job and recruiters to advertise their job positions.

## Resources

The code repository is hosted on [GitHub](https://github.com/kamilkaminski01/job-board)

The server side application is written in the `Django` framework.

User interface is written in `TypeScript` using the `React` framework.

Frontend building tool is handled by [Vite](https://vitejs.dev/)

The project is maintained in a containerized environment with [Docker](https://www.docker.com/)

Time-consuming tasks such as sending emails are
handled by an asynchronous worker. Currently, [`rq`](https://python-rq.org/)
is used to perform asynchronous operations.

- You can verify the running task statuses by using the RQ dashboard
  at [localhost:9181](http://localhost:9181). The dashboard should refresh
  automatically, displaying all pending tasks.

For more information, refer to the [RQ website](https://python-rq.org/)
or [`django-rq` documentation](https://github.com/rq/django-rq).

## Running from sources

### Docker Compose setup

```bash
git clone https://github.com/kamilkaminski01/job-board.git
cd job-board/
docker compose build
docker compose up
```

[Docker Compose](https://docs.docker.com/compose/install/) is leveraged
for reproducible builds and consistent local development environments.
The default [`docker-compose.yml`](docker-compose.yml) file is set up
to support local development with code reload and debug mode.

The [`Makefile`](Makefile) contains common commands that can be used to
build, run, and test the project. The most important commands include:
- `build`: builds the project with Docker Compose.
- `run`: runs the project with Docker Compose.
- `check`: performs backend static code checks.
- `frontcheck`: performs frontend static code checks.
- `clear`: stops the currently running services and removes the volumes.

### Application setup

After running the application, the following actions must be executed:

Run `make initial_data` to initialize database with example data including: <br />
If `make` isn't supported run: `docker compose run --rm web python manage.py initialize_data`

- global superuser (admin@admin.com)
- companies, containing:
  - (appfire@appfire.com),
  - (apple@apple.com),
  - (bluerider@software.com),
  - (centra@centra.com),
  - (ciklum@ciklum.com),
  - (facebook@facebook.com),
  - (google@google.com),
  - (microsoft@microsoft.com),
  - (mindpal@mindpal.com),
  - (netflix@netflix.com),
  - (netstation@netstation.com),
  - (zeto@zeto.com)
- candidates, containing:
  - (anna@candidate.com)
  - (kamil@candidate.com)
  - (krzysztof@candidate.com)
  - (mateusz@candidate.com)

Companies can log in to the admin panel with their associated email and password`(Admin-123)` <br />
Candidates can log in to their profile with their associated email and password`(Admin-123)`

Admin panel is available under `localhost:8000/admin` <br />
The site is available under `localhost:3000`

#### Troubleshooting

In case of errors with typing or missing dependencies, try to rebuild the
Docker images:

```bash
make clear
make build
make run
```

If `make` is not supported, the associated Docker Compose commands can be
used directly in order to build and run the project again:

```bash
docker compose down -v
docker system prune --force
docker volume prune --force
docker compose build
docker compose up
```

## Code quality standards

### Backend

All backend code is formatted and verified by the `black`, `flake8`,
`mypy` and `isort` tools. Their configurations can be found in the
[setup.cfg](backend/setup.cfg) file. Additionally, `pre-commit` [checks](.pre-commit-config.yaml)
are performed in order to verify whitespaces, credentials, etc.

Custom functions and methods use **type hints** to improve IDE code
completions, prevent from type errors and extend code documentation.

### Frontend

All frontend code is formatted and verified by the `prettier`,
`eslint` and `tsc` tools. Pre-commit hooks can be set up with `husky`.
CSS class names are defined according to the
[BEM](http://getbem.com/introduction/) methodology.
