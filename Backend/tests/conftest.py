"""Shared fixtures for the backend API tests: `client` and `db`."""
import os
import sys
from pathlib import Path

import pytest
from dotenv import load_dotenv
from fastapi.testclient import TestClient
from pymongo import MongoClient

BACKEND_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND_DIR))
load_dotenv(BACKEND_DIR / ".env")
# Tests run on their own database, dropped before and after the run.
if not os.environ.get("DB_NAME", "").endswith("_test"):
    os.environ["DB_NAME"] = f"{os.environ.get('DB_NAME') or 'app'}_test"
TEST_DB = os.environ["DB_NAME"]


@pytest.fixture(scope="session")
def db():
    mongo = MongoClient(os.environ["MONGO_URL"], tz_aware=True)
    mongo.drop_database(TEST_DB)
    yield mongo[TEST_DB]
    mongo.drop_database(TEST_DB)
    mongo.close()


@pytest.fixture(scope="session")
def client(db):
    import server  # after DB_NAME points at the test database

    # One TestClient opened with `with` keeps every request on one event loop,
    # which Motor needs.
    with TestClient(server.app) as test_client:
        yield test_client
