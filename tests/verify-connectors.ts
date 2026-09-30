import { OFFICIAL_SOURCES, checkSourceHealth } from '../src/lib/connectors/sourceRegistry';
import { CaisoQueueConnector } from '../src/lib/connectors/caisoQueueConnector';
import { generateManualDiligenceTasks } from '../src/lib/connectors/manualSourceWorkflow';
import { generateSiteIntelligenceBrief } from '../src/lib/connectors/siteBriefGenerator';

async function runConnectorTests() {
  console.log('===============================================================');
  console.log(' GeoSpatia Labs — Real Data & Connector Verification Test Suite');
  console.log('===============================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, message: string) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  // 1. Source Registry Audit
  console.log('1. Auditing Authoritative Source Registry...');
  const sources = Object.values(OFFICIAL_SOURCES);
  assert(sources.length >= 7, `Registered ${sources.length} authoritative data sources`);
  
  for (const src of sources) {
    assert(!!src.sourceId && !!src.name && !!src.officialUrl, `Source [${src.sourceId}] has complete metadata`);
    assert(src.caveats.length > 0, `Source [${src.sourceId}] has mandatory diligence caveats`);
  }

  // 2. CAISO Connector
  console.log('\n2. Testing CAISO Queue Connector...');
  const caiso = new CaisoQueueConnector();
  const caisoContext = await caiso.fetchSpatialContext(35.3, -119.0);
  assert(caisoContext.success === true, 'CAISO connector fetched spatial context successfully');
  assert(caisoContext.evidence.length > 0, 'CAISO connector generated traceable evidence');
  assert(caisoContext.evidence[0].verificationState === 'VERIFIED', 'Evidence marked as VERIFIED');

  // 3. Manual Diligence Workflow Generator
  console.log('\n3. Testing County & Utility Diligence Task Generation...');
  const kernTasks = generateManualDiligenceTasks({
    candidateSite: 'Kern County, CA',
    county: 'Kern County',
    utility: 'PG&E',
    parcelApn: '042-120-008'
  });
  assert(kernTasks.some(t => t.category === 'DISTRIBUTION_ICA'), 'Generated Distribution ICA task');
  assert(kernTasks.some(t => t.sourceId === 'src_county_kern'), 'Generated Kern County specific zoning task with APN');
  assert(kernTasks.some(t => t.sourceId === 'src_calfire_fhsz'), 'Generated CAL FIRE FHSZ task');

  const sceTasks = generateManualDiligenceTasks({
    candidateSite: 'Riverside County, CA',
    county: 'Riverside County',
    utility: 'SCE'
  });
  assert(sceTasks.some(t => t.sourceId === 'src_cpuc_ica_sce'), 'Routed to SCE DRP portal for SCE service territory');

  // 4. Single-Site Intelligence Brief Generator
  console.log('\n4. Testing Single-Site Intelligence Brief Generation...');
  const brief = generateSiteIntelligenceBrief({
    siteLocation: 'APN 042-120-008, Kern County, CA',
    county: 'Kern County',
    jurisdiction: 'Unincorporated Kern County',
    projectType: 'Utility-scale BESS',
    capacityMw: 150,
    durationHours: 4,
    devStage: 'Site control / option',
    primaryDecisionQuestion: 'Interconnection cluster timing and local zoning overlay'
  });

  assert(!!brief.briefId, `Generated Brief ID: ${brief.briefId}`);
  assert(brief.findings.length >= 4, `Compiled ${brief.findings.length} itemized findings`);
  assert(brief.findings.every(f => f.evidenceCitations.length > 0), 'Every finding has evidence citations');
  assert(brief.unknownGaps.length > 0, `Explicitly listed ${brief.unknownGaps.length} unknown gap items`);
  assert(brief.mandatoryLimitations.length > 0, 'Mandatory diligence limitations included');
  assert(brief.sourceRegister.length >= 7, 'Full source register attached to brief');

  console.log('\n===============================================================');
  console.log(` Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log('===============================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runConnectorTests().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
