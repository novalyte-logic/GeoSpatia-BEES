"use client";

import * as React from "react";
import Link from "next/link";
import {
  Maximize2,
  Minimize2,
  Compass,
  Layers,
  Mountain,
  Zap,
  MapPin,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  X,
  Plus,
  Minus,
  Search,
  Flame,
  Droplets,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Eye,
  Sliders,
  Filter,
} from "lucide-react";
import {
  MAPBOX_PUBLIC_TOKEN,
  isMapboxConfigured,
  searchAddress,
  type GeocodingFeature,
} from "@/lib/mapbox";
import { Button } from "@/components/ui/button";
import "mapbox-gl/dist/mapbox-gl.css";

export interface DiligenceEvidenceItem {
  id: string;
  category: "fire" | "grid" | "environmental" | "zoning";
  title: string;
  badge: string;
  severity: "good" | "watch" | "priority";
  officialSource: string;
  findingSummary: string;
  developmentImpact: string;
  engineerChecklist: string[];
}

export interface SampleSiteDefinition {
  id: string;
  name: string;
  category: string;
  county: string;
  jurisdiction: string;
  apn: string;
  grossAcres: number;
  developableAcres: number;
  constrainedAcres: number;
  zoning: string;
  elevationFt: number;
  coordinates: [number, number]; // [lng, lat]
  zoom: number;
  pitch: number;
  bearing: number;
  substation: {
    name: string;
    voltage: string;
    distanceMiles: string;
    coordinates: [number, number];
  };
  transmissionCorridor: {
    name: string;
    voltage: string;
    pathCoordinates: [number, number][];
  };
  parcelPolygonCoordinates: [number, number][];
  fireHazardPolygonCoordinates: [number, number][];
  environmentalConstraintPolygonCoordinates: [number, number][];
  fireHazardTier: string;
  environmentalConstraintTier: string;
  evidenceItems: DiligenceEvidenceItem[];
  hudMetrics: Array<{
    label: string;
    value: string;
  }>;
}

