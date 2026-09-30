import { ConnectorMetadata, ConnectorStatus, HealthCheckResult } from './types';

export const OFFICIAL_SOURCES: Record<string, ConnectorMetadata> = {
  src_caiso_queue: {
    sourceId: 'src_caiso_queue',
    name: 'CAISO Public Generator Interconnection Queue',
    agency: 'California Independent System Operator (CAISO)',
    family: 'CAISO',
    geographicCoverage: 'California (CAISO Balancing Authority Area)',
    accessMethod: 'FILE_INGESTION',
    officialUrl: 'https://www.caiso.com/library/interconnection-queue-reports',
    endpointUrl: 'http://www.caiso.com/Documents/CAISO-Master-Queue-Report.xlsx',
    updateCadence: 'Monthly',
    isAutomatedApproved: true,
    status: 'CONNECTED',
    licenseAttribution: 'California ISO Public Data (Terms of Use)',
    caveats: [
      'Queue status reflects study position, not guaranteed transmission capacity or final interconnection agreement.',
      'Active queue position does not assert exclusive site control or parcel rights.',
      'Commercial operation dates (COD) are developer-estimated milestones subject to Cluster study progress.'
    ]
  },
  src_mapbox_geocoder: {
    sourceId: 'src_mapbox_geocoder',
    name: 'Mapbox Places Geocoding & Jurisdiction Engine',
    agency: 'Mapbox Inc.',
    family: 'GEOCODER',
    geographicCoverage: 'California (Statewide)',
    accessMethod: 'REST_API',
    officialUrl: 'https://docs.mapbox.com/api/search/geocoding/',
    endpointUrl: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    updateCadence: 'Continuous',
    isAutomatedApproved: true,
    status: 'CONNECTED',
    licenseAttribution: 'Mapbox Geocoding API / OpenStreetMap Contributors',
    caveats: [
      'Geocoded point coordinates are approximate location matches and do not represent verified parcel boundaries or ALTA land surveys.',
      'Jurisdiction boundary matches are based on municipal incorporated territory bounding polygons.'
    ]
  },
  src_cec_spatial: {
    sourceId: 'src_cec_spatial',
    name: 'California Energy Commission Energy Maps & Spatial Data',
    agency: 'California Energy Commission (CEC)',
    family: 'CEC',
    geographicCoverage: 'California (Statewide)',
    accessMethod: 'MANUAL_PORTAL',
    officialUrl: 'https://www.energy.ca.gov/data-reports/energy-maps-and-spatial-data',
    endpointUrl: 'https://caenergy.maps.arcgis.com/home/index.html',
    updateCadence: 'Quarterly / Bi-Annual',
    isAutomatedApproved: false,
    status: 'MANUAL',
    licenseAttribution: 'State of California Open Data',
    caveats: [
      'CEC transmission and substation layers are illustrative planning references and may not reflect recent energizations or line re-ratings.',
      'Must not be used for real-time load or available capacity determinations.'
    ]
  },
  src_cpuc_ica_pge: {
    sourceId: 'src_cpuc_ica_pge',
    name: 'PG&E Integration Capacity Analysis (ICA) Portal',
    agency: 'Pacific Gas and Electric / CPUC',
    family: 'CPUC',
    geographicCoverage: 'PG&E Service Territory (Northern & Central CA)',
    accessMethod: 'MANUAL_PORTAL',
    officialUrl: 'https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/infrastructure/distribution-planning/data-portals-and-integration-capacity-analysis',
    endpointUrl: 'https://www.pge.com/en/clean-energy/solar-and-renewables/distribution-resource-planning.html',
    updateCadence: 'Monthly (CPUC Rule 21 Mandate)',
    isAutomatedApproved: false,
    status: 'MANUAL',
    licenseAttribution: 'PG&E / CPUC D.17-09-026',
    caveats: [
      'ICA values reflect distribution feeder hosting capacity only and exclude transmission-level thermal and cluster constraints.',
      'Public ICA data does not guarantee interconnection approval or reserve circuit headroom.'
    ]
  },
  src_cpuc_ica_sce: {
    sourceId: 'src_cpuc_ica_sce',
    name: 'SCE Distributed Resource Plan (DRP) & ICA Portal',
    agency: 'Southern California Edison / CPUC',
    family: 'CPUC',
    geographicCoverage: 'SCE Service Territory (Southern CA)',
    accessMethod: 'MANUAL_PORTAL',
    officialUrl: 'https://drp.sce.com/',
    endpointUrl: 'https://drp.sce.com/drp/icaMap',
    updateCadence: 'Monthly',
    isAutomatedApproved: false,
    status: 'MANUAL',
    licenseAttribution: 'SCE / CPUC Distributed Resource Planning',
    caveats: [
      'SCE DRP maps are intended for preliminary distribution screening only.',
      'Final interconnection costs and grid upgrades are determined exclusively through the formal Rule 21 / WDAT study process.'
    ]
  },
  src_calfire_fhsz: {
    sourceId: 'src_calfire_fhsz',
    name: 'CAL FIRE Fire Hazard Severity Zones (SRA / LRA)',
    agency: 'California Department of Forestry and Fire Protection (CAL FIRE)',
    family: 'ENVIRONMENTAL',
    geographicCoverage: 'California (Statewide SRA & LRA)',
    accessMethod: 'MANUAL_PORTAL',
    officialUrl: 'https://osfm.fire.ca.gov/what-we-do/community-wildfire-preparedness-and-mitigation/fire-hazard-severity-zones',
    endpointUrl: 'https://egis.fire.ca.gov/FHSZ/',
    updateCadence: 'Multi-Year Statutory Revision (2024 Revised)',
    isAutomatedApproved: false,
    status: 'MANUAL',
    licenseAttribution: 'State of California / CAL FIRE Office of the State Fire Marshal',
    caveats: [
      'FHSZ designations indicate statutory hazard classification under PRC 4201-4204.',
      'Designation does not substitute for site-specific NFPA 855 battery fire safety and Defensible Space compliance plans.'
    ]
  },
  src_ceqanet: {
    sourceId: 'src_ceqanet',
    name: 'CEQAnet Environmental Document Database',
    agency: "Governor's Office of Planning and Research (OPR)",
    family: 'ENVIRONMENTAL',
    geographicCoverage: 'California (Statewide)',
    accessMethod: 'MANUAL_PORTAL',
    officialUrl: 'https://ceqanet.opr.ca.gov/',
    endpointUrl: 'https://ceqanet.opr.ca.gov/Search/Advanced',
    updateCadence: 'Continuous Daily Filings',
    isAutomatedApproved: false,
    status: 'MANUAL',
    licenseAttribution: 'State of California OPR Public Records',
    caveats: [
      'CEQAnet indexes state-clearinghouse filings; local ministerial permits or exemption notices may not be cataloged.'
    ]
  },
  src_county_kern: {
    sourceId: 'src_county_kern',
    name: 'Kern County Planning & Natural Resources GIS',
    agency: 'County of Kern',
    family: 'COUNTY',
    geographicCoverage: 'Kern County, CA',
    accessMethod: 'MANUAL_PORTAL',
    officialUrl: 'https://www.kerncounty.com/government/planning-natural-resources',
    endpointUrl: 'https://kernpublicworks.com/maps-and-gis/',
    updateCadence: 'Continuous Local Updates',
    isAutomatedApproved: false,
    status: 'MANUAL',
    licenseAttribution: 'Kern County Public Records',
    caveats: [
      'APN boundaries, zoning codes (e.g. A, M-2, M-3), and conditional use permit (CUP) requirements must be verified directly with Kern County planning staff.'
    ]
  },
  src_county_fresno: {
    sourceId: 'src_county_fresno',
    name: 'Fresno County Public Works and Planning Portal',
    agency: 'County of Fresno',
    family: 'COUNTY',
    geographicCoverage: 'Fresno County, CA',
    accessMethod: 'MANUAL_PORTAL',
    officialUrl: 'https://www.fresnocountyca.gov/Departments/Public-Works-and-Planning',
    endpointUrl: 'https://www.fresnocountyca.gov/Departments/Public-Works-and-Planning/GIS-Mapping',
    updateCadence: 'Local Agency Updates',
    isAutomatedApproved: false,
    status: 'MANUAL',
    licenseAttribution: 'Fresno County Public Records',
    caveats: [
      'Williamson Act agricultural land contract status must be verified with the Fresno County Assessor.'
    ]
  }
};

