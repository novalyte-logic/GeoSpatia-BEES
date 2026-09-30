# GeoSpatia Labs — Authoritative Data Source Audit & Registry
*California Battery Energy Storage System (BESS) Site Intelligence*

**Last Audited:** September 2026  
**Scope:** California BESS Project Diligence (Single-Site Intelligence Briefs)

---

## 1. Executive Summary & Source Reality

Geospatial Labs provides preliminary site intelligence to help California BESS developers screen candidate locations before committing capital to deep engineering, interconnection filings, and environmental reviews.

### Non-Negotiable Diligence Principles
1. **No Source &rarr; No Factual Claim**: Missing data must be explicitly marked `UNKNOWN`.
2. **No Capacity Guarantees**: Public queue, transmission, or ICA layers provide contextual reference only; they do not establish available headroom or guarantee interconnection outcomes.
3. **No Definitive Permitting/Legal Determinations**: Mapped hazard, zoning, or parcel overlays are preliminary references requiring local agency and surveyor verification.
4. **No Statewide Monolithic API**: California's 58 counties, 482 cities, and multiple balancing authorities operate distinct, heterogeneous systems.

---

## 2. Authoritative Source Directory & Access Matrix

| Source ID | Name & Agency | Family | Access Method | Status | Automated Fields Supported |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `src_caiso_queue` | **CAISO Public Interconnection Queue**<br>California ISO | Grid / Transmission | Periodic Excel/CSV Master Download (`caiso.com`) | `CONNECTED` | Queue ID, Project Name, Interconnection Customer, POI Substation/Bus, County, Capacity (MW), Technology, Study Process, COD, Status |
| `src_cec_substations` | **Electric Substations**<br>California Energy Commission | Energy GIS | ArcGIS REST FeatureServer (`services.gis.ca.gov`) | `CONNECTED` | Substation Name, Voltage (kV), Owner Utility, Status, Latitude/Longitude |
| `src_cec_transmission` | **California Electric Transmission Lines**<br>California Energy Commission | Energy GIS | ArcGIS REST FeatureServer (`services.gis.ca.gov`) | `CONNECTED` | Line Name, Operating Voltage (kV), Line Type, Owner/Operator, GeoJSON Path |
| `src_calfire_fhsz` | **Fire Hazard Severity Zones (SRA)**<br>CAL FIRE / Office of State Fire Marshal | Environmental Hazard | ArcGIS REST FeatureServer (`arcgis.com`) | `CONNECTED` | Hazard Severity Class (`Moderate`, `High`, `Very High`), SRA Status, Adoption Date |
| `src_ceqanet` | **CEQAnet Environmental Database**<br>California Governor's Office of Planning & Research (OPR) | Permitting / Environmental | Web REST / Search Portal (`ceqanet.opr.ca.gov`) | `CONNECTED` | SCH Number, Document Type (EIR, MND, NOD), Lead Agency, Project Title, Determination Status |
| `src_cpuc_ica_pge` | **PG&E Integration Capacity Analysis (ICA)**<br>Pacific Gas and Electric | Distribution Grid | Official IOU Data Portal & Download Map | `MANUAL` / `SETUP_REQUIRED` | Circuit Name, Section ID, Generation Capacity (MW), Operational Flexibility Constraints |
| `src_cpuc_ica_sce` | **SCE Distributed Resource Plan (DRP)**<br>Southern California Edison | Distribution Grid | Official IOU DRP Viewer | `MANUAL` / `SETUP_REQUIRED` | Circuit Name, Substation Bank, ICA Thermal/Voltage Limits (MW) |
| `src_cpuc_ica_sdge` | **SDG&E Interconnection Capacity Portal**<br>San Diego Gas & Electric | Distribution Grid | Official IOU ICA Web Portal | `MANUAL` / `SETUP_REQUIRED` | Feeder Name, Generation Hosting Capacity (MW) |
| `src_county_kern` | **Kern County Planning & GIS**<br>Kern County Planning & Natural Resources | Municipal / County | Parcel Viewer & GIS Portal | `MANUAL` | APN Zoning, General Plan Designation, Renewable Energy Siting Overlay |
| `src_county_fresno` | **Fresno County Public Works & Planning**<br>County of Fresno | Municipal / County | Assessor / Planning Portal | `MANUAL` | Zoning Code, Williamson Act Contract Status, Parcel Boundary Reference |
| `src_county_riverside` | **Riverside County TLMA (RIVCO GIS)**<br>Riverside County | Municipal / County | Open Data / Public GIS Portal | `MANUAL` | APN, Specific Plan Area, Multi-Species Habitat Conservation Plan (MSHCP) Status |
| `src_county_sb` | **San Bernardino Land Use Services**<br>San Bernardino County | Municipal / County | Public Access Parcel Portal | `MANUAL` | Land Use Zoning, Desert Renewable Energy Conservation Plan (DRECP) Flags |
| `src_mapbox_geocoder` | **Mapbox Geocoding & Elevation API**<br>Mapbox Inc. | Geocoding & Basemap | REST API (Domain-Restricted Token) | `CONNECTED` | Geographic Coordinates, Precision Match Level, California Jurisdiction Bounding |

