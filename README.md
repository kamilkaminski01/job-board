# Job Board
Job Board is a recruitment platform aimed at the IT industry and recruiters
that seek for employees who will meet their expectations. It allows registered
users to find their dream job and recruiters to advertise their job positions.

## Resources

The code repository is hosted on [GitHub](https://github.com/kamilkaminski01/job-board)

The server side application is written in the `Django` framework.

User interface is written in `TypeScript` using the `React` framework.

The project is maintained in a containerized environment with [Docker](https://www.docker.com/)

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

#### Troubleshooting

In case of errors with typing or missing dependencies, try to rebuild the
Docker images:

```bash
make clear
docker compose up --build --force-recreate
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

All backend code is formatted and verified by the `black`, `flake8`,
`mypy` and `isort` tools. Their configurations can be found in the
[.setup.cfg](backend/setup.cfg) file. Additionally, `pre-commit` [checks](.pre-commit-config.yaml)
are performed in order to verify whitespaces, credentials, etc.

Custom functions and methods use **type hints** to improve IDE code
completions, prevent from type errors and extend code documentation.

### Frontend

All frontend code is formatted and verified by the `prettier`,
`eslint` and `tsc` tools. Pre-commit hooks can be set up with `husky`.
CSS class names are defined according to the
[BEM](http://getbem.com/introduction/) methodology.
