.PHONY: build run recreate superuser check frontcheck lint migrations migrate clear

build:
	docker compose build

run:
	docker compose up

recreate:
	docker compose up --build --force-recreate

superuser:
	docker compose run --rm backend python manage.py createsuperuser

check:
	docker compose run --rm backend isort --check-only .
	docker compose run --rm backend black --check .
	docker compose run --rm backend flake8 .
	docker compose run --rm backend mypy .

frontcheck:
	docker compose run --rm -T frontend npm run check

lint:
	docker compose run --rm -T backend isort .
	docker compose run --rm -T backend black .
	docker compose run --rm -T backend flake8 .
	docker compose run --rm -T backend mypy .

migrations:
	docker compose run --rm backend python manage.py makemigrations

migrate:
	docker compose run --rm backend python manage.py migrate

clear:
	docker compose down -v
	docker system prune --force
	docker volume prune --force