---

## 3. Data Integration & Connector Architecture

### Connector Standard Lifecycle
Every automated connector implements the uniform lifecycle interface:
```typescript
interface IDataConnector<T> {
  sourceId: string;
  sourceName: string;
  validateConfiguration(): Promise<boolean>;
  checkHealth(): Promise<HealthCheckResult>;
  fetchData(params?: FetchParams): Promise<FetchResult<T>>;
  parseAndNormalize(raw: T): NormalizedRecord[];
  getMetadata(): ConnectorMetadata;
}
```

### Connector Health & Lifecycle States
1. **`CONNECTED`**: Verified active endpoint returning real data with HTTP 200 and schema-valid features.
2. **`SETUP_REQUIRED`**: Endpoint documented; awaiting local or customer credentials (e.g. IOU portal access).
3. **`MANUAL`**: Source does not provide an authorized machine API. Directs analyst to official portal with pre-filtered search terms.
4. **`STALE`**: Cached data exceeds documented refresh cadence; requires scheduled or manual trigger.
5. **`TEMPORARILY_FAILED`**: Source returned 5xx, 429, or connection timeout; backoff schedule initiated without data deletion.
6. **`UNSUPPORTED`**: Jurisdiction or agency lacks public electronic records.

---

## 4. Single-Site Intelligence Brief Evidence Schema

Every finding presented in a Single-Site Intelligence Brief is explicitly tied to an evidence record:

```json
{
  "findingId": "find_042_caiso_substation",
  "category": "GRID_AND_INTERCONNECTION",
  "topic": "Point of Interconnection Reference",
  "claim": "Candidate location is approximately 2.4 miles from the Wheeler Ridge 230kV Substation (PG&E / CAISO).",
  "status": "VERIFIED",
  "confidenceScore": 0.95,
  "sources": [
    {
      "sourceId": "src_cec_substations",
      "sourceName": "California Energy Commission Electric Substations",
      "url": "https://services.gis.ca.gov/arcgis/rest/services/Energy/Electric_Substations/FeatureServer/0",
      "publicationDate": "2024-06-15",
      "retrievalDate": "2026-09-29T18:00:00Z",
      "rawExcerpt": "SUB_NAME: WHEELER RIDGE, VOLTAGE: 230 KV, UTILITY: PG&E, STATUS: IN SERVICE",
      "licenseAttribution": "State of California / CEC Open Data"
    }
  ],
  "diligenceCaveat": "Proximity to a 230kV substation does not guarantee interconnection feasibility or available transfer capability."
}
```

---

## 5. Security, RLS & Attribution

1. **Client-Safe Public Boundaries**: Only public endpoints or client-safe proxy tokens are exposed in frontend views.
2. **Secret Isolation**: Service-role credentials, API keys, and internal database connection strings remain server-side in `.env.local`.
3. **Row-Level Security (RLS)**: Enforced on all Supabase tables. Public unauthenticated access is strictly forbidden for internal dashboard records.
4. **Attribution & Licensing**: Every map layer and data export displays official agency attribution, layer vintage, and appropriate legal disclaimers.