export async function checkSourceHealth(sourceId: string): Promise<HealthCheckResult> {
  const meta = OFFICIAL_SOURCES[sourceId];
  if (!meta) {
    return {
      isHealthy: false,
      message: `Unknown source identifier: ${sourceId}`,
      checkedAt: new Date().toISOString()
    };
  }

  const start = Date.now();
  try {
    const res = await fetch(meta.officialUrl, {
      method: 'HEAD',
      signal: AbortSignal.timeout(6000)
    }).catch(() => fetch(meta.officialUrl, { method: 'GET', signal: AbortSignal.timeout(6000) }));

    const latency = Date.now() - start;
    if (res.ok || res.status === 403 || res.status === 405) {
      return {
        isHealthy: true,
        statusCode: res.status,
        latencyMs: latency,
        message: `Official portal verified accessible (${meta.accessMethod})`,
        checkedAt: new Date().toISOString()
      };
    }

    return {
      isHealthy: false,
      statusCode: res.status,
      latencyMs: latency,
      message: `Endpoint returned HTTP ${res.status}`,
      checkedAt: new Date().toISOString()
    };
  } catch (err: any) {
    return {
      isHealthy: false,
      latencyMs: Date.now() - start,
      message: `Health check connection timeout: ${err?.message || 'Network error'}`,
      checkedAt: new Date().toISOString()
    };
  }
}
