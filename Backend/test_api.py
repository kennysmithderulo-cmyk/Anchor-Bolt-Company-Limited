"""Focused API tests for the Anchor-Bolt Company Limited product routes."""
import uuid


def _consultation_payload():
    return {
        "full_name": "Test Client",
        "phone": "+233 244 57 96 89",
        "email": f"client-{uuid.uuid4().hex[:8]}@example.com",
        "project_type": "Building Construction",
        "project_location": "Airport Ridge, Sekondi-Takoradi",
        "message": "We would like a consultation for a two-storey residential building.",
    }


def test_health_check(client):
    response = client.get("/api/")
    assert response.status_code == 200
    assert "message" in response.json()


def test_services_list_and_detail(client):
    response = client.get("/api/services")
    assert response.status_code == 200
    services = response.json()
    assert len(services) == 8
    assert all(service["slug"] and service["deliverables"] for service in services)

    slug = services[0]["slug"]
    detail = client.get(f"/api/services/{slug}")
    assert detail.status_code == 200
    assert detail.json()["slug"] == slug
    assert client.get("/api/services/not-a-real-service").status_code == 404


def test_projects_list_filter_and_detail(client):
    all_projects = client.get("/api/projects").json()
    assert len(all_projects) == 8
    assert all(project["is_placeholder"] is True for project in all_projects)

    filtered = client.get("/api/projects", params={"category": "residential"}).json()
    assert filtered
    assert all(project["category"] == "Residential" for project in filtered)

    assert client.get("/api/projects", params={"category": "Nonexistent"}).json() == []

    project_id = all_projects[0]["id"]
    detail = client.get(f"/api/projects/{project_id}")
    assert detail.status_code == 200
    assert detail.json()["id"] == project_id
    assert client.get("/api/projects/does-not-exist").status_code == 404


def test_pillars_and_process(client):
    pillars = client.get("/api/pillars")
    process = client.get("/api/process")
    assert pillars.status_code == 200 and len(pillars.json()) == 4
    assert process.status_code == 200 and len(process.json()) == 4
    assert [stage["title"] for stage in process.json()] == [
        "Consultation",
        "Planning",
        "Construction",
        "Completion",
    ]


def test_create_consultation_persists_to_mongo(client, db):
    payload = _consultation_payload()
    response = client.post("/api/consultations", json=payload)
    assert response.status_code == 201
    body = response.json()
    assert body["reference"].startswith("AB-")
    assert body["status"] == "received"
    assert body["email"] == payload["email"]

    stored = db.consultations.find_one({"id": body["id"]})
    assert stored is not None
    assert stored["email"] == payload["email"]
    assert stored["project_type"] == payload["project_type"]
    db.consultations.delete_one({"id": body["id"]})


def test_create_consultation_validation_errors(client):
    assert client.post("/api/consultations", json={}).status_code == 422

    bad_email = _consultation_payload()
    bad_email["email"] = "not-an-email"
    assert client.post("/api/consultations", json=bad_email).status_code == 422

    short_message = _consultation_payload()
    short_message["message"] = "too short"
    assert client.post("/api/consultations", json=short_message).status_code == 422
