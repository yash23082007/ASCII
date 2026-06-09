from hashlib import sha256


def hash_password(password: str) -> str:
    return sha256(password.encode("utf-8")).hexdigest()


def verify_password(plain: str, hashed: str) -> bool:
    return hash_password(plain) == hashed
