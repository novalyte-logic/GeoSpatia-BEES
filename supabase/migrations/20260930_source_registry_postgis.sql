-- ==============================================================================
-- GeoSpatia Labs: Authoritative Source Registry & Spatial Diligence Schema
-- Phase 5: Normalized Source Registry, PostGIS, Evidence, and Briefs
-- ==============================================================================

-- 1. Enable PostGIS in the dedicated extensions schema
CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA extensions;

-- Grant usage on extensions schema
GRANT USAGE ON SCHEMA extensions TO postgres, anon, authenticated, service_role;

-- 2. Authoritative Source Registry
CREATE TABLE IF NOT EXISTS public.sources (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  agency TEXT NOT NULL,
  family TEXT NOT NULL, -- 'CAISO', 'UTILITY', 'CPUC', 'CEC', 'COUNTY', 'ENVIRONMENTAL', 'GEOCODER'
  geographic_coverage TEXT NOT NULL, -- 'CALIFORNIA', 'KERN_COUNTY', 'SCE_TERRITORY', etc.
  access_method TEXT NOT NULL, -- 'REST_API', 'ARCGIS_REST', 'FILE_INGESTION', 'MANUAL_PORTAL'
  official_url TEXT NOT NULL,
  endpoint_url TEXT,
  update_cadence TEXT,
  is_automated_approved BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'SETUP_REQUIRED', -- 'CONNECTED', 'MANUAL', 'SETUP_REQUIRED', 'WAITING', 'STALE', 'TEMPORARILY_FAILED', 'UNSUPPORTED'
  last_attempted_at TIMESTAMPTZ,
  last_successful_at TIMESTAMPTZ,
  next_refresh_at TIMESTAMPTZ,
  feature_count INTEGER DEFAULT 0,
  latest_error_summary TEXT,
  checked_date DATE DEFAULT CURRENT_DATE,
  owner_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Source Datasets / Layers
CREATE TABLE IF NOT EXISTS public.source_datasets (
  id TEXT PRIMARY KEY,
  source_id TEXT NOT NULL REFERENCES public.sources(id) ON DELETE CASCADE,
  dataset_name TEXT NOT NULL,
  layer_type TEXT NOT NULL, -- 'FEATURE_LAYER', 'RASTER', 'TABLE', 'DOCUMENT'
  geometry_type TEXT, -- 'Point', 'MultiLineString', 'MultiPolygon', 'None'
  source_crs TEXT DEFAULT 'EPSG:4326',
  data_vintage DATE,
  license_attribution TEXT,
  schema_fields JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Ingestion Runs
CREATE TABLE IF NOT EXISTS public.ingestion_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT NOT NULL REFERENCES public.sources(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'RUNNING', -- 'RUNNING', 'COMPLETED', 'FAILED', 'PARTIAL'
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  duration_ms INTEGER,
  records_retrieved INTEGER DEFAULT 0,
  records_upserted INTEGER DEFAULT 0,
  error_message TEXT,
  checksum TEXT,
  parser_version TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Companies / Developers
CREATE TABLE IF NOT EXISTS public.companies (
  id TEXT PRIMARY KEY,
  legal_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  domain TEXT,
  headquarters TEXT,
  primary_technology_focus TEXT[],
  relevance_rationale TEXT,
  provenance TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Projects (BESS Candidate & Queue Sites)
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  county TEXT NOT NULL,
  city_or_area TEXT,
  location extensions.geography(Point, 4326),
  parcel_apn TEXT,
  technology TEXT NOT NULL DEFAULT 'Lithium-ion BESS',
  capacity_mw NUMERIC,
  duration_hours NUMERIC,
  interconnection_point TEXT,
  interconnection_utility TEXT,
  interconnection_status TEXT,
  developer_company_id TEXT REFERENCES public.companies(id) ON DELETE SET NULL,
  project_status TEXT NOT NULL DEFAULT 'Active Screening',
  permitting_stage TEXT,
  ceqa_status TEXT,
  last_checked_date DATE DEFAULT CURRENT_DATE,
  unknown_fields TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Evidence Items
CREATE TABLE IF NOT EXISTS public.evidence (
  id TEXT PRIMARY KEY,
  project_id TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
  source_id TEXT NOT NULL REFERENCES public.sources(id) ON DELETE RESTRICT,
  source_name TEXT NOT NULL,
  source_url_or_doc_id TEXT NOT NULL,
  source_date DATE,
  retrieved_at TIMESTAMPTZ DEFAULT NOW(),
  entity_field_supported TEXT NOT NULL,
  raw_value TEXT NOT NULL,
  normalized_value TEXT NOT NULL,
  verification_state TEXT NOT NULL DEFAULT 'UNKNOWN', -- 'VERIFIED', 'UNKNOWN', 'CONFLICTING', 'INFERENCE', 'DEEPER_DILIGENCE', 'SOURCE_UNAVAILABLE'
  confidence_score NUMERIC(3, 2) DEFAULT 0.50,
  conflict_details TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Single-Site Intelligence Briefs
CREATE TABLE IF NOT EXISTS public.site_briefs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  brief_version INTEGER NOT NULL DEFAULT 1,
  title TEXT NOT NULL,
  candidate_site_description TEXT NOT NULL,
  jurisdiction_match TEXT NOT NULL,
  grid_context_summary TEXT,
  environmental_summary TEXT,
  permitting_summary TEXT,
  review_status TEXT NOT NULL DEFAULT 'DRAFT', -- 'DRAFT', 'UNDER_REVIEW', 'APPROVED', 'DELIVERED'
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  disclaimer_acknowledged BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Brief Itemized Findings
CREATE TABLE IF NOT EXISTS public.brief_findings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brief_id UUID NOT NULL REFERENCES public.site_briefs(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- 'GRID_INTERCONNECTION', 'PARCEL_ZONING', 'ENVIRONMENTAL_HAZARD', 'PERMITTING_CEQA'
  finding_topic TEXT NOT NULL,
  claim TEXT NOT NULL,
  status TEXT NOT NULL, -- 'VERIFIED', 'UNKNOWN', 'CONFLICTING', 'INFERENCE', 'DEEPER_DILIGENCE', 'SOURCE_UNAVAILABLE'
  confidence_score NUMERIC(3,2) DEFAULT 0.50,
  evidence_ids TEXT[],
  diligence_caveat TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Manual Research Tasks
CREATE TABLE IF NOT EXISTS public.manual_research_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id TEXT REFERENCES public.projects(id) ON DELETE CASCADE,
  source_id TEXT REFERENCES public.sources(id) ON DELETE SET NULL,
  task_title TEXT NOT NULL,
  required_action TEXT NOT NULL,
  portal_url TEXT NOT NULL,
  search_terms TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'OPEN', -- 'OPEN', 'IN_PROGRESS', 'RESOLVED'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Spatial Indexes (GiST)
CREATE INDEX IF NOT EXISTS idx_projects_location ON public.projects USING GIST (location);

-- 12. Row Level Security (RLS)
ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.source_datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingestion_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brief_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manual_research_tasks ENABLE ROW LEVEL SECURITY;

-- Internal dashboard policies (Service role and authenticated internal staff only)
CREATE POLICY "Allow internal authenticated read on sources"
  ON public.sources FOR SELECT
  TO authenticated, service_role
  USING (true);

CREATE POLICY "Allow internal authenticated read on projects"
  ON public.projects FOR SELECT
  TO authenticated, service_role
  USING (true);

CREATE POLICY "Allow internal authenticated read on evidence"
  ON public.evidence FOR SELECT
  TO authenticated, service_role
  USING (true);

CREATE POLICY "Allow internal authenticated read on briefs"
  ON public.site_briefs FOR SELECT
  TO authenticated, service_role
  USING (true);
