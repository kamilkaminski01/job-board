import hashlib
from functools import partial
from pathlib import Path
from typing import IO

import requests  # type: ignore
from django.core.exceptions import ValidationError
from django.core.files.storage import default_storage
from django.db.models.fields.files import FieldFile


def hash_file(file: IO, block_size: int = 65536) -> str:
    hasher = hashlib.md5()
    for buf in iter(partial(file.read, block_size), b""):
        hasher.update(buf)
    return hasher.hexdigest()


def get_file_extension(filename: str) -> str:
    return Path(filename).suffix.lower()


def validate_file_extension(value):
    extension = get_file_extension(value.name)
    valid_extensions = [".png", ".jpg", ".jpeg"]
    if extension not in valid_extensions:
        raise ValidationError("File not supported")


def does_file_exist(file: FieldFile) -> bool:
    if not file:
        return False

    file_url = file.url
    if file_url.startswith("/media"):
        return default_storage.exists(file_url)  # type: ignore
    else:
        response = requests.head(file_url)
        return response.status_code == 200
