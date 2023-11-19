.PHONY: build run recreate superuser initial-data check frontcheck isort black flake8 mypy lint migrations migrate clear

build:
	docker compose build

run:
	docker compose up

recreate:
	docker compose up --build --force-recreate

superuser:
	docker compose run --rm web python manage.py createsuperuser

initial-data:
	docker compose run --rm web python manage.py initialize_data

check:
	docker compose run --rm web isort --check-only .
	docker compose run --rm web black --check .
	docker compose run --rm web flake8 .
	docker compose run --rm web mypy .

frontcheck:
	docker compose run --rm -T frontend npm run check

isort:
	docker compose run --rm web isort .

black:
	docker compose run --rm web black .

flake8:
	docker compose run --rm web flake8 .

mypy:
	docker compose run --rm web mypy .

lint:
	docker compose run --rm -T web isort .
	docker compose run --rm -T web black .
	docker compose run --rm -T web flake8 .
	docker compose run --rm -T web mypy .

migrations:
	docker compose run --rm web python manage.py makemigrations

migrate:
	docker compose run --rm web python manage.py migrate

clear:
	docker compose down -v
	docker system prune --force
	docker volume prune --force
