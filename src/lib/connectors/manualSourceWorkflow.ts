import { OFFICIAL_SOURCES } from './sourceRegistry';

export interface ManualResearchTask {
  id: string;
  sourceId: string;
  sourceName: string;
  agency: string;
  category: 'DISTRIBUTION_ICA' | 'COUNTY_ZONING' | 'ENVIRONMENTAL_HAZARD' | 'CEQA_CLEARINGHOUSE' | 'PARCEL_ASSESSOR';
  title: string;
  requiredAction: string;
  portalUrl: string;
  suggestedSearchTerms: string[];
  caveat: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
}

export function generateManualDiligenceTasks(params: {
  candidateSite: string;
  county?: string;
  utility?: string;
  parcelApn?: string;
}): ManualResearchTask[] {
  const { candidateSite, county, utility, parcelApn } = params;
  const tasks: ManualResearchTask[] = [];

  const matchedCounty = (county || candidateSite).toLowerCase();
  const matchedUtility = (utility || '').toUpperCase();

  // 1. Distribution ICA Task
  if (matchedUtility.includes('SCE') || matchedCounty.includes('riverside') || matchedCounty.includes('bernardino') || matchedCounty.includes('orange') || matchedCounty.includes('los angeles')) {
    tasks.push({
      id: `task_ica_sce_${Date.now()}_1`,
      sourceId: 'src_cpuc_ica_sce',
      sourceName: OFFICIAL_SOURCES.src_cpuc_ica_sce.name,
      agency: OFFICIAL_SOURCES.src_cpuc_ica_sce.agency,
      category: 'DISTRIBUTION_ICA',
      title: 'SCE DRP Integration Capacity Analysis (ICA) Feeder Review',
      requiredAction: 'Open the official SCE DRP portal. Search candidate coordinates and record the primary circuit name, substation bank, and generation ICA (MW).',
      portalUrl: OFFICIAL_SOURCES.src_cpuc_ica_sce.endpointUrl || OFFICIAL_SOURCES.src_cpuc_ica_sce.officialUrl,
      suggestedSearchTerms: [candidateSite, 'Integration Capacity Analysis Generation Profile'],
      caveat: 'Public ICA values reflect distribution thermal/voltage models only and do not establish transmission cluster capacity.',
      status: 'OPEN'
    });
  } else if (matchedUtility.includes('SDG') || matchedCounty.includes('san diego')) {
    tasks.push({
      id: `task_ica_sdge_${Date.now()}_2`,
      sourceId: 'src_cpuc_ica_sdge',
      sourceName: OFFICIAL_SOURCES.src_cpuc_ica_sdge.name,
      agency: OFFICIAL_SOURCES.src_cpuc_ica_sdge.agency,
      category: 'DISTRIBUTION_ICA',
      title: 'SDG&E Interconnection Capacity Map Review',
      requiredAction: 'Query SDG&E ICA portal for nearby 12kV/69kV distribution lines and record available generation capacity.',
      portalUrl: OFFICIAL_SOURCES.src_cpuc_ica_sdge.endpointUrl || OFFICIAL_SOURCES.src_cpuc_ica_sdge.officialUrl,
      suggestedSearchTerms: [candidateSite],
      caveat: 'Preliminary hosting capacity values do not reserve queue position or guarantee interconnection.',
      status: 'OPEN'
    });
  } else {
    tasks.push({
      id: `task_ica_pge_${Date.now()}_3`,
      sourceId: 'src_cpuc_ica_pge',
      sourceName: OFFICIAL_SOURCES.src_cpuc_ica_pge.name,
      agency: OFFICIAL_SOURCES.src_cpuc_ica_pge.agency,
      category: 'DISTRIBUTION_ICA',
      title: 'PG&E Integration Capacity Analysis (ICA) Map Diligence',
      requiredAction: 'Access PG&E ICA viewer. Locate candidate parcel and inspect circuit section generation capacity and operational constraints.',
      portalUrl: OFFICIAL_SOURCES.src_cpuc_ica_pge.endpointUrl || OFFICIAL_SOURCES.src_cpuc_ica_pge.officialUrl,
      suggestedSearchTerms: [candidateSite, 'PG&E Distribution Resource Plan'],
      caveat: 'Public ICA hosting capacity is informational and does not guarantee interconnection feasibility under Rule 21.',
      status: 'OPEN'
    });
  }

  // 2. County Zoning & Planning Task
  if (matchedCounty.includes('kern')) {
    tasks.push({
      id: `task_county_kern_${Date.now()}_4`,
      sourceId: 'src_county_kern',
      sourceName: OFFICIAL_SOURCES.src_county_kern.name,
      agency: OFFICIAL_SOURCES.src_county_kern.agency,
      category: 'COUNTY_ZONING',
      title: 'Kern County Planning & Zoning Overlay Check',
      requiredAction: `Verify zoning designation (e.g., A - Exclusive Agricultural, M-2 Medium Industrial), General Plan designation, and Conditional Use Permit (CUP) requirements for candidate site.${parcelApn ? ` Search APN: ${parcelApn}.` : ''}`,
      portalUrl: OFFICIAL_SOURCES.src_county_kern.endpointUrl || OFFICIAL_SOURCES.src_county_kern.officialUrl,
      suggestedSearchTerms: [candidateSite, parcelApn || 'Kern County APN zoning lookup'],
      caveat: 'Local zoning overlay, setback standards, and CUP conditions must be confirmed with Kern County Planning & Natural Resources staff.',
      status: 'OPEN'
    });
  } else if (matchedCounty.includes('fresno')) {
    tasks.push({
      id: `task_county_fresno_${Date.now()}_5`,
      sourceId: 'src_county_fresno',
      sourceName: OFFICIAL_SOURCES.src_county_fresno.name,
      agency: OFFICIAL_SOURCES.src_county_fresno.agency,
      category: 'COUNTY_ZONING',
      title: 'Fresno County Zoning & Williamson Act Review',
      requiredAction: 'Verify parcel zoning and Williamson Act agricultural contract status through Fresno County Planning and Assessor portals.',
      portalUrl: OFFICIAL_SOURCES.src_county_fresno.endpointUrl || OFFICIAL_SOURCES.src_county_fresno.officialUrl,
      suggestedSearchTerms: [candidateSite, parcelApn || 'Fresno County parcel search'],
      caveat: 'Williamson Act non-renewal or cancellation requirements can add significant timeline constraints.',
      status: 'OPEN'
    });
  } else {
    tasks.push({
      id: `task_county_generic_${Date.now()}_6`,
      sourceId: 'src_county_generic',
      sourceName: 'Local County Planning & Assessor Portal',
      agency: 'Local Jurisdiction Planning Department',
      category: 'COUNTY_ZONING',
      title: 'Local Jurisdiction Zoning & Conditional Use Diligence',
      requiredAction: 'Contact local planning department or inspect county GIS parcel viewer to confirm BESS siting classification, allowable land use, and setback requirements.',
      portalUrl: 'https://www.counties.org/county-websites-profile-information',
      suggestedSearchTerms: [candidateSite, 'County Planning GIS parcel viewer'],
      caveat: 'Local ministerial vs. discretionary permitting requirements dictate CEQA review pathways.',
      status: 'OPEN'
    });
  }

  // 3. CAL FIRE Hazard Check
  tasks.push({
    id: `task_calfire_${Date.now()}_7`,
    sourceId: 'src_calfire_fhsz',
    sourceName: OFFICIAL_SOURCES.src_calfire_fhsz.name,
    agency: OFFICIAL_SOURCES.src_calfire_fhsz.agency,
    category: 'ENVIRONMENTAL_HAZARD',
    title: 'CAL FIRE Fire Hazard Severity Zone (FHSZ) Verification',
    requiredAction: 'Query CAL FIRE eGIS FHSZ viewer to determine whether the candidate parcel lies within State Responsibility Area (SRA) or Local Responsibility Area (LRA) Moderate, High, or Very High hazard zones.',
    portalUrl: OFFICIAL_SOURCES.src_calfire_fhsz.endpointUrl || OFFICIAL_SOURCES.src_calfire_fhsz.officialUrl,
    suggestedSearchTerms: [candidateSite, 'CAL FIRE FHSZ viewer SRA 2024'],
    caveat: 'FHSZ designation informs NFPA 855 defensible space and fire suppression engineering requirements.',
    status: 'OPEN'
  });

  // 4. CEQAnet Project Check
  tasks.push({
    id: `task_ceqa_${Date.now()}_8`,
    sourceId: 'src_ceqanet',
    sourceName: OFFICIAL_SOURCES.src_ceqanet.name,
    agency: OFFICIAL_SOURCES.src_ceqanet.agency,
    category: 'CEQA_CLEARINGHOUSE',
    title: 'CEQAnet Environmental Document Search',
    requiredAction: 'Search CEQAnet for prior Environmental Impact Reports (EIR), Mitigated Negative Declarations (MND), or Notices of Determination (NOD) on adjacent parcels.',
    portalUrl: OFFICIAL_SOURCES.src_ceqanet.endpointUrl || OFFICIAL_SOURCES.src_ceqanet.officialUrl,
    suggestedSearchTerms: [candidateSite, county || 'California BESS'],
    caveat: 'Prior environmental determinations establish local baseline studies and cumulative impact considerations.',
    status: 'OPEN'
  });

  return tasks;
}
