/**
 * Standard Connector Types & Lifecycle Interface for GeoSpatia Labs
 */

export type SourceFamily =
  | 'CAISO'
  | 'UTILITY'
  | 'CPUC'
  | 'CEC'
  | 'COUNTY'
  | 'ENVIRONMENTAL'
  | 'GEOCODER';

export type AccessMethod =
  | 'REST_API'
  | 'ARCGIS_REST'
  | 'FILE_INGESTION'
  | 'MANUAL_PORTAL'
  | 'UNSUPPORTED';

export type ConnectorStatus =
  | 'CONNECTED'
  | 'MANUAL'
  | 'SETUP_REQUIRED'
  | 'WAITING'
  | 'STALE'
  | 'TEMPORARILY_FAILED'
  | 'UNSUPPORTED';

export type VerificationState =
  | 'VERIFIED'
  | 'UNKNOWN'
  | 'CONFLICTING'
  | 'INFERENCE'
  | 'DEEPER_DILIGENCE'
  | 'SOURCE_UNAVAILABLE';

export interface HealthCheckResult {
  isHealthy: boolean;
  statusCode?: number;
  latencyMs?: number;
  message: string;
  checkedAt: string;
  featuresCount?: number;
}

export interface ConnectorMetadata {
  sourceId: string;
  name: string;
  agency: string;
  family: SourceFamily;
  geographicCoverage: string;
  accessMethod: AccessMethod;
  officialUrl: string;
  endpointUrl?: string;
  updateCadence?: string;
  isAutomatedApproved: boolean;
  status: ConnectorStatus;
  licenseAttribution: string;
  caveats: string[];
}

export interface RawEvidenceRecord {
  field: string;
  rawValue: string;
  normalizedValue: string;
  verificationState: VerificationState;
  confidence: number;
  sourceDate?: string;
  docOrUrlRef: string;
  notes?: string;
}

export interface IDataConnector {
  metadata: ConnectorMetadata;
  checkHealth(): Promise<HealthCheckResult>;
  fetchSpatialContext(lat: number, lng: number, radiusMiles?: number): Promise<{
    success: boolean;
    data: any[];
    evidence: RawEvidenceRecord[];
    error?: string;
  }>;
}