export const REAL_SAMPLE_SITES: SampleSiteDefinition[] = [
  {
    id: "bess-gates",
    name: "Gates 230kV / 500kV Intertie Candidate",
    category: "BESS Site Screen",
    county: "Fresno County, CA",
    jurisdiction: "Unincorporated Fresno County (AL-20)",
    apn: "085-120-04S",
    grossAcres: 82.4,
    developableAcres: 74.8,
    constrainedAcres: 7.6,
    zoning: "AL-20 (Limited Ag / Utility Intertie)",
    elevationFt: 295,
    coordinates: [-120.0882, 36.1424],
    zoom: 14.8,
    pitch: 42,
    bearing: -18,
    substation: {
      name: "PG&E Gates Substation",
      voltage: "500kV / 230kV Hub",
      distanceMiles: "0.6 mi NW",
      coordinates: [-120.0965, 36.1472],
    },
    transmissionCorridor: {
      name: "Gates-Gregg 230kV & Los Banos 500kV Path",
      voltage: "230kV / 500kV",
      pathCoordinates: [
        [-120.103, 36.151],
        [-120.0965, 36.1472],
        [-120.0915, 36.1442],
        [-120.0845, 36.1415],
        [-120.076, 36.1382],
      ],
    },
    parcelPolygonCoordinates: [
      [-120.093, 36.1395],
      [-120.0835, 36.1395],
      [-120.0835, 36.1452],
      [-120.093, 36.1452],
      [-120.093, 36.1395],
    ],
    fireHazardPolygonCoordinates: [
      [-120.105, 36.136],
      [-120.08, 36.136],
      [-120.08, 36.153],
      [-120.105, 36.153],
      [-120.105, 36.136],
    ],
    environmentalConstraintPolygonCoordinates: [
      [-120.086, 36.1395],
      [-120.0835, 36.1395],
      [-120.0835, 36.1452],
      [-120.086, 36.1452],
      [-120.086, 36.1395],
    ],
    fireHazardTier: "CAL FIRE SRA Moderate Wildfire Zone",
    environmentalConstraintTier: "FEMA Zone X & 15-ft Irrigation Canal Easement",
    evidenceItems: [
      {
        id: "ev-fire-gates",
        category: "fire",
        title: "CAL FIRE SRA Moderate Hazard Zone (Foothill Interface)",
        badge: "Watch Item",
        severity: "watch",
        officialSource: "CAL FIRE Fire Hazard Severity Zones (2024 GIS Dataset) · CPUC Fire-Threat Tier 1",
        findingSummary: "Parcel falls within CAL FIRE State Responsibility Area (SRA) Moderate rating, transitioning to High severity 1.8 mi west in Diablo foothills.",
        developmentImpact: "Requires 100-ft defensible vegetation clearance perimeter, NFPA 855 battery enclosure thermal runaway mitigation, and dedicated on-site emergency water hookups.",
        engineerChecklist: [
          "Validate minimum fire truck turning radius with Fresno County Fire Protection District.",
          "Confirm on-site water storage tank volume for 2-hour suppression requirement.",
          "Check local emergency vehicle ingress road width requirements (minimum 20 ft clear).",
        ],
      },
      {
        id: "ev-grid-gates",
        category: "grid",
        title: "PG&E Gates Substation (500kV / 230kV Nexus)",
        badge: "Favorable Adjacency",
        severity: "good",
        officialSource: "California Energy Commission (CEC) Electric Infrastructure Layer · CAISO Interconnection Queue",
        findingSummary: "Candidate parcel is 0.6 mi (3,168 ft) southeast of Gates Substation 230kV bus along established utility right-of-way.",
        developmentImpact: "Low generator-tie line exposure minimizes private condemnation risk, but CAISO Cluster 14/15 queue congestion requires queue position review.",
        engineerChecklist: [
          "Request CAISO published transmission study deliverability status for Gates 230kV bus.",
          "Confirm PG&E right-of-way crossing permissions for short gen-tie corridor.",
        ],
      },
      {
        id: "ev-env-gates",
        category: "environmental",
        title: "FEMA Zone X & Agricultural Canal Setback",
        badge: "Verified Buffer",
        severity: "good",
        officialSource: "FEMA National Flood Hazard Layer (NFHL) Firm Panel 06019C2875H · Westlands Water District Cadastre",
        findingSummary: "Parcel is outside 100-year flood hazard. 15-ft irrigation ditch easement along eastern boundary encumbers 7.6 acres.",
        developmentImpact: "Net developable area is 74.8 acres out of 82.4 gross acres. No wetland dredge or 404 permit triggered.",
        engineerChecklist: [
          "Survey precise centerline of eastern irrigation ditch before layout drafting.",
          "Check local drainage retention basin volume specifications with Fresno County Public Works.",
        ],
      },
      {
        id: "ev-zoning-gates",
        category: "zoning",
        title: "Fresno County AL-20 Exclusive Agriculture",
        badge: "CUP Pathway",
        severity: "watch",
        officialSource: "Fresno County Zoning Ordinance Chapter 816 · General Plan Agriculture Element",
        findingSummary: "Underlying zoning is AL-20. Energy storage facility classified as Major Utility requiring a Conditional Use Permit (CUP).",
        developmentImpact: "Discretionary planning commission hearing required with CEQA Mitigated Negative Declaration (MND). Typical timeline 6-9 months.",
        engineerChecklist: [
          "Verify Williamson Act contract cancellation status on parcel APN 085-120-04S.",
          "Draft agricultural preservation mitigation narrative for county planning submission.",
        ],
      },
    ],
    hudMetrics: [
      { label: "Coordinates", value: "36.1424° N, 120.0882° W" },
      { label: "Fire Severity", value: "CAL FIRE Moderate SRA" },
      { label: "Interconnection", value: "Gates 230kV Bus (0.6 mi)" },
      { label: "Developable Area", value: "74.8 AC / 82.4 AC Gross" },
    ],
  },
  {
    id: "solar-rosamond",
    name: "Rosamond / Antelope Valley Corridor",
    category: "Solar + Storage Screen",
    county: "Kern County, CA",
    jurisdiction: "Unincorporated Kern County (A-1)",
    apn: "359-020-18",
    grossAcres: 158.6,
    developableAcres: 138.2,
    constrainedAcres: 20.4,
    zoning: "A-1 (Limited Ag / Renewable Overlay)",
    elevationFt: 2320,
    coordinates: [-118.1724, 34.8643],
    zoom: 14.5,
    pitch: 44,
    bearing: 16,
    substation: {
      name: "SCE Whirlwind Substation",
      voltage: "500kV / 230kV Hub",
      distanceMiles: "1.4 mi NE",
      coordinates: [-118.191, 34.872],
    },
    transmissionCorridor: {
      name: "Whirlwind-Antelope 230kV Transmission Path",
      voltage: "230kV",
      pathCoordinates: [
        [-118.2, 34.876],
        [-118.191, 34.872],
        [-118.1815, 34.868],
        [-118.1724, 34.8643],
        [-118.162, 34.86],
      ],
    },
    parcelPolygonCoordinates: [
      [-118.178, 34.8608],
      [-118.1668, 34.8608],
      [-118.1668, 34.8678],
      [-118.178, 34.8678],
      [-118.178, 34.8608],
    ],
    fireHazardPolygonCoordinates: [
      [-118.188, 34.856],
      [-118.158, 34.856],
      [-118.158, 34.874],
      [-118.188, 34.874],
      [-118.188, 34.856],
    ],
    environmentalConstraintPolygonCoordinates: [
      [-118.178, 34.8608],
      [-118.1668, 34.8608],
      [-118.1668, 34.863],
      [-118.178, 34.863],
      [-118.178, 34.8608],
    ],
    fireHazardTier: "CAL FIRE LRA High Fire Hazard Zone",
    environmentalConstraintTier: "Ephemeral Desert Wash Drainage Corridor (20.4 AC)",
    evidenceItems: [
      {
        id: "ev-fire-rosamond",
        category: "fire",
        title: "CAL FIRE LRA High Fire Hazard Severity Zone",
        badge: "Priority Item",
        severity: "priority",
        officialSource: "CAL FIRE Local Responsibility Area (LRA) High Fire Hazard Severity Maps 2024",
        findingSummary: "High wind exposure in Antelope Valley classifies parcel as High Wildfire Zone requiring non-combustible building envelopes.",
        developmentImpact: "Requires enhanced 100-foot perimeter defensible buffer, NFPA 855 blast deflection barriers, and dedicated fire department knox-box access.",
        engineerChecklist: [
          "Submit preliminary defensible space layout to Kern County Fire Department for early signoff.",
          "Verify fire lane paving specifications capable of 75,000 lb emergency apparatus load.",
        ],
      },
      {
        id: "ev-grid-rosamond",
        category: "grid",
        title: "SCE Whirlwind Substation 230kV Connection",
        badge: "Favorable Adjacency",
        severity: "good",
        officialSource: "CAISO Grid Interconnection Atlas · SCE Southern Transmission Operations",
        findingSummary: "1.4 miles northeast to Whirlwind 500kV/230kV substation along Whirlwind-Antelope transmission corridor.",
        developmentImpact: "Corridor has existing transmission easements; gen-tie line routing traverses flat desert topography with minimal grading.",
        engineerChecklist: [
          "Check available bay capacity at Whirlwind 230kV switchyard with SCE grid planner.",
        ],
      },
      {
        id: "ev-env-rosamond",
        category: "environmental",
        title: "Ephemeral Desert Drainage Wash Corridor",
        badge: "Watch Item",
        severity: "watch",
        officialSource: "USGS National Hydrography Dataset (NHD) · California Desert Conservation Area Records",
        findingSummary: "Southern boundary intersected by seasonal dry desert wash covering 20.4 acres.",
        developmentImpact: "Excludes 20.4 acres from active solar racking and BESS pad layout. Net developable area is 138.2 acres.",
        engineerChecklist: [
          "Perform seasonal dry-wash hydrological study to establish California Dept. of Fish & Wildlife 1602 Lake & Streambed exemption.",
        ],
      },
    ],
    hudMetrics: [
      { label: "Coordinates", value: "34.8643° N, 118.1724° W" },
      { label: "Fire Severity", value: "CAL FIRE High LRA" },
      { label: "Interconnection", value: "Whirlwind 230kV (1.4 mi)" },
      { label: "Developable Area", value: "138.2 AC / 158.6 AC Gross" },
    ],
  },
  {
    id: "ev-ontario",
    name: "Ontario Logistics Freight Corridor",
    category: "EV Fleet Charging Screen",
    county: "San Bernardino County, CA",
    jurisdiction: "City of Ontario / San Bernardino (M-2)",
    apn: "0211-191-05",
    grossAcres: 14.2,
    developableAcres: 12.1,
    constrainedAcres: 2.1,
    zoning: "M-2 (Heavy Industrial / Logistics)",
    elevationFt: 980,
    coordinates: [-117.5851, 34.0522],
    zoom: 15.5,
    pitch: 36,
    bearing: 28,
    substation: {
      name: "SCE Guasti Substation",
      voltage: "66kV / 12kV Feeder",
      distanceMiles: "0.4 mi E",
      coordinates: [-117.578, 34.056],
    },
    transmissionCorridor: {
      name: "SCE 66kV Commercial Distribution Corridor",
      voltage: "66kV",
      pathCoordinates: [
        [-117.574, 34.058],
        [-117.578, 34.056],
        [-117.5815, 34.054],
        [-117.5851, 34.0522],
        [-117.589, 34.0505],
      ],
    },
    parcelPolygonCoordinates: [
      [-117.5878, 34.0503],
      [-117.5824, 34.0503],
      [-117.5824, 34.0541],
      [-117.5878, 34.0541],
      [-117.5878, 34.0503],
    ],
    fireHazardPolygonCoordinates: [
      [-117.59, 34.048],
      [-117.58, 34.048],
      [-117.58, 34.056],
      [-117.59, 34.056],
      [-117.59, 34.048],
    ],
    environmentalConstraintPolygonCoordinates: [
      [-117.5878, 34.0503],
      [-117.585, 34.0503],
      [-117.585, 34.0515],
      [-117.5878, 34.0515],
      [-117.5878, 34.0503],
    ],
    fireHazardTier: "CAL FIRE Non-VHFHSZ (Low Wildfire Threat)",
    environmentalConstraintTier: "Municipal Stormwater Retention Basin Easement (2.1 AC)",
    evidenceItems: [
      {
        id: "ev-fire-ontario",
        category: "fire",
        title: "Urban Industrial Zone · Municipal Fire Hydrant Grid",
        badge: "Low Risk",
        severity: "good",
        officialSource: "City of Ontario Fire Department Geographic Service Layer",
        findingSummary: "Not in a Wildfire Severity Zone. Full municipal pressurized hydrant network on Jurupa and Milliken avenues.",
        developmentImpact: "No defensible vegetation clearing permit needed; standard industrial battery room ventilation and NFPA 70 compliance.",
        engineerChecklist: [
          "Confirm water flow pressure at nearest street hydrant (target 1,500 GPM @ 20 PSI).",
        ],
      },
      {
        id: "ev-grid-ontario",
        category: "grid",
        title: "SCE Guasti Substation 66kV Commercial Circuit",
        badge: "Watch Item",
        severity: "watch",
        officialSource: "SCE Electric Rule 21 Hosting Capacity Portal · CEC Substation Index",
        findingSummary: "Substation is 0.4 mi east. Distribution-level 66kV/12kV circuit serves surrounding heavy industrial freight hub.",
        developmentImpact: "Large megawatt-scale fleet EV load (e.g. 5MW-10MW) will likely trigger substation transformer upgrade study.",
        engineerChecklist: [
          "Submit SCE Rule 21 pre-application report for Guasti 66kV feeder load headroom.",
        ],
      },
    ],
    hudMetrics: [
      { label: "Coordinates", value: "34.0522° N, 117.5851° W" },
      { label: "Fire Severity", value: "Low / Municipal Grid" },
      { label: "Distribution Node", value: "Guasti 66kV (0.4 mi E)" },
      { label: "Developable Area", value: "12.1 AC / 14.2 AC Gross" },
    ],
  },
  {
    id: "land-wheeler",
    name: "Wheeler Ridge Intertie Land Cluster",
    category: "Grid-Adjacent Land Screen",
    county: "Kern County, CA",
    jurisdiction: "Kern County (A Exclusive Ag)",
    apn: "240-080-22",
    grossAcres: 240.0,
    developableAcres: 218.0,
    constrainedAcres: 22.0,
    zoning: "A (Exclusive Agriculture / Energy Intertie)",
    elevationFt: 640,
    coordinates: [-118.9562, 35.0125],
    zoom: 14.5,
    pitch: 42,
    bearing: -12,
    substation: {
      name: "Wheeler Ridge 230kV Substation",
      voltage: "230kV / 500kV Intertie",
      distanceMiles: "0.8 mi S",
      coordinates: [-118.962, 35.004],
    },
    transmissionCorridor: {
      name: "Midway-Vincent 500kV & Pastoria 230kV Line",
      voltage: "500kV / 230kV",
      pathCoordinates: [
        [-118.966, 35.0],
        [-118.962, 35.004],
        [-118.959, 35.008],
        [-118.9562, 35.0125],
        [-118.953, 35.017],
      ],
    },
    parcelPolygonCoordinates: [
      [-118.9622, 35.0078],
      [-118.9502, 35.0078],
      [-118.9502, 35.0172],
      [-118.9622, 35.0172],
      [-118.9622, 35.0078],
    ],
    fireHazardPolygonCoordinates: [
      [-118.97, 35.002],
      [-118.942, 35.002],
      [-118.942, 35.022],
      [-118.97, 35.022],
      [-118.97, 35.002],
    ],
    environmentalConstraintPolygonCoordinates: [
      [-118.954, 35.0078],
      [-118.9502, 35.0078],
      [-118.9502, 35.0172],
      [-118.954, 35.0172],
      [-118.954, 35.0078],
    ],
    fireHazardTier: "CAL FIRE SRA High Wildfire Severity Zone",
    environmentalConstraintTier: "California Aqueduct Pipeline Right-of-Way Buffer (22.0 AC)",
    evidenceItems: [
      {
        id: "ev-fire-wheeler",
        category: "fire",
        title: "CAL FIRE SRA High Fire Hazard Severity Zone (Tehachapi Slope)",
        badge: "Priority Item",
        severity: "priority",
        officialSource: "CAL FIRE SRA Fire Hazard Severity Maps · Kern County Fire Safety Overlay",
        findingSummary: "High wildfire threat driven by Tehachapi Mountain downslope winds; requires defensible space master plan.",
        developmentImpact: "Mandatory 100-foot defensible perimeter buffer and UL 9540A large-scale fire test certification documentation.",
        engineerChecklist: [
          "Design 100-ft cleared buffer separating BESS enclosures from dry agricultural stubble.",
        ],
      },
      {
        id: "ev-grid-wheeler",
        category: "grid",
        title: "Wheeler Ridge 230kV / 500kV Intertie Corridor",
        badge: "Favorable Adjacency",
        severity: "good",
        officialSource: "CAISO 2024-2025 Transmission Plan · Midway-Vincent 500kV Corridor Mapping",
        findingSummary: "0.8 mi south of Wheeler Ridge Substation; major interchange between PG&E and SCE service territories.",
        developmentImpact: "Strategic intertie access with low gen-tie losses; high regional interest in CAISO queue.",
        engineerChecklist: [
          "Verify interconnect voltage preference (230kV vs 500kV) with CAISO interconnection engineer.",
        ],
      },
    ],
    hudMetrics: [
      { label: "Coordinates", value: "35.0125° N, 118.9562° W" },
      { label: "Fire Severity", value: "CAL FIRE High SRA" },
      { label: "Interconnection", value: "Wheeler Ridge 230kV (0.8 mi)" },
      { label: "Developable Area", value: "218.0 AC / 240.0 AC Gross" },
    ],
  },
];

