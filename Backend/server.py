from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
import uuid
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url, tz_aware=True)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Anchor-Bolt Company Limited API")
api_router = APIRouter(prefix="/api")

# All reads project away MongoDB's ObjectId (_id) so responses only ever carry "id".
PROJECTION = {"_id": 0}


# --------------------------------------------------------------------------- #
# Models
# --------------------------------------------------------------------------- #
class Service(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    index: str
    slug: str
    title: str
    line: str
    summary: str
    description: str
    deliverables: List[str]
    image: str
    image_alt: str
    category: str


class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    index: str
    title: str
    category: str
    location: str
    year: str
    scope: str
    details: List[str]
    image: str
    image_alt: str
    is_placeholder: bool = True


class Pillar(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    index: str
    title: str
    description: str
    icon: str


class ProcessStage(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    index: str
    title: str
    description: str
    deliverable: str


class ConsultationCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=80)
    phone: str = Field(min_length=7, max_length=40)
    email: EmailStr
    project_type: str = Field(min_length=2, max_length=80)
    project_location: str = Field(min_length=2, max_length=120)
    message: str = Field(min_length=10, max_length=2000)


class Consultation(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    reference: str
    full_name: str
    phone: str
    email: str
    project_type: str
    project_location: str
    message: str
    status: str
    created_at: datetime


# --------------------------------------------------------------------------- #
# Seed content (company figures are deliberately NOT invented — qualitative only)
# --------------------------------------------------------------------------- #
SERVICES_SEED = [
    {
        "index": "01",
        "slug": "building-construction",
        "title": "Building Construction",
        "line": "Construction",
        "summary": "Complete building packages delivered to specification.",
        "description": "Full construction of residential, commercial and institutional buildings — from setting out and foundations through structure, envelope and finishes. Work is planned against an agreed programme and supervised at every stage.",
        "deliverables": [
            "Site preparation, setting out and foundations",
            "Reinforced concrete and blockwork structures",
            "Roofing, envelope and weatherproofing",
            "Internal and external finishes to specification",
        ],
        "image": "https://images.unsplash.com/photo-1602757115429-b4190ae087be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8MXx8Y29uc3RydWN0aW9uJTIwc2l0ZSUyMGV4Y2F2YXRvciUyMGNyYW5lJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzkwMzU3NjMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "image_alt": "Reinforced concrete building frame finished in warm render, photographed from the site approach",
        "category": "construction",
    },
    {
        "index": "02",
        "slug": "residential-development",
        "title": "Residential Development",
        "line": "Development",
        "summary": "Homes designed, built and delivered as complete developments.",
        "description": "Single homes, apartment blocks and small estates developed end to end — land assessment, design coordination, construction and handover. Layouts, specifications and finishes are agreed with the client before work begins.",
        "deliverables": [
            "Land and site suitability assessment",
            "Design and specification coordination",
            "Full construction and services installation",
            "Handover documentation and defect review",
        ],
        "image": "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8MXx8bW9kZXJuJTIwcmVzaWRlbnRpYWwlMjBhcmNoaXRlY3R1cmUlMjBob3VzZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc5MDM1NzYzMXww&ixlib=rb-4.1.0&q=80&w=1080",
        "image_alt": "Two-storey contemporary residence with deep balconies and large glazed openings",
        "category": "development",
    },
    {
        "index": "03",
        "slug": "commercial-construction",
        "title": "Commercial Construction",
        "line": "Construction",
        "summary": "Retail, office and mixed-use buildings built for operation.",
        "description": "Commercial buildings constructed around the way the space will actually be used — service cores, loading, fire strategy, finishes and durability are resolved in planning, not on site.",
        "deliverables": [
            "Structural frames and long-span floor systems",
            "Facades, glazing and commercial fit-out",
            "Mechanical, electrical and drainage coordination",
            "Phased handover to keep operations running",
        ],
        "image": "https://images.unsplash.com/photo-1576731753569-3e93a228048c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8MXx8bW9kZXJuJTIwb2ZmaWNlJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc5MDM1NzY2MXww&ixlib=rb-4.1.0&q=80&w=1080",
        "image_alt": "Corner of a modern glass-clad commercial building against a clear sky",
        "category": "construction",
    },
    {
        "index": "04",
        "slug": "property-development",
        "title": "Property Development",
        "line": "Development",
        "summary": "Turning land into viable, well-built property.",
        "description": "We take a site from feasibility to completed asset: what can be built, what it will cost, how long it will take and what it will be worth on completion — then we build it.",
        "deliverables": [
            "Feasibility and development appraisal",
            "Statutory approvals and permitting support",
            "Contractor and consultant coordination",
            "Completion, valuation and asset handover",
        ],
        "image": "https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8M3x8bW9kZXJuJTIwcmVzaWRlbnRpYWwlMjBhcmNoaXRlY3R1cmUlMjBob3VzZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc5MDM1NzYzMXww&ixlib=rb-4.1.0&q=80&w=1080",
        "image_alt": "Completed low-rise residential block with clean concrete elevations under a bright sky",
        "category": "development",
    },
    {
        "index": "05",
        "slug": "renovation-remodeling",
        "title": "Renovation & Remodeling",
        "line": "Construction",
        "summary": "Upgrading and reconfiguring buildings that already stand.",
        "description": "Structural alterations, extensions, interior remodelling and full refurbishment. We survey what exists, confirm what can be changed safely, and sequence the work to minimise disruption.",
        "deliverables": [
            "Condition survey and structural assessment",
            "Extensions, openings and reconfiguration",
            "Services replacement and upgrade",
            "Interior finishes and joinery",
        ],
        "image": "https://images.unsplash.com/photo-1618832515490-e181c4794a45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8MXx8aW50ZXJpb3IlMjByZW5vdmF0aW9uJTIwY29uc3RydWN0aW9uJTIwcm9vbXxlbnwwfHx8fDE3OTAzNTc2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "image_alt": "Interior mid-refurbishment with protected units and protected flooring in place",
        "category": "construction",
    },
    {
        "index": "06",
        "slug": "project-management",
        "title": "Project Management",
        "line": "Management",
        "summary": "One accountable team across programme, cost and quality.",
        "description": "We manage the whole delivery chain on the client's behalf — consultants, contractors, programme, cost control, quality inspections and reporting — so decisions are made with full information.",
        "deliverables": [
            "Programme development and progress tracking",
            "Cost planning, valuations and change control",
            "Contractor procurement and coordination",
            "Quality inspections and written progress reports",
        ],
        "image": "https://images.unsplash.com/photo-1608303588026-884930af2559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8M3x8YXJjaGl0ZWN0JTIwYmx1ZXByaW50JTIwc2l0ZSUyMHBsYW5zJTIwZW5naW5lZXIlMjBkcmF3aW5nc3xlbnwwfHx8fDE3OTAzNTc2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "image_alt": "Team reviewing architectural drawings across a desk during a project planning session",
        "category": "management",
    },
    {
        "index": "07",
        "slug": "civil-structural-works",
        "title": "Civil & Structural Works",
        "line": "Construction",
        "summary": "Groundworks, drainage and structural engineering.",
        "description": "The works that carry everything else: excavation, retaining structures, reinforced concrete frames, drainage, access and external works — built to engineering specification and inspected in stages.",
        "deliverables": [
            "Excavation, earthworks and retaining structures",
            "Reinforced concrete frames and slabs",
            "Drainage, culverts and water management",
            "Access roads, paving and external works",
        ],
        "image": "https://images.unsplash.com/photo-1649320316177-775fe2d67ca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8Mnx8Y29uc3RydWN0aW9uJTIwd29ya2VycyUyMHNjYWZmb2xkaW5nJTIwc3RlZWwlMjBmcmFtZXxlbnwwfHx8fDE3OTAzNTc2MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "image_alt": "Construction worker on scaffolding beside a building structure",
        "category": "construction",
    },
    {
        "index": "08",
        "slug": "real-estate-solutions",
        "title": "Real Estate Solutions",
        "line": "Advisory",
        "summary": "Advice on acquiring, developing and holding property.",
        "description": "Practical support for clients investing in property — site appraisal, build-cost guidance, development strategy and construction oversight for owners who are not on site themselves.",
        "deliverables": [
            "Site identification and appraisal",
            "Build-cost and programme guidance",
            "Development strategy and phasing advice",
            "Owner representation and site oversight",
        ],
        "image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8Mnx8bW9kZXJuJTIwcmVzaWRlbnRpYWwlMjBhcmNoaXRlY3R1cmUlMjBob3VzZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc5MDM1NzYzMXww&ixlib=rb-4.1.0&q=80&w=1080",
        "image_alt": "Modern white and timber residence with landscaped approach",
        "category": "advisory",
    },
]

PROJECTS_SEED = [
    {
        "index": "01",
        "title": "Airport Ridge Residence",
        "category": "Residential",
        "location": "Airport Ridge, Sekondi-Takoradi",
        "year": "2024",
        "scope": "A private residence built on a sloping plot, with retaining works to the rear, a reinforced concrete frame and a fully fitted interior.",
        "details": ["Retaining and groundworks", "Reinforced concrete frame", "Complete interior fit-out"],
        "image": "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8MXx8bW9kZXJuJTIwcmVzaWRlbnRpYWwlMjBhcmNoaXRlY3R1cmUlMjBob3VzZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc5MDM1NzYzMXww&ixlib=rb-4.1.0&q=80&w=1080",
        "image_alt": "Two-storey contemporary residence with glazed balconies",
    },
    {
        "index": "02",
        "title": "Sanderling Court Apartments",
        "category": "Residential",
        "location": "Airport Ridge, Sekondi-Takoradi",
        "year": "2024",
        "scope": "A small apartment development delivered as one programme: structure, services, common areas and external works.",
        "details": ["Multiple-unit structure", "Shared services and drainage", "External paving and landscaping"],
        "image": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8Mnx8bW9kZXJuJTIwcmVzaWRlbnRpYWwlMjBhcmNoaXRlY3R1cmUlMjBob3VzZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc5MDM1NzYzMXww&ixlib=rb-4.1.0&q=80&w=1080",
        "image_alt": "White and timber multi-unit residential building",
    },
    {
        "index": "03",
        "title": "Harbour View Commercial Centre",
        "category": "Commercial",
        "location": "Takoradi Harbour Area",
        "year": "2023",
        "scope": "Commercial block with ground-floor retail and upper-floor office space, built in phases so trading continued through construction.",
        "details": ["Long-span structural frame", "Glazed commercial facade", "Phased handover"],
        "image": "https://images.unsplash.com/photo-1576731753569-3e93a228048c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8MXx8bW9kZXJuJTIwb2ZmaWNlJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc5MDM1NzY2MXww&ixlib=rb-4.1.0&q=80&w=1080",
        "image_alt": "Glass-clad office building photographed at its corner",
    },
    {
        "index": "04",
        "title": "Market Circle Retail Block",
        "category": "Commercial",
        "location": "Sekondi",
        "year": "2023",
        "scope": "Retail units and covered circulation built to a tight urban footprint, with drainage and hard standing upgraded around the block.",
        "details": ["Compact urban footprint", "Covered circulation", "Drainage and hard standing"],
        "image": "https://images.unsplash.com/photo-1479293581560-aee98bb24f7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8M3x8bW9kZXJuJTIwb2ZmaWNlJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc5MDM1NzY2MXww&ixlib=rb-4.1.0&q=80&w=1080",
        "image_alt": "Gridded glass and concrete commercial facade",
    },
    {
        "index": "05",
        "title": "Effia Ridge Structural Frame",
        "category": "Construction",
        "location": "Effia, Takoradi",
        "year": "2024",
        "scope": "Civil and structural package: excavation, foundations, columns, beams and slabs for a multi-storey building, inspected in stages.",
        "details": ["Deep foundations", "Reinforced concrete frame", "Staged structural inspections"],
        "image": "https://images.unsplash.com/photo-1664312616511-81fe2e745cb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8NHx8Y29uc3RydWN0aW9uJTIwc2l0ZSUyMGV4Y2F2YXRvciUyMGNyYW5lJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzkwMzU3NjMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "image_alt": "Heavy plant working on a civil engineering site",
    },
    {
        "index": "06",
        "title": "Beach Road Mixed-Use Development",
        "category": "Development",
        "location": "Beach Road, Takoradi",
        "year": "2025",
        "scope": "Feasibility, approvals and construction of a mixed-use scheme combining retail, office and residential floors on one site.",
        "details": ["Development appraisal", "Statutory approvals", "Single-contract delivery"],
        "image": "https://images.unsplash.com/photo-1603294278610-b5bd0506303e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8Mnx8bW9kZXJuJTIwb2ZmaWNlJTIwYnVpbGRpbmclMjBnbGFzcyUyMGZhY2FkZSUyMGV4dGVyaW9yfGVufDB8fHx8MTc5MDM1NzY2MXww&ixlib=rb-4.1.0&q=80&w=1080",
        "image_alt": "Blue and white concrete building rising above the street",
    },
    {
        "index": "07",
        "title": "Adiembra Villa Renovation",
        "category": "Renovation",
        "location": "Adiembra, Sekondi",
        "year": "2024",
        "scope": "Refurbishment of an existing building: structural strengthening, reconfiguration of internal walls, new services and a full interior finish.",
        "details": ["Structural strengthening", "Full reconfiguration", "New services and finishes"],
        "image": "https://images.unsplash.com/photo-1634586648651-f1fb9ec10d90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8Mnx8aW50ZXJpb3IlMjByZW5vdmF0aW9uJTIwY29uc3RydWN0aW9uJTIwcm9vbXxlbnwwfHx8fDE3OTAzNTc2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "image_alt": "Interior of a building stripped back to structure during refurbishment",
    },
    {
        "index": "08",
        "title": "Kwesimintsim Estate Works",
        "category": "Construction",
        "location": "Kwesimintsim, Western Region",
        "year": "2024",
        "scope": "Estate infrastructure: access roads, surface water drainage, kerbs and boundary works delivered ahead of the building plots.",
        "details": ["Access roads and kerbs", "Surface water drainage", "Boundary and external works"],
        "image": "https://images.unsplash.com/photo-1602757115429-b4190ae087be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMDQ0NzY3fDB8MXxzZWFyY2h8MXx8Y29uc3RydWN0aW9uJTIwc2l0ZSUyMGV4Y2F2YXRvciUyMGNyYW5lJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzkwMzU3NjMxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "image_alt": "Concrete building structure on a site with external works under way",
    },
]

PILLARS_SEED = [
    {
        "index": "01",
        "title": "Quality Construction",
        "description": "Workmanship held to specification from foundations to finishes, with materials and methods agreed before work begins.",
        "icon": "quality",
    },
    {
        "index": "02",
        "title": "Professional Project Management",
        "description": "One accountable team for programme, cost control, site coordination and reporting — so nothing falls between trades.",
        "icon": "management",
    },
    {
        "index": "03",
        "title": "Reliable Service",
        "description": "Clear commitments on sequence and delivery, with progress you can follow at every stage of the project.",
        "icon": "reliable",
    },
    {
        "index": "04",
        "title": "Client-Focused Approach",
        "description": "Decisions taken with the client, not around them — from the first consultation to the final review.",
        "icon": "client",
    },
]

PROCESS_SEED = [
    {
        "index": "01",
        "title": "Consultation",
        "description": "We discuss your requirements, the site and the outcome you need. You leave with a clear view of what is possible and what it involves.",
        "deliverable": "Site review · Requirement brief",
    },
    {
        "index": "02",
        "title": "Planning",
        "description": "We develop the project approach and scope — drawings, specification, programme, responsibilities and cost plan — agreed before work starts.",
        "deliverable": "Scope · Programme · Cost plan",
    },
    {
        "index": "03",
        "title": "Construction",
        "description": "The project is executed with quality and precision: supervised trades, controlled materials, staged inspections and repor
