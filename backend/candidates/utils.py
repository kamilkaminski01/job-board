import hashlib
from functools import partial
from pathlib import Path
from typing import IO

import requests  # type: ignore
from django.core.exceptions import ValidationError
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
    if file.url.startswith("/media"):
        try:
            open(file.url)
        except FileNotFoundError:
            return False
    else:
        if requests.head(file.url).status_code != 200:
            return False
    return True