const MAP_STYLES = {
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
  outdoors: "mapbox://styles/mapbox/outdoors-v12",
} as const;

type MapStyleKey = keyof typeof MAP_STYLES;

interface LayerVisibilityState {
  fireRisk: boolean;
  gridLines: boolean;
  environmental: boolean;
  parcel: boolean;
  terrain3D: boolean;
}

interface SampleSiteMapPreviewProps {
  activeIndex: number;
  onSelectIndex?: (index: number) => void;
  className?: string;
  showSearchBar?: boolean;
}

export function SampleSiteMapPreview({
  activeIndex,
  onSelectIndex,
  className = "",
  showSearchBar = true,
}: SampleSiteMapPreviewProps) {
  const currentSite = REAL_SAMPLE_SITES[activeIndex] ?? REAL_SAMPLE_SITES[0];

  const [mapLoaded, setMapLoaded] = React.useState(false);
  const [currentStyle, setCurrentStyle] = React.useState<MapStyleKey>("satellite");
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [selectedEvidence, setSelectedEvidence] = React.useState<DiligenceEvidenceItem | null>(null);

  // Layer visibility controls
  const [layerVisibility, setLayerVisibility] = React.useState<LayerVisibilityState>({
    fireRisk: true,
    gridLines: true,
    environmental: true,
    parcel: true,
    terrain3D: true,
  });

  // Search input state
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<GeocodingFeature[]>([]);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchedLocationName, setSearchedLocationName] = React.useState<string | null>(null);

  const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = React.useRef<any>(null);
  const subMarkerRef = React.useRef<any>(null);
  const fireMarkerRef = React.useRef<any>(null);
  const envMarkerRef = React.useRef<any>(null);
  const parcelMarkerRef = React.useRef<any>(null);
  const customPinMarkerRef = React.useRef<any>(null);

  // High-resolution static satellite preview fallback
  const staticFallbackUrl = React.useMemo(() => {
    if (!MAPBOX_PUBLIC_TOKEN) return "";
    const [lng, lat] = currentSite.coordinates;
    const bearing = layerVisibility.terrain3D ? currentSite.bearing : 0;
    const pitch = layerVisibility.terrain3D ? currentSite.pitch : 0;
    return `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/${lng},${lat},${currentSite.zoom},${bearing},${pitch}/900x600@2x?access_token=${MAPBOX_PUBLIC_TOKEN}`;
  }, [currentSite, layerVisibility.terrain3D]);

  // Handle ESC key to exit expanded modal
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (selectedEvidence) {
          setSelectedEvidence(null);
        } else if (isExpanded) {
          setIsExpanded(false);
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded, selectedEvidence]);

  // Lock body scroll when expanded
  React.useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  // Smooth resize of Mapbox canvas when container geometry changes
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.resize();
      }
    }, 120);
    return () => clearTimeout(timer);
  }, [isExpanded]);

  // Geocoding Search Handler
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (val.trim().length < 3) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    setIsSearching(true);
    setIsSearchOpen(true);

    try {
      const res = await searchAddress(val);
      if (res.success) {
        setSearchResults(res.features);
      }
    } catch {
      // ignore
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSearchResult = (feature: GeocodingFeature) => {
    setSearchQuery(feature.place_name);
    setSearchedLocationName(feature.place_name);
    setIsSearchOpen(false);

    const [lng, lat] = feature.center;
    const map = mapInstanceRef.current;
    if (!map) return;

    // Smoothly fly to searched address
    map.flyTo({
      center: [lng, lat],
      zoom: 15.2,
      pitch: layerVisibility.terrain3D ? 45 : 0,
      bearing: 15,
      essential: true,
      duration: 2000,
    });

    // Add or move custom candidate pin marker
    try {
      const mapboxgl = (window as any).mapboxgl;
      if (mapboxgl) {
        if (customPinMarkerRef.current) {
          customPinMarkerRef.current.remove();
        }
        const pinEl = document.createElement("div");
        pinEl.innerHTML = `
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/95 text-white border-2 border-emerald-400 shadow-2xl text-xs font-mono font-bold animate-bounce">
            <span class="inline-block size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]"></span>
            <span>CANDIDATE SITE EVALUATION</span>
          </div>
        `;
        customPinMarkerRef.current = new mapboxgl.Marker({ element: pinEl, anchor: "bottom" })
          .setLngLat([lng, lat])
          .addTo(map);
      }
    } catch {
      // ignore
    }
  };

  // Helper to safely add all GIS layer sources
  const applyLayersToMap = React.useCallback(
    (map: any, site: SampleSiteDefinition) => {
      if (!map) return;

      // 1. 3D Terrain DEM
      try {
        if (!map.getSource("mapbox-dem")) {
          map.addSource("mapbox-dem", {
            type: "raster-dem",
            url: "mapbox://mapbox.mapbox-terrain-dem-v1",
            tileSize: 512,
            maxzoom: 14,
          });
        }
        if (layerVisibility.terrain3D) {
          map.setTerrain({ source: "mapbox-dem", exaggeration: 1.35 });
        } else {
          map.setTerrain(null);
        }
      } catch {
        // terrain fallback
      }

      // 2. Fire Hazard Severity Layer (CAL FIRE FHSZ)
      if (!map.getSource("fire-hazard-source")) {
        map.addSource("fire-hazard-source", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [site.fireHazardPolygonCoordinates],
            },
            properties: { tier: site.fireHazardTier },
          },
        });
        map.addLayer({
          id: "fire-hazard-fill",
          type: "fill",
          source: "fire-hazard-source",
          layout: { visibility: layerVisibility.fireRisk ? "visible" : "none" },
          paint: {
            "fill-color": "#e11d48",
            "fill-opacity": 0.18,
          },
        });
        map.addLayer({
          id: "fire-hazard-line",
          type: "line",
          source: "fire-hazard-source",
          layout: { visibility: layerVisibility.fireRisk ? "visible" : "none" },
          paint: {
            "line-color": "#f43f5e",
            "line-width": 2,
            "line-dasharray": [3, 2],
          },
        });
      }

      // 3. Environmental / Flood Hazard Layer (FEMA / DWR)
      if (!map.getSource("env-constraint-source")) {
        map.addSource("env-constraint-source", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [site.environmentalConstraintPolygonCoordinates],
            },
            properties: { tier: site.environmentalConstraintTier },
          },
        });
        map.addLayer({
          id: "env-constraint-fill",
          type: "fill",
          source: "env-constraint-source",
          layout: { visibility: layerVisibility.environmental ? "visible" : "none" },
          paint: {
            "fill-color": "#06b6d4",
            "fill-opacity": 0.16,
          },
        });
        map.addLayer({
          id: "env-constraint-line",
          type: "line",
          source: "env-constraint-source",
          layout: { visibility: layerVisibility.environmental ? "visible" : "none" },
          paint: {
            "line-color": "#0891b2",
            "line-width": 1.75,
          },
        });
      }

      // 4. Candidate Parcel Boundary (Emerald Polygon)
      if (!map.getSource("sample-parcel-source")) {
        map.addSource("sample-parcel-source", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [site.parcelPolygonCoordinates],
            },
            properties: { apn: site.apn },
          },
        });
        map.addLayer({
          id: "sample-parcel-fill",
          type: "fill",
          source: "sample-parcel-source",
          layout: { visibility: layerVisibility.parcel ? "visible" : "none" },
          paint: {
            "fill-color": "#10b981",
            "fill-opacity": 0.24,
          },
        });
        map.addLayer({
          id: "sample-parcel-stroke",
          type: "line",
          source: "sample-parcel-source",
          layout: { visibility: layerVisibility.parcel ? "visible" : "none" },
          paint: {
            "line-color": "#10b981",
            "line-width": 2.5,
          },
        });
      }

      // 5. High-Voltage Transmission Corridor (Amber LineString)
      if (!map.getSource("sample-transmission-source")) {
        map.addSource("sample-transmission-source", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: site.transmissionCorridor.pathCoordinates,
            },
            properties: { name: site.transmissionCorridor.name },
          },
        });
        map.addLayer({
          id: "sample-transmission-casing",
          type: "line",
          source: "sample-transmission-source",
          layout: { visibility: layerVisibility.gridLines ? "visible" : "none" },
          paint: {
            "line-color": "#09090b",
            "line-width": 5.5,
            "line-opacity": 0.7,
          },
        });
        map.addLayer({
          id: "sample-transmission-line",
          type: "line",
          source: "sample-transmission-source",
          layout: { visibility: layerVisibility.gridLines ? "visible" : "none" },
          paint: {
            "line-color": "#f59e0b",
            "line-width": 2.75,
          },
        });
      }
    },
    [layerVisibility]
  );

  // Initialize Mapbox GL instance
  React.useEffect(() => {
    if (!isMapboxConfigured || !mapContainerRef.current || mapInstanceRef.current) {
      return;
    }

    let isMounted = true;

    async function initMapbox() {
      try {
        const mapboxgl = (await import("mapbox-gl")).default;
        if (!mapContainerRef.current || !isMounted) return;

        // Store reference on window for internal marker helpers
        (window as any).mapboxgl = mapboxgl;
        mapboxgl.accessToken = MAPBOX_PUBLIC_TOKEN;

        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: MAP_STYLES[currentStyle],
          center: currentSite.coordinates,
          zoom: currentSite.zoom,
          pitch: layerVisibility.terrain3D ? currentSite.pitch : 0,
          bearing: layerVisibility.terrain3D ? currentSite.bearing : 0,
          maxPitch: 75,
          attributionControl: false,
          interactive: true,
          cooperativeGestures: true,
        });

        map.on("load", () => {
          if (!isMounted) return;
          setMapLoaded(true);

          applyLayersToMap(map, currentSite);

          // 1. Substation Pin Marker
          const subEl = document.createElement("div");
          subEl.className = "geospatia-sub-marker";
          subEl.innerHTML = `
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/95 text-amber-300 border border-amber-400/60 shadow-xl text-[10.5px] font-mono font-medium backdrop-blur cursor-pointer hover:scale-105 transition-transform">
              <span class="inline-block size-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]"></span>
              ⚡ ${currentSite.substation.name} (${currentSite.substation.voltage})
            </div>
          `;
          subEl.onclick = () => {
            const ev = currentSite.evidenceItems.find((e) => e.category === "grid");
            if (ev) setSelectedEvidence(ev);
          };
          subMarkerRef.current = new mapboxgl.Marker({ element: subEl, anchor: "bottom" })
            .setLngLat(currentSite.substation.coordinates)
            .addTo(map);

          // 2. Fire Hazard Pin Marker
          const fireEl = document.createElement("div");
          fireEl.className = "geospatia-fire-marker";
          fireEl.innerHTML = `
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-950/95 text-rose-300 border border-rose-400/60 shadow-xl text-[10.5px] font-mono font-medium backdrop-blur cursor-pointer hover:scale-105 transition-transform">
              <span class="inline-block size-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e]"></span>
              🔥 ${currentSite.fireHazardTier}
            </div>
          `;
          fireEl.onclick = () => {
            const ev = currentSite.evidenceItems.find((e) => e.category === "fire");
            if (ev) setSelectedEvidence(ev);
          };
          // Place slightly north-west of parcel center
          fireMarkerRef.current = new mapboxgl.Marker({ element: fireEl, anchor: "bottom" })
            .setLngLat([currentSite.coordinates[0] - 0.006, currentSite.coordinates[1] + 0.005])
            .addTo(map);

          // 3. Candidate Parcel Pin Marker
          const parcelEl = document.createElement("div");
          parcelEl.className = "geospatia-parcel-marker";
          parcelEl.innerHTML = `
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/95 text-emerald-300 border border-emerald-400/70 shadow-xl text-[10.5px] font-mono font-semibold backdrop-blur cursor-pointer hover:scale-105 transition-transform">
              <span class="inline-block size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"></span>
              📐 APN ${currentSite.apn} · ${currentSite.grossAcres} AC
            </div>
          `;
          parcelEl.onclick = () => {
            const ev = currentSite.evidenceItems.find((e) => e.category === "zoning");
            if (ev) setSelectedEvidence(ev);
          };
          parcelMarkerRef.current = new mapboxgl.Marker({ element: parcelEl, anchor: "center" })
            .setLngLat(currentSite.coordinates)
            .addTo(map);

          map.resize();
        });

        mapInstanceRef.current = map;
      } catch (err) {
        console.warn("[Mapbox Preview Init]", err);
      }
    }

    initMapbox();

    return () => {
      isMounted = false;
      if (subMarkerRef.current) subMarkerRef.current.remove();
      if (fireMarkerRef.current) fireMarkerRef.current.remove();
      if (envMarkerRef.current) envMarkerRef.current.remove();
      if (parcelMarkerRef.current) parcelMarkerRef.current.remove();
      if (customPinMarkerRef.current) customPinMarkerRef.current.remove();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [applyLayersToMap]);

  // Update map camera, GeoJSON layers, and markers when active site changes
  React.useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapLoaded) return;

    try {
      // 1. Update Parcel Polygon
      const parcelSource = map.getSource("sample-parcel-source") as any;
      if (parcelSource?.setData) {
        parcelSource.setData({
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [currentSite.parcelPolygonCoordinates],
          },
          properties: { apn: currentSite.apn },
        });
      }

      // 2. Update Fire Hazard Polygon
      const fireSource = map.getSource("fire-hazard-source") as any;
      if (fireSource?.setData) {
        fireSource.setData({
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [currentSite.fireHazardPolygonCoordinates],
          },
          properties: { tier: currentSite.fireHazardTier },
        });
      }

      // 3. Update Environmental Constraint Polygon
      const envSource = map.getSource("env-constraint-source") as any;
      if (envSource?.setData) {
        envSource.setData({
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [currentSite.environmentalConstraintPolygonCoordinates],
          },
          properties: { tier: currentSite.environmentalConstraintTier },
        });
      }

      // 4. Update Transmission Corridor
      const txSource = map.getSource("sample-transmission-source") as any;
      if (txSource?.setData) {
        txSource.setData({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: currentSite.transmissionCorridor.pathCoordinates,
          },
          properties: { name: currentSite.transmissionCorridor.name },
        });
      }

      // 5. Update Markers
      if (subMarkerRef.current) {
        subMarkerRef.current.setLngLat(currentSite.substation.coordinates);
        const subEl = subMarkerRef.current.getElement();
        if (subEl) {
          subEl.innerHTML = `
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/95 text-amber-300 border border-amber-400/60 shadow-xl text-[10.5px] font-mono font-medium backdrop-blur cursor-pointer hover:scale-105 transition-transform">
              <span class="inline-block size-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]"></span>
              ⚡ ${currentSite.substation.name} (${currentSite.substation.voltage})
            </div>
          `;
          subEl.onclick = () => {
            const ev = currentSite.evidenceItems.find((e) => e.category === "grid");
            if (ev) setSelectedEvidence(ev);
          };
        }
      }

      if (fireMarkerRef.current) {
        fireMarkerRef.current.setLngLat([
          currentSite.coordinates[0] - 0.006,
          currentSite.coordinates[1] + 0.005,
        ]);
        const fireEl = fireMarkerRef.current.getElement();
        if (fireEl) {
          fireEl.innerHTML = `
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-950/95 text-rose-300 border border-rose-400/60 shadow-xl text-[10.5px] font-mono font-medium backdrop-blur cursor-pointer hover:scale-105 transition-transform">
              <span class="inline-block size-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e]"></span>
              🔥 ${currentSite.fireHazardTier}
            </div>
          `;
          fireEl.onclick = () => {
            const ev = currentSite.evidenceItems.find((e) => e.category === "fire");
            if (ev) setSelectedEvidence(ev);
          };
        }
      }

      if (parcelMarkerRef.current) {
        parcelMarkerRef.current.setLngLat(currentSite.coordinates);
        const parcelEl = parcelMarkerRef.current.getElement();
        if (parcelEl) {
          parcelEl.innerHTML = `
            <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/95 text-emerald-300 border border-emerald-400/70 shadow-xl text-[10.5px] font-mono font-semibold backdrop-blur cursor-pointer hover:scale-105 transition-transform">
              <span class="inline-block size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]"></span>
              📐 APN ${currentSite.apn} · ${currentSite.grossAcres} AC
            </div>
          `;
          parcelEl.onclick = () => {
            const ev = currentSite.evidenceItems.find((e) => e.category === "zoning");
            if (ev) setSelectedEvidence(ev);
          };
        }
      }

      // Smooth cinematic camera flight to new site
      map.flyTo({
        center: currentSite.coordinates,
        zoom: currentSite.zoom,
        pitch: layerVisibility.terrain3D ? currentSite.pitch : 0,
        bearing: layerVisibility.terrain3D ? currentSite.bearing : 0,
        speed: 1.15,
        curve: 1.3,
        essential: true,
      });
    } catch (err) {
      console.warn("[Mapbox Update Error]", err);
    }
  }, [currentSite, mapLoaded, layerVisibility.terrain3D]);

  // Update layer visibility dynamically
  React.useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapLoaded) return;

    try {
      if (map.getLayer("fire-hazard-fill")) {
        map.setLayoutProperty(
          "fire-hazard-fill",
          "visibility",
          layerVisibility.fireRisk ? "visible" : "none"
        );
        map.setLayoutProperty(
          "fire-hazard-line",
          "visibility",
          layerVisibility.fireRisk ? "visible" : "none"
        );
      }
      if (fireMarkerRef.current) {
        const el = fireMarkerRef.current.getElement();
        if (el) el.style.display = layerVisibility.fireRisk ? "block" : "none";
      }

      if (map.getLayer("env-constraint-fill")) {
        map.setLayoutProperty(
          "env-constraint-fill",
          "visibility",
          layerVisibility.environmental ? "visible" : "none"
        );
        map.setLayoutProperty(
          "env-constraint-line",
          "visibility",
          layerVisibility.environmental ? "visible" : "none"
        );
      }

      if (map.getLayer("sample-parcel-fill")) {
        map.setLayoutProperty(
          "sample-parcel-fill",
          "visibility",
          layerVisibility.parcel ? "visible" : "none"
        );
        map.setLayoutProperty(
          "sample-parcel-stroke",
          "visibility",
          layerVisibility.parcel ? "visible" : "none"
        );
      }
      if (parcelMarkerRef.current) {
        const el = parcelMarkerRef.current.getElement();
        if (el) el.style.display = layerVisibility.parcel ? "block" : "none";
      }

      if (map.getLayer("sample-transmission-line")) {
        map.setLayoutProperty(
          "sample-transmission-line",
          "visibility",
          layerVisibility.gridLines ? "visible" : "none"
        );
        map.setLayoutProperty(
          "sample-transmission-casing",
          "visibility",
          layerVisibility.gridLines ? "visible" : "none"
        );
      }
      if (subMarkerRef.current) {
        const el = subMarkerRef.current.getElement();
        if (el) el.style.display = layerVisibility.gridLines ? "block" : "none";
      }

      if (layerVisibility.terrain3D) {
        map.setTerrain({ source: "mapbox-dem", exaggeration: 1.35 });
      } else {
        map.setTerrain(null);
      }
    } catch {
      // ignore
    }
  }, [layerVisibility, mapLoaded]);

  // Toggle individual layers
  const toggleLayer = (layerKey: keyof LayerVisibilityState) => {
    setLayerVisibility((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey],
    }));
  };

  // Toggle 3D Terrain & Oblique Camera Pitch
  const toggle3D = React.useCallback(() => {
    const next3D = !layerVisibility.terrain3D;
    toggleLayer("terrain3D");
    const map = mapInstanceRef.current;
    if (!map) return;

    try {
      if (next3D) {
        map.easeTo({
          pitch: currentSite.pitch,
          bearing: currentSite.bearing,
          duration: 900,
        });
      } else {
        map.easeTo({
          pitch: 0,
          bearing: 0,
          duration: 900,
        });
      }
    } catch {
      // ignore
    }
  }, [layerVisibility.terrain3D, currentSite]);

  // Switch Map Style (Satellite vs Topographic)
  const toggleStyle = React.useCallback(() => {
    const nextStyle: MapStyleKey = currentStyle === "satellite" ? "outdoors" : "satellite";
    setCurrentStyle(nextStyle);
    const map = mapInstanceRef.current;
    if (!map) return;

    map.setStyle(MAP_STYLES[nextStyle]);
    map.once("style.load", () => {
      applyLayersToMap(map, currentSite);
    });
  }, [currentStyle, currentSite, applyLayersToMap]);

  // Reset camera view
  const handleResetCamera = React.useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo({
      center: currentSite.coordinates,
      zoom: currentSite.zoom,
      pitch: layerVisibility.terrain3D ? currentSite.pitch : 0,
      bearing: layerVisibility.terrain3D ? currentSite.bearing : 0,
      duration: 1000,
    });
  }, [currentSite, layerVisibility.terrain3D]);

  return (
    <>
      {/* Dimmed backdrop when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Main Container: Adapts dynamically between inline card height and fixed full-screen modal */}
      <div
        className={
          isExpanded
            ? "fixed inset-2 sm:inset-5 md:inset-8 z-50 flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-zinc-950 shadow-2xl animate-in zoom-in-95 duration-200"
            : `relative h-[340px] sm:h-[390px] lg:h-[420px] w-full overflow-hidden rounded-xl border border-line bg-muted/60 shadow-inner flex flex-col ${className}`
        }
      >
        {/* Top Interactive Address & APN Search Bar */}
        {showSearchBar && (
          <div className="relative z-30 border-b border-white/10 bg-zinc-950/95 p-2 sm:p-2.5 backdrop-blur-md">
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
              {/* Address / APN Search Input */}
              <div className="relative flex-1 min-w-0">
                <div className="relative flex items-center">
                  <Search className="absolute left-2.5 size-3.5 text-zinc-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => {
                      if (searchResults.length > 0) setIsSearchOpen(true);
                    }}
                    placeholder="Search candidate address or APN in California..."
                    className="h-8 w-full rounded-md border border-white/15 bg-zinc-900/90 pl-8 pr-7 text-xs font-mono text-white placeholder-zinc-400 outline-none transition-colors focus:border-emerald-400 focus:bg-zinc-900"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults([]);
                        setIsSearchOpen(false);
                      }}
                      className="absolute right-2 text-zinc-400 hover:text-white"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>

                {/* Autocomplete Search Dropdown */}
                {isSearchOpen && searchResults.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 z-50 max-h-56 overflow-y-auto rounded-lg border border-white/20 bg-zinc-950/95 p-1 shadow-2xl backdrop-blur-md">
                    {searchResults.map((feature) => (
                      <button
                        key={feature.id}
                        type="button"
                        onClick={() => handleSelectSearchResult(feature)}
                        className="flex w-full items-start gap-2 rounded-md p-2 text-left text-xs font-mono text-zinc-200 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        <MapPin className="mt-0.5 size-3.5 shrink-0 text-emerald-400" />
                        <span className="truncate">{feature.place_name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Preset APN Chips */}
              <div className="flex items-center gap-1 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none">
                <span className="hidden min-[480px]:inline font-mono text-[10px] text-zinc-400 shrink-0">
                  Quick APN:
                </span>
                {REAL_SAMPLE_SITES.map((site, idx) => (
                  <button
                    key={site.id}
                    type="button"
                    onClick={() => {
                      onSelectIndex?.(idx);
                      setSearchedLocationName(null);
                      setSearchQuery("");
                    }}
                    className={`rounded px-2 py-0.5 font-mono text-[10px] shrink-0 transition-colors cursor-pointer ${
                      idx === activeIndex && !searchedLocationName
                        ? "bg-emerald-500/25 text-emerald-300 font-semibold border border-emerald-400/50 shadow-sm"
                        : "bg-zinc-900/80 text-zinc-300 border border-white/10 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    APN {site.apn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Expanded Top Header Bar */}
        {isExpanded && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 bg-zinc-900/95 px-4 py-3 sm:px-6 sm:py-3.5 shrink-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-950/80 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  REAL MAPBOX SATELLITE INSPECTION
                </span>
                <span className="hidden font-mono text-xs text-zinc-400 sm:inline-block">
                  {currentSite.category}
                </span>
              </div>
              <h3 className="mt-1 font-serif text-lg sm:text-xl font-medium text-white truncate">
                {currentSite.name}
              </h3>
              <p className="font-mono text-xs text-zinc-400 truncate">
                {currentSite.jurisdiction} · APN: {currentSite.apn} · {currentSite.developableAcres} AC Developable ({currentSite.grossAcres} AC Gross)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="flex size-9 items-center justify-center rounded-lg border border-white/20 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer"
                title="Close expanded view (Esc)"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
        )}

        {/* Mapbox Canvas & Overlays Wrapper */}
        <div className="relative flex-1 w-full min-h-0 overflow-hidden">
          {/* Static Satellite Fallback (instant LCP preview before WebGL boots) */}
          {staticFallbackUrl && !mapLoaded && (
            <div
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
              style={{ backgroundImage: `url(${staticFallbackUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
            </div>
          )}

          {/* WebGL Canvas */}
          <div
            ref={mapContainerRef}
            className={`h-full w-full transition-opacity duration-500 ${
              mapLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Top-Left Live Status Badge & Layer Toggles Bar */}
          <div className="absolute left-2.5 top-2.5 z-20 flex flex-wrap items-center gap-1.5 max-w-[85%]">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-zinc-950/85 px-2.5 py-1 text-[10px] font-mono font-medium text-emerald-400 shadow-lg backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>LIVE SATELLITE</span>
            </div>

            {/* Interactive Layer Filter Buttons */}
            <button
              type="button"
              onClick={() => toggleLayer("fireRisk")}
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-mono transition-all backdrop-blur-md cursor-pointer ${
                layerVisibility.fireRisk
                  ? "border-rose-400/60 bg-rose-950/85 text-rose-300 shadow-md font-semibold"
                  : "border-white/10 bg-zinc-950/60 text-zinc-500 line-through"
              }`}
            >
              <Flame className="size-3 text-rose-400" />
              <span>Fire Risk</span>
            </button>

            <button
              type="button"
              onClick={() => toggleLayer("gridLines")}
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-mono transition-all backdrop-blur-md cursor-pointer ${
                layerVisibility.gridLines
                  ? "border-amber-400/60 bg-amber-950/85 text-amber-300 shadow-md font-semibold"
                  : "border-white/10 bg-zinc-950/60 text-zinc-500 line-through"
              }`}
            >
              <Zap className="size-3 text-amber-400" />
              <span>230kV Grid</span>
            </button>

            <button
              type="button"
              onClick={() => toggleLayer("environmental")}
              className={`hidden sm:inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-mono transition-all backdrop-blur-md cursor-pointer ${
                layerVisibility.environmental
                  ? "border-cyan-400/60 bg-cyan-950/85 text-cyan-300 shadow-md font-semibold"
                  : "border-white/10 bg-zinc-950/60 text-zinc-500 line-through"
              }`}
            >
              <Droplets className="size-3 text-cyan-400" />
              <span>Flood/Buffer</span>
            </button>
          </div>

          {/* Top-Right GIS Floating Control Toolbar */}
          <div className="absolute right-2.5 top-2.5 z-20 flex items-center gap-1">
            {/* 3D / 2D Tilt Button */}
            <button
              type="button"
              onClick={toggle3D}
              title={layerVisibility.terrain3D ? "Switch to 2D Top-Down View" : "Switch to 3D Oblique View"}
              className="flex size-7 sm:size-8 items-center justify-center rounded-md border border-white/20 bg-zinc-950/85 text-zinc-200 shadow-md backdrop-blur-md transition-all hover:bg-zinc-800 hover:text-white cursor-pointer"
            >
              {layerVisibility.terrain3D ? (
                <Mountain className="size-3.5 sm:size-4 text-emerald-400" />
              ) : (
                <Compass className="size-3.5 sm:size-4 text-zinc-300" />
              )}
            </button>

            {/* Style Toggle (Satellite vs Topo) */}
            <button
              type="button"
              onClick={toggleStyle}
              title={currentStyle === "satellite" ? "Switch to Topographic Map" : "Switch to Satellite Imagery"}
              className="flex size-7 sm:size-8 items-center justify-center rounded-md border border-white/20 bg-zinc-950/85 text-zinc-200 shadow-md backdrop-blur-md transition-all hover:bg-zinc-800 hover:text-white cursor-pointer"
            >
              <Layers className="size-3.5 sm:size-4 text-zinc-200" />
            </button>

            {/* Reset Camera */}
            <button
              type="button"
              onClick={handleResetCamera}
              title="Reset View to Parcel"
              className="flex size-7 sm:size-8 items-center justify-center rounded-md border border-white/20 bg-zinc-950/85 text-zinc-200 shadow-md backdrop-blur-md transition-all hover:bg-zinc-800 hover:text-white cursor-pointer"
            >
              <RotateCcw className="size-3.5 sm:size-4 text-zinc-200" />
            </button>

            {/* Expand / Minimize Button */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Collapse Map" : "Expand Full Interactive 3D Workstation"}
              className="flex size-7 sm:size-8 items-center justify-center rounded-md border border-emerald-500/40 bg-emerald-950/90 text-emerald-300 shadow-md backdrop-blur-md transition-all hover:bg-emerald-900 hover:text-white cursor-pointer"
            >
              {isExpanded ? (
                <Minimize2 className="size-3.5 sm:size-4" />
              ) : (
                <Maximize2 className="size-3.5 sm:size-4" />
              )}
            </button>
          </div>

          {/* Interactive Evidence Inspection Drawer / Card */}
          {selectedEvidence && (
            <div className="absolute inset-x-2.5 top-12 z-30 max-w-md rounded-xl border border-white/25 bg-zinc-950/95 p-3.5 sm:p-4 text-white shadow-2xl backdrop-blur-md animate-in slide-in-from-top-2 duration-200">
              <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-block size-2 rounded-full ${
                        selectedEvidence.severity === "good"
                          ? "bg-emerald-400"
                          : selectedEvidence.severity === "watch"
                          ? "bg-amber-400"
                          : "bg-rose-400"
                      }`}
                    />
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                      Verified Diligence Evidence
                    </span>
                  </div>
                  <h4 className="mt-1 font-sans text-sm font-semibold text-white">
                    {selectedEvidence.title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedEvidence(null)}
                  className="rounded p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="mt-2.5 space-y-2 text-xs">
                <div>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase">
                    Official Agency Source
                  </span>
                  <p className="font-mono text-[11px] text-emerald-300">
                    {selectedEvidence.officialSource}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase">
                    Development Risk Finding
                  </span>
                  <p className="text-[12px] leading-relaxed text-zinc-200">
                    {selectedEvidence.findingSummary}
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-zinc-900/80 p-2.5">
                  <span className="font-mono text-[10px] font-semibold text-amber-300 uppercase">
                    Diligence Questions for Your Engineer
                  </span>
                  <ul className="mt-1.5 space-y-1 text-[11px] text-zinc-300 list-disc list-inside">
                    {selectedEvidence.engineerChecklist.map((item, idx) => (
                      <li key={idx} className="leading-snug">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-[10px] font-mono text-zinc-400">
                <span>Included in GeoSpatia Deliverable Brief</span>
                <button
                  type="button"
                  onClick={() => setSelectedEvidence(null)}
                  className="text-emerald-400 hover:underline cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Bottom Telemetry HUD Bar (Inline collapsed mode) */}
          {!isExpanded && (
            <div className="absolute bottom-2 left-2 right-2 z-20 rounded-lg border border-white/15 bg-zinc-950/90 p-2 sm:p-2.5 text-white shadow-xl backdrop-blur-md">
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" />
                    <span className="font-mono text-[11px] sm:text-xs font-semibold text-emerald-300 truncate">
                      {searchedLocationName || currentSite.name}
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-[9.5px] sm:text-[10px] text-zinc-400 truncate">
                    ⚡ {currentSite.substation.name} ({currentSite.substation.distanceMiles}) · 🔥 {currentSite.fireHazardTier}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 pt-1 sm:pt-0 border-t border-white/10 sm:border-t-0">
                  <button
                    type="button"
                    onClick={() => {
                      const first = currentSite.evidenceItems[0];
                      if (first) setSelectedEvidence(first);
                    }}
                    className="inline-flex items-center gap-1 rounded border border-white/20 bg-zinc-800 px-2 py-1 font-mono text-[9.5px] sm:text-[10px] font-semibold text-zinc-200 hover:bg-zinc-700 transition-colors cursor-pointer"
                  >
                    <Eye className="size-3 text-emerald-400" />
                    <span>View Evidence</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="inline-flex items-center gap-1 rounded border border-emerald-400/40 bg-emerald-500/20 px-2 py-1 font-mono text-[9.5px] sm:text-[10px] font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                  >
                    <span>Inspect 3D</span>
                    <Maximize2 className="size-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Expanded Footer Bar */}
        {isExpanded && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/15 bg-zinc-900/95 px-4 py-3 sm:px-6 shrink-0">
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-emerald-400 shrink-0" />
                <span>Real California Geographic Records · Maxar / USDA NAIP Satellite Imagery · CAL FIRE 2024</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <Button
                asChild
                className="w-full sm:w-auto gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft cursor-pointer text-sm h-10"
              >
                <Link href={`/request?apn=${encodeURIComponent(currentSite.apn)}&address=${encodeURIComponent(searchQuery || currentSite.name)}`}>
                  Screen This Candidate Site ($1,500)
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsExpanded(false)}
                className="border-white/20 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white cursor-pointer text-sm h-10"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
