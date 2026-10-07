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
} from "lucide-react";
import { MAPBOX_PUBLIC_TOKEN, isMapboxConfigured } from "@/lib/mapbox";
import { Button } from "@/components/ui/button";
import "mapbox-gl/dist/mapbox-gl.css";

export interface SampleSiteDefinition {
  id: string;
  name: string;
  category: string;
  county: string;
  jurisdiction: string;
  apn: string;
  grossAcres: number;
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
  hudMetrics: Array<{
    label: string;
    value: string;
  }>;
}

export const REAL_SAMPLE_SITES: SampleSiteDefinition[] = [
  {
    id: "bess-gates",
    name: "Gates 230kV / 500kV Intertie Corridor",
    category: "BESS Site Screen",
    county: "Fresno County, CA",
    jurisdiction: "Unincorporated Fresno County (AL-20)",
    apn: "085-120-04S",
    grossAcres: 82.4,
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
      name: "Gates-Gregg 230kV & Los Banos-Gates 500kV",
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
    hudMetrics: [
      { label: "Coordinates", value: "36.1424° N, 120.0882° W" },
      { label: "Interconnection", value: "Gates 230kV Bus (0.6 mi NW)" },
      { label: "Utility Zone", value: "CAISO · PG&E Central Valley" },
      { label: "Parcel Size", value: "82.4 Gross Acres (APN 085-120-04S)" },
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
    hudMetrics: [
      { label: "Coordinates", value: "34.8643° N, 118.1724° W" },
      { label: "Interconnection", value: "Whirlwind 230kV (1.4 mi NE)" },
      { label: "Utility Zone", value: "CAISO · SCE North Desert" },
      { label: "Parcel Size", value: "158.6 Gross Acres (APN 359-020-18)" },
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
    hudMetrics: [
      { label: "Coordinates", value: "34.0522° N, 117.5851° W" },
      { label: "Distribution Node", value: "Guasti 66kV (0.4 mi E)" },
      { label: "Utility Zone", value: "SCE Metro West Industrial" },
      { label: "Parcel Size", value: "14.2 Gross Acres (APN 0211-191-05)" },
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
    hudMetrics: [
      { label: "Coordinates", value: "35.0125° N, 118.9562° W" },
      { label: "Interconnection", value: "Wheeler Ridge 230kV (0.8 mi S)" },
      { label: "Utility Zone", value: "CAISO / PG&E San Joaquin" },
      { label: "Parcel Size", value: "240.0 Gross Acres (APN 240-080-22)" },
    ],
  },
];

const MAP_STYLES = {
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
  outdoors: "mapbox://styles/mapbox/outdoors-v12",
} as const;

type MapStyleKey = keyof typeof MAP_STYLES;

interface SampleSiteMapPreviewProps {
  activeIndex: number;
  onSelectIndex?: (index: number) => void;
  className?: string;
}

export function SampleSiteMapPreview({
  activeIndex,
  onSelectIndex,
  className = "",
}: SampleSiteMapPreviewProps) {
  const currentSite = REAL_SAMPLE_SITES[activeIndex] ?? REAL_SAMPLE_SITES[0];

  const [mapLoaded, setMapLoaded] = React.useState(false);
  const [currentStyle, setCurrentStyle] = React.useState<MapStyleKey>("satellite");
  const [is3D, setIs3D] = React.useState(true);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = React.useRef<any>(null);
  const subMarkerRef = React.useRef<any>(null);
  const parcelMarkerRef = React.useRef<any>(null);

  // High-resolution static satellite preview fallback
  const staticFallbackUrl = React.useMemo(() => {
    if (!MAPBOX_PUBLIC_TOKEN) return "";
    const [lng, lat] = currentSite.coordinates;
    const bearing = is3D ? currentSite.bearing : 0;
    const pitch = is3D ? currentSite.pitch : 0;
    return `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/${lng},${lat},${currentSite.zoom},${bearing},${pitch}/800x520@2x?access_token=${MAPBOX_PUBLIC_TOKEN}`;
  }, [currentSite, is3D]);

  // Handle ESC key to exit expanded modal
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

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

        mapboxgl.accessToken = MAPBOX_PUBLIC_TOKEN;

        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: MAP_STYLES[currentStyle],
          center: currentSite.coordinates,
          zoom: currentSite.zoom,
          pitch: is3D ? currentSite.pitch : 0,
          bearing: is3D ? currentSite.bearing : 0,
          maxPitch: 75,
          attributionControl: false,
          interactive: true,
          cooperativeGestures: true,
        });

        map.on("load", () => {
          if (!isMounted) return;
          setMapLoaded(true);

          // 1. Add DEM elevation raster source for 3D mountains
          try {
            if (!map.getSource("mapbox-dem")) {
              map.addSource("mapbox-dem", {
                type: "raster-dem",
                url: "mapbox://mapbox.mapbox-terrain-dem-v1",
                tileSize: 512,
                maxzoom: 14,
              });
            }
            if (is3D) {
              map.setTerrain({ source: "mapbox-dem", exaggeration: 1.35 });
            }
          } catch {
            // DEM fallback
          }

          // 2. Add Parcel GeoJSON Source & Layers
          map.addSource("sample-parcel-source", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [currentSite.parcelPolygonCoordinates],
              },
              properties: { apn: currentSite.apn },
            },
          });

          map.addLayer({
            id: "sample-parcel-fill",
            type: "fill",
            source: "sample-parcel-source",
            paint: {
              "fill-color": "#10b981",
              "fill-opacity": 0.24,
            },
          });

          map.addLayer({
            id: "sample-parcel-stroke",
            type: "line",
            source: "sample-parcel-source",
            paint: {
              "line-color": "#10b981",
              "line-width": 2.5,
              "line-dasharray": [2, 1],
            },
          });

          // 3. Add Transmission Line Corridor Source & Layers
          map.addSource("sample-transmission-source", {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: currentSite.transmissionCorridor.pathCoordinates,
              },
              properties: { name: currentSite.transmissionCorridor.name },
            },
          });

          map.addLayer({
            id: "sample-transmission-casing",
            type: "line",
            source: "sample-transmission-source",
            paint: {
              "line-color": "#09090b",
              "line-width": 5,
              "line-opacity": 0.65,
            },
          });

          map.addLayer({
            id: "sample-transmission-line",
            type: "line",
            source: "sample-transmission-source",
            paint: {
              "line-color": "#f59e0b",
              "line-width": 2.5,
            },
          });

          // 4. Create custom DOM markers
          const subEl = document.createElement("div");
          subEl.className = "geospatia-sub-marker";
          subEl.innerHTML = `
            <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-950/95 text-amber-300 border border-amber-400/50 shadow-xl text-[10px] font-mono font-medium backdrop-blur cursor-pointer hover:scale-105 transition-transform">
              <span class="inline-block size-1.5 rounded-full bg-amber-400"></span>
              ⚡ ${currentSite.substation.name} (${currentSite.substation.voltage})
            </div>
          `;
          subMarkerRef.current = new mapboxgl.Marker({ element: subEl, anchor: "bottom" })
            .setLngLat(currentSite.substation.coordinates)
            .addTo(map);

          const parcelEl = document.createElement("div");
          parcelEl.className = "geospatia-parcel-marker";
          parcelEl.innerHTML = `
            <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/95 text-emerald-300 border border-emerald-400/60 shadow-xl text-[10px] font-mono font-semibold backdrop-blur cursor-pointer hover:scale-105 transition-transform">
              <span class="inline-block size-1.5 rounded-full bg-emerald-400"></span>
              APN ${currentSite.apn} · ${currentSite.grossAcres} AC
            </div>
          `;
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
      if (parcelMarkerRef.current) parcelMarkerRef.current.remove();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

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

      // 2. Update Transmission Corridor
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

      // 3. Update Markers
      if (subMarkerRef.current) {
        subMarkerRef.current.setLngLat(currentSite.substation.coordinates);
        const subEl = subMarkerRef.current.getElement();
        if (subEl) {
          subEl.innerHTML = `
            <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-950/95 text-amber-300 border border-amber-400/50 shadow-xl text-[10px] font-mono font-medium backdrop-blur cursor-pointer hover:scale-105 transition-transform">
              <span class="inline-block size-1.5 rounded-full bg-amber-400"></span>
              ⚡ ${currentSite.substation.name} (${currentSite.substation.voltage})
            </div>
          `;
        }
      }

      if (parcelMarkerRef.current) {
        parcelMarkerRef.current.setLngLat(currentSite.coordinates);
        const parcelEl = parcelMarkerRef.current.getElement();
        if (parcelEl) {
          parcelEl.innerHTML = `
            <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/95 text-emerald-300 border border-emerald-400/60 shadow-xl text-[10px] font-mono font-semibold backdrop-blur cursor-pointer hover:scale-105 transition-transform">
              <span class="inline-block size-1.5 rounded-full bg-emerald-400"></span>
              APN ${currentSite.apn} · ${currentSite.grossAcres} AC
            </div>
          `;
        }
      }

      // 4. Smooth camera flight to new site
      map.flyTo({
        center: currentSite.coordinates,
        zoom: currentSite.zoom,
        pitch: is3D ? currentSite.pitch : 0,
        bearing: is3D ? currentSite.bearing : 0,
        speed: 1.1,
        curve: 1.3,
        essential: true,
      });
    } catch (err) {
      console.warn("[Mapbox Update Error]", err);
    }
  }, [currentSite, mapLoaded, is3D]);

  // Toggle 3D Terrain & Oblique Camera Pitch
  const toggle3D = React.useCallback(() => {
    const next3D = !is3D;
    setIs3D(next3D);
    const map = mapInstanceRef.current;
    if (!map) return;

    try {
      if (next3D) {
        map.setTerrain({ source: "mapbox-dem", exaggeration: 1.35 });
        map.easeTo({
          pitch: currentSite.pitch,
          bearing: currentSite.bearing,
          duration: 900,
        });
      } else {
        map.setTerrain(null);
        map.easeTo({
          pitch: 0,
          bearing: 0,
          duration: 900,
        });
      }
    } catch {
      // ignore
    }
  }, [is3D, currentSite]);

  // Switch Map Style (Satellite vs Topographic)
  const toggleStyle = React.useCallback(() => {
    const nextStyle: MapStyleKey = currentStyle === "satellite" ? "outdoors" : "satellite";
    setCurrentStyle(nextStyle);
    const map = mapInstanceRef.current;
    if (!map) return;

    map.setStyle(MAP_STYLES[nextStyle]);
    map.once("style.load", () => {
      if (is3D && map.getSource("mapbox-dem")) {
        map.setTerrain({ source: "mapbox-dem", exaggeration: 1.35 });
      }
      if (!map.getSource("sample-parcel-source")) {
        map.addSource("sample-parcel-source", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [currentSite.parcelPolygonCoordinates],
            },
            properties: { apn: currentSite.apn },
          },
        });
        map.addLayer({
          id: "sample-parcel-fill",
          type: "fill",
          source: "sample-parcel-source",
          paint: { "fill-color": "#10b981", "fill-opacity": 0.24 },
        });
        map.addLayer({
          id: "sample-parcel-stroke",
          type: "line",
          source: "sample-parcel-source",
          paint: { "line-color": "#10b981", "line-width": 2.5, "line-dasharray": [2, 1] },
        });
      }

      if (!map.getSource("sample-transmission-source")) {
        map.addSource("sample-transmission-source", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: currentSite.transmissionCorridor.pathCoordinates,
            },
            properties: { name: currentSite.transmissionCorridor.name },
          },
        });
        map.addLayer({
          id: "sample-transmission-casing",
          type: "line",
          source: "sample-transmission-source",
          paint: { "line-color": "#09090b", "line-width": 5, "line-opacity": 0.65 },
        });
        map.addLayer({
          id: "sample-transmission-line",
          type: "line",
          source: "sample-transmission-source",
          paint: { "line-color": "#f59e0b", "line-width": 2.5 },
        });
      }
    });
  }, [currentStyle, is3D, currentSite]);

  // Zoom controls
  const handleZoom = React.useCallback((delta: number) => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.zoomTo(map.getZoom() + delta, { duration: 300 });
  }, []);

  // Reset camera view
  const handleResetCamera = React.useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo({
      center: currentSite.coordinates,
      zoom: currentSite.zoom,
      pitch: is3D ? currentSite.pitch : 0,
      bearing: is3D ? currentSite.bearing : 0,
      duration: 1000,
    });
  }, [currentSite, is3D]);

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
            : `relative h-56 sm:h-68 lg:h-74 w-full overflow-hidden rounded-lg border border-line bg-muted/60 shadow-inner ${className}`
        }
      >
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
                {currentSite.jurisdiction} · APN: {currentSite.apn} · {currentSite.grossAcres} AC · Elevation: {currentSite.elevationFt} ft MSL
              </p>
            </div>

            {/* Quick tab switcher inside modal */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1 rounded-lg border border-white/15 bg-zinc-950/70 p-1">
                {REAL_SAMPLE_SITES.map((site, idx) => (
                  <button
                    key={site.id}
                    type="button"
                    onClick={() => onSelectIndex?.(idx)}
                    className={`rounded px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                      idx === activeIndex
                        ? "bg-emerald-500/25 text-emerald-300 font-semibold border border-emerald-400/40"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {site.category.split(" ")[0]}
                  </button>
                ))}
              </div>

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

          {/* Top-Left Live Status Badge */}
          <div className="absolute left-2.5 top-2.5 z-10 flex flex-wrap items-center gap-1.5 pointer-events-none">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-zinc-950/85 px-2.5 py-1 text-[10px] font-mono font-medium text-emerald-400 shadow-lg backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>MAPBOX SATELLITE</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1 rounded-full border border-white/10 bg-zinc-950/75 px-2 py-0.5 text-[10px] font-mono text-zinc-300 backdrop-blur-md">
              <span>{currentSite.elevationFt} ft MSL</span>
            </div>
          </div>

          {/* Top-Right GIS Floating Control Toolbar */}
          <div className="absolute right-2.5 top-2.5 z-10 flex items-center gap-1">
            {/* 3D / 2D Tilt Button */}
            <button
              type="button"
              onClick={toggle3D}
              title={is3D ? "Switch to 2D Top-Down View" : "Switch to 3D Oblique View"}
              className="flex size-7 sm:size-8 items-center justify-center rounded-md border border-white/20 bg-zinc-950/85 text-zinc-200 shadow-md backdrop-blur-md transition-all hover:bg-zinc-800 hover:text-white cursor-pointer"
            >
              {is3D ? (
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

            {/* In expanded mode, show explicit zoom controls */}
            {isExpanded && (
              <>
                <button
                  type="button"
                  onClick={() => handleZoom(1)}
                  title="Zoom In"
                  className="flex size-7 sm:size-8 items-center justify-center rounded-md border border-white/20 bg-zinc-950/85 text-zinc-200 shadow-md backdrop-blur-md transition-all hover:bg-zinc-800 hover:text-white cursor-pointer"
                >
                  <Plus className="size-3.5 sm:size-4 text-zinc-200" />
                </button>
                <button
                  type="button"
                  onClick={() => handleZoom(-1)}
                  title="Zoom Out"
                  className="flex size-7 sm:size-8 items-center justify-center rounded-md border border-white/20 bg-zinc-950/85 text-zinc-200 shadow-md backdrop-blur-md transition-all hover:bg-zinc-800 hover:text-white cursor-pointer"
                >
                  <Minus className="size-3.5 sm:size-4 text-zinc-200" />
                </button>
              </>
            )}

            {/* Expand / Minimize Button */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Collapse Map" : "Expand Full Interactive 3D Map"}
              className="flex size-7 sm:size-8 items-center justify-center rounded-md border border-emerald-500/40 bg-emerald-950/90 text-emerald-300 shadow-md backdrop-blur-md transition-all hover:bg-emerald-900 hover:text-white cursor-pointer"
            >
              {isExpanded ? (
                <Minimize2 className="size-3.5 sm:size-4" />
              ) : (
                <Maximize2 className="size-3.5 sm:size-4" />
              )}
            </button>
          </div>

          {/* Expanded GIS Legend Card */}
          {isExpanded && (
            <div className="absolute left-4 top-14 z-20 max-w-xs sm:max-w-sm rounded-xl border border-white/20 bg-zinc-950/90 p-3 sm:p-4 text-white shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  GIS Layer Overlays
                </span>
              </div>
              <div className="mt-2.5 space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded border border-emerald-400 bg-emerald-500/30" />
                  <span className="font-mono text-zinc-200">Candidate Parcel ({currentSite.grossAcres} AC)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1 w-4 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
                  <span className="font-mono text-zinc-200">{currentSite.transmissionCorridor.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-amber-400" />
                  <span className="font-mono text-zinc-200">{currentSite.substation.name} ({currentSite.substation.distanceMiles})</span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Telemetry HUD Bar (Inline collapsed mode) */}
          {!isExpanded && (
            <div className="absolute bottom-2 left-2 right-2 z-10 rounded-lg border border-white/15 bg-zinc-950/90 p-2 sm:p-2.5 text-white shadow-xl backdrop-blur-md">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 shrink-0 rounded-full bg-emerald-400" />
                    <span className="font-mono text-[10.5px] sm:text-xs font-semibold text-emerald-300 truncate">
                      {currentSite.name}
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-[9.5px] sm:text-[10px] text-zinc-400 truncate">
                    ⚡ {currentSite.substation.name} ({currentSite.substation.distanceMiles}) · APN {currentSite.apn}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0 border-t border-white/10 sm:border-t-0">
                  <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    className="inline-flex items-center gap-1 rounded border border-emerald-400/40 bg-emerald-500/20 px-2 py-0.5 sm:py-1 font-mono text-[9.5px] sm:text-[10px] font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-colors cursor-pointer"
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
                <span>Real California Geographic Records · Maxar / USDA NAIP Satellite Imagery</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <Button
                asChild
                className="w-full sm:w-auto gap-2 bg-emerald text-emerald-foreground hover:bg-emerald-soft cursor-pointer text-sm h-10"
              >
                <Link href={`/request?apn=${encodeURIComponent(currentSite.apn)}`}>
                  Screen This Parcel ($1,500)
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
