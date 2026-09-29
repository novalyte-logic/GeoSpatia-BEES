"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  X,
  MapPin,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Info,
  Loader2,
  Compass,
  Move,
  Maximize2,
  Minimize2,
  Moon,
  Sun,
  Mountain,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import {
  MAPBOX_PUBLIC_TOKEN,
  isMapboxConfigured,
  CALIFORNIA_CENTER,
  CALIFORNIA_DEFAULT_ZOOM,
  searchAddress,
  reverseGeocode,
  isCaliforniaLocation,
  formatPrecisionLabel,
  type GeocodingFeature,
} from "@/lib/mapbox";
import { trackEvent } from "@/lib/analytics";
import "mapbox-gl/dist/mapbox-gl.css";

export const MAP_STYLES = {
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
  dark: "mapbox://styles/mapbox/dark-v11",
  outdoors: "mapbox://styles/mapbox/outdoors-v12",
  streets: "mapbox://styles/mapbox/light-v11",
} as const;

export type MapStyleKey = keyof typeof MAP_STYLES;

export type InteractiveLocatorMapProps = {
  className?: string;
  defaultExpanded?: boolean;
  defaultStyle?: MapStyleKey;
  lazyMount?: boolean;
  onExpandChange?: (expanded: boolean) => void;
};

const MAP_DISCLAIMER =
  "Preliminary geographic reference only. A geocoded point is not a verified parcel boundary and does not establish grid capacity, interconnection feasibility, or project suitability.";

/**
 * Injects 3D Digital Elevation Model (DEM) terrain, realistic sky/fog atmosphere,
 * and 3D extruded buildings into the active Mapbox instance.
 */
function applyRealistic3DEffects(
  map: any,
  styleKey: MapStyleKey,
  enable3D: boolean
) {
  if (!map) return;

  try {
    // 1. Add DEM elevation raster source if not already present
    if (!map.getSource("mapbox-dem")) {
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
    }

    // 2. Apply or remove 3D terrain elevation mesh
    if (enable3D) {
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.35 });
    } else {
      map.setTerrain(null);
    }

    // 3. Realistic Atmosphere, Horizon Haze & Sky Fog
    if (map.setFog) {
      if (styleKey === "dark") {
        map.setFog({
          range: [-0.5, 3.5],
          color: "#0f172a",
          "horizon-blend": 0.25,
          "high-color": "#020617",
          "space-color": "#000000",
          "star-intensity": 0.9,
        });
      } else if (styleKey === "satellite") {
        map.setFog({
          range: [-0.5, 4.0],
          color: "#def1ff",
          "horizon-blend": 0.22,
          "high-color": "#1d4ed8",
          "space-color": "#030712",
          "star-intensity": 0.75,
        });
      } else {
        map.setFog({
          range: [-0.5, 3.0],
          color: "#f8fafc",
          "horizon-blend": 0.15,
          "high-color": "#60a5fa",
          "space-color": "#020617",
          "star-intensity": 0.5,
        });
      }
    }

    // 4. 3D Building Extrusions for vector basemap styles
    if (styleKey !== "satellite") {
      const layers = map.getStyle()?.layers || [];
      const labelLayerId = layers.find(
        (layer: any) =>
          layer.type === "symbol" && layer.layout && layer.layout["text-field"]
      )?.id;

      if (!map.getLayer("3d-buildings") && map.getSource("composite")) {
        map.addLayer(
          {
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 14,
            paint: {
              "fill-extrusion-color":
                styleKey === "dark" ? "#1e293b" : "#cbd5e1",
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                14,
                0,
                14.5,
                ["get", "height"],
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                14,
                0,
                14.5,
                ["get", "min_height"],
              ],
              "fill-extrusion-opacity": 0.85,
            },
          },
          labelLayerId
        );
      }
    }
  } catch (err) {
    console.warn("[Mapbox 3D terrain notice]", err);
  }
}

/**
 * Checks if input text looks like raw latitude/longitude coordinates (e.g. "36.234, -119.892")
 */
function tryParseCoordinates(
  text: string
): { lat: number; lng: number } | null {
  const match = text.match(
    /^\s*([+-]?\d{1,2}(?:\.\d+)?)\s*,\s*([+-]?\d{1,3}(?:\.\d+)?)\s*$/
  );
  if (!match) return null;
  const lat = parseFloat(match[1]);
  const lng = parseFloat(match[2]);
  if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return null;
  }
  return { lat, lng };
}

export function InteractiveLocatorMap({
  className,
  defaultExpanded = false,
  defaultStyle = "satellite",
  lazyMount = false,
  onExpandChange,
}: InteractiveLocatorMapProps) {
  const rootWrapperRef = React.useRef<HTMLDivElement | null>(null);
  const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = React.useRef<any>(null);
  const markerRef = React.useRef<any>(null);
  const mapLoadedRef = React.useRef(false);

  // Lazy viewport mounting
  const [isInViewport, setIsInViewport] = React.useState(!lazyMount);

  // Layout & engine state
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);
  const [mapLoaded, setMapLoaded] = React.useState(false);
  const [mapError, setMapError] = React.useState<string | null>(null);
  const [fallbackActive, setFallbackActive] = React.useState(false);
  const [currentStyle, setCurrentStyle] = React.useState<MapStyleKey>(defaultStyle);
  const [is3D, setIs3D] = React.useState(true);

  // Search state
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<GeocodingFeature[]>([]);
  const [searchError, setSearchError] = React.useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isApnFormat, setIsApnFormat] = React.useState(false);

  // Selected Pin state
  const [selectedLocation, setSelectedLocation] = React.useState<{
    address: string;
    coordinates: [number, number]; // [lng, lat]
    precision: string;
    isCalifornia: boolean;
    isManualAdjust: boolean;
  } | null>(null);

  const [isReverseGeocoding, setIsReverseGeocoding] = React.useState(false);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  // 1. Lazy viewport observer
  React.useEffect(() => {
    if (!lazyMount || isInViewport) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsInViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px" }
    );

    if (rootWrapperRef.current) {
      observer.observe(rootWrapperRef.current);
    }
    return () => observer.disconnect();
  }, [lazyMount, isInViewport]);

  // Toggle expansion
  const toggleExpand = () => {
    setIsExpanded((prev) => {
      const next = !prev;
      onExpandChange?.(next);
      return next;
    });
  };

  // Resize Mapbox canvas when container changes or toggles expanded
  React.useEffect(() => {
    const handleResize = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.resize();
      }
    };

    const timers = [
      setTimeout(handleResize, 50),
      setTimeout(handleResize, 150),
      setTimeout(handleResize, 300),
      setTimeout(handleResize, 500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isExpanded]);

  // Handle ESC key to exit expanded mode
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
        onExpandChange?.(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded, onExpandChange]);

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

  // Initialize Mapbox GL instance with resilience, container sizing checks, and WebGL verification
  React.useEffect(() => {
    if (
      !isMapboxConfigured ||
      !isInViewport ||
      !mapContainerRef.current ||
      mapInstanceRef.current ||
      fallbackActive
    ) {
      return;
    }

    let isMounted = true;
    let watchdogTimer: NodeJS.Timeout | null = null;
    let resizeObserver: ResizeObserver | null = null;

    async function tryInitEngine() {
      try {
        const container = mapContainerRef.current;
        if (!container) return;

        // Ensure container is rendered and has positive dimensions
        if (container.clientWidth < 50 || container.clientHeight < 50) {
          // Defer until container is sized
          if (!resizeObserver) {
            resizeObserver = new ResizeObserver((entries) => {
              const entry = entries[0];
              if (
                entry &&
                entry.contentRect.width > 50 &&
                entry.contentRect.height > 50
              ) {
                resizeObserver?.disconnect();
                resizeObserver = null;
                if (isMounted && !mapInstanceRef.current) {
                  tryInitEngine();
                }
              }
            });
            resizeObserver.observe(container);
          }
          return;
        }

        const mapboxgl = (await import("mapbox-gl")).default;

        // Verify WebGL capability
        if (
          typeof mapboxgl.supported === "function" &&
          !mapboxgl.supported({ failIfMajorPerformanceCaveat: false })
        ) {
          if (isMounted) {
            setMapError("WebGL is not supported or hardware acceleration is disabled in this browser.");
            setFallbackActive(true);
          }
          return;
        }

        mapboxgl.accessToken = MAPBOX_PUBLIC_TOKEN;

        const map = new mapboxgl.Map({
          container,
          style: MAP_STYLES[currentStyle],
          center: CALIFORNIA_CENTER,
          zoom: CALIFORNIA_DEFAULT_ZOOM,
          pitch: 50,
          bearing: -14,
          maxPitch: 85,
          attributionControl: true,
          dragRotate: true,
          pitchWithRotate: true,
          touchPitch: true,
        });

        // 8-second watchdog timer: never leave map indefinitely loading
        watchdogTimer = setTimeout(() => {
          if (isMounted && !mapLoadedRef.current) {
            console.warn("[Mapbox watchdog] Map tiles timed out after 8s; enabling fallback.");
            setMapError(
              "Basemap network connection timed out. You can still search addresses or enter candidate coordinates below."
            );
            setFallbackActive(true);
          }
        }, 8000);

        map.addControl(
          new mapboxgl.NavigationControl({
            showCompass: true,
            showZoom: true,
            visualizePitch: true,
          }),
          "top-right"
        );

        map.addControl(
          new mapboxgl.ScaleControl({
            maxWidth: 120,
            unit: "imperial",
          }),
          "bottom-right"
        );

        map.on("load", () => {
          if (watchdogTimer) clearTimeout(watchdogTimer);
          mapLoadedRef.current = true;
          if (isMounted) {
            setMapLoaded(true);
            setMapError(null);
            applyRealistic3DEffects(map, currentStyle, true);
            map.resize();
          }
        });

        map.on("error", (e) => {
          console.warn("[mapbox error]", e?.error?.message || e);
          if (isMounted && !mapLoadedRef.current) {
            if (watchdogTimer) clearTimeout(watchdogTimer);
            setMapError(
              "Unable to load Mapbox tiles. Please verify token domain restrictions or network connectivity."
            );
            setFallbackActive(true);
          }
        });

        mapInstanceRef.current = map;
      } catch (err) {
        if (watchdogTimer) clearTimeout(watchdogTimer);
        if (isMounted) {
          console.warn("[Mapbox initialization error]", err);
          setMapError("Failed to initialize Mapbox GL JS engine.");
          setFallbackActive(true);
        }
      }
    }

    tryInitEngine();

    return () => {
      isMounted = false;
      if (watchdogTimer) clearTimeout(watchdogTimer);
      if (resizeObserver) resizeObserver.disconnect();
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      mapLoadedRef.current = false;
    };
  }, [isInViewport, fallbackActive]);

  // Switch style dynamically & re-apply terrain and atmosphere
  const switchStyle = (styleKey: MapStyleKey) => {
    if (!mapInstanceRef.current || styleKey === currentStyle) return;
    setCurrentStyle(styleKey);
    const map = mapInstanceRef.current;
    map.setStyle(MAP_STYLES[styleKey]);
    map.once("style.load", () => {
      applyRealistic3DEffects(map, styleKey, is3D);
    });
  };

  // Toggle Dark Mode on the map
  const toggleDarkMode = () => {
    if (currentStyle === "dark") {
      switchStyle("satellite");
    } else {
      switchStyle("dark");
    }
  };

  // Toggle 3D Terrain Perspective
  const toggle3D = () => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    const next3D = !is3D;
    setIs3D(next3D);

    applyRealistic3DEffects(map, currentStyle, next3D);

    if (next3D) {
      map.easeTo({
        pitch: 60,
        bearing: map.getBearing() || -16,
        duration: 1200,
        essential: true,
      });
    } else {
      map.easeTo({
        pitch: 0,
        bearing: 0,
        duration: 900,
        essential: true,
      });
    }
  };

  // Perform search with debounce
  React.useEffect(() => {
    const trimmed = searchQuery.trim();
    const looksLikeApn = /^[\d\s-]{6,15}$/.test(trimmed);
    setIsApnFormat(looksLikeApn);

    // Check if user entered raw coordinates
    const parsedCoords = tryParseCoordinates(trimmed);
    if (parsedCoords) {
      const inCa = isCaliforniaLocation(parsedCoords.lng, parsedCoords.lat);
      setSelectedLocation({
        address: `${parsedCoords.lat.toFixed(5)}°N, ${Math.abs(parsedCoords.lng).toFixed(5)}°W`,
        coordinates: [parsedCoords.lng, parsedCoords.lat],
        precision: "User Entered Coordinates",
        isCalifornia: inCa,
        isManualAdjust: false,
      });
      setSuggestions([]);
      setIsDropdownOpen(false);
      return;
    }

    if (trimmed.length < 3) {
      setSuggestions([]);
      setSearchError(null);
      setIsDropdownOpen(false);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const timer = setTimeout(async () => {
      setIsSearching(true);
      setSearchError(null);

      const res = await searchAddress(trimmed, controller.signal);
      setIsSearching(false);

      if (!res.success) {
        setSearchError(res.error);
        setSuggestions([]);
        setIsDropdownOpen(true);
      } else {
        setSuggestions(res.features);
        setIsDropdownOpen(true);
        setSelectedIndex(-1);
      }
    }, 260);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Place or move marker on map
  const placeMarker = async (
    lng: number,
    lat: number,
    address: string,
    precision: string,
    feature?: GeocodingFeature
  ) => {
    const inCa = isCaliforniaLocation(lng, lat, feature);
    trackEvent("map_search_used", { is_california: inCa });

    setSelectedLocation({
      address,
      coordinates: [lng, lat],
      precision,
      isCalifornia: inCa,
      isManualAdjust: false,
    });

    if (!mapInstanceRef.current) return;

    try {
      const mapboxgl = (await import("mapbox-gl")).default;

      if (!markerRef.current) {
        const el = document.createElement("div");
        el.className = "geospatial-marker cursor-grab active:cursor-grabbing";
        el.setAttribute("role", "button");
        el.setAttribute("aria-label", "Candidate site marker (draggable)");
        el.setAttribute("tabindex", "0");
        el.innerHTML = `
          <div style="display:flex; flex-direction:column; align-items:center; transform:translateY(-100%);">
            <div style="background-color:#059669; color:white; border-radius:9999px; padding:6px; box-shadow:0 6px 12px -2px rgba(0,0,0,0.35), 0 3px 6px -2px rgba(0,0,0,0.25); border:2.5px solid white;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div style="width:2.5px; height:8px; background-color:#059669;"></div>
            <div style="width:10px; height:10px; border-radius:9999px; background-color:rgba(5,150,105,0.45); margin-top:-3px;"></div>
          </div>
        `;

        const marker = new mapboxgl.Marker({
          element: el,
          draggable: true,
        })
          .setLngLat([lng, lat])
          .addTo(mapInstanceRef.current);

        marker.on("dragend", async () => {
          const newCoords = marker.getLngLat();
          setIsReverseGeocoding(true);
          const rev = await reverseGeocode(newCoords.lng, newCoords.lat);
          setIsReverseGeocoding(false);

          const revInCa = isCaliforniaLocation(
            newCoords.lng,
            newCoords.lat,
            rev.success ? rev.feature : undefined
          );

          setSelectedLocation({
            address: rev.success
              ? rev.placeName
              : `${newCoords.lat.toFixed(5)}°N, ${Math.abs(newCoords.lng).toFixed(5)}°W`,
            coordinates: [newCoords.lng, newCoords.lat],
            precision: "Manually Placed Pin",
            isCalifornia: revInCa,
            isManualAdjust: true,
          });
        });

        markerRef.current = marker;
      } else {
        markerRef.current.setLngLat([lng, lat]);
      }

      mapInstanceRef.current.flyTo({
        center: [lng, lat],
        zoom: 15,
        pitch: is3D ? 60 : 0,
        bearing: is3D ? -15 : 0,
        essential: true,
        duration: 1800,
      });
    } catch (err) {
      console.warn("[placeMarker error]", err);
    }
  };

  const handleSelectSuggestion = (feature: GeocodingFeature) => {
    setIsDropdownOpen(false);
    setSearchQuery(feature.place_name);
    const [lng, lat] = feature.center;
    const precision = formatPrecisionLabel(feature.place_type);
    placeMarker(lng, lat, feature.place_name, precision, feature);
  };

  const clearSelection = () => {
    setSearchQuery("");
    setSuggestions([]);
    setIsDropdownOpen(false);
    setSelectedLocation(null);
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center: CALIFORNIA_CENTER,
        zoom: CALIFORNIA_DEFAULT_ZOOM,
        pitch: is3D ? 50 : 0,
        bearing: is3D ? -14 : 0,
        essential: true,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isDropdownOpen || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSelectSuggestion(suggestions[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  // DESIGNED FALLBACK STATE: If Mapbox token is missing, WebGL is unsupported, or network timed out
  if (!isMapboxConfigured || fallbackActive) {
    return (
      <div
        ref={rootWrapperRef}
        className={cn(
          "surface-card relative flex flex-col overflow-hidden border border-line p-5 sm:p-7 shadow-sm",
          className
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald/10 text-emerald">
              <Compass className="size-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-ink">
                California Candidate Site Locator
              </h3>
              <p className="text-[11px] sm:text-xs text-muted-foreground">
                {!isMapboxConfigured
                  ? "Standard address lookup active (Mapbox basemap key not configured)"
                  : "WebGL basemap unavailable — standard location lookup active"}
              </p>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            asChild
            className="text-xs h-8 gap-1.5 border-line hover:bg-muted"
          >
            <Link href="/request">
              Open Request Form Directly
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>

        {/* Fallback Search Input */}
        <div className="mt-5 space-y-3">
          <label htmlFor="fallback-location-search" className="block text-xs font-medium text-ink">
            Look up a California address, APN, or coordinates:
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground pointer-events-none" />
            <Input
              id="fallback-location-search"
              type="text"
              role="combobox"
              aria-expanded={isDropdownOpen}
              aria-autocomplete="list"
              aria-controls="fallback-geocoder-suggestions"
              placeholder="e.g. Gates Substation, Huron, CA or 36.234, -119.892..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (suggestions.length > 0) setIsDropdownOpen(true);
              }}
              className="pl-9 pr-12 h-10 bg-background text-xs sm:text-sm text-ink focus-visible:ring-emerald/40"
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-3 size-4 animate-spin text-muted-foreground" />
            )}
            {searchQuery && !isSearching && (
              <button
                type="button"
                onClick={clearSelection}
                className="absolute right-2.5 top-2.5 size-5 inline-flex items-center justify-center rounded text-muted-foreground hover:text-ink"
                aria-label="Clear location input"
              >
                <X className="size-3.5" />
              </button>
            )}

            {/* Suggestions dropdown in fallback mode */}
            {isDropdownOpen && (
              <div
                id="fallback-geocoder-suggestions"
                role="listbox"
                className="absolute z-30 mt-1 w-full rounded-lg border border-line bg-card p-1 shadow-xl max-h-56 overflow-y-auto"
              >
                {searchError ? (
                  <div className="p-2.5 text-xs text-rose flex items-center gap-2">
                    <AlertTriangle className="size-3.5 shrink-0" />
                    <span>{searchError}</span>
                  </div>
                ) : suggestions.length === 0 ? (
                  <div className="p-3 text-xs text-muted-foreground">
                    {isApnFormat ? (
                      <p>
                        Assessor Parcel Numbers (APNs) are evaluated manually during our research process. You can submit this APN directly in the request form.
                      </p>
                    ) : (
                      <p>No address matches found. You can still type coordinates or proceed directly to the request form.</p>
                    )}
                  </div>
                ) : (
                  suggestions.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={selectedIndex === idx}
                      onClick={() => handleSelectSuggestion(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        "w-full text-left px-2.5 py-2 rounded-md text-xs transition-colors flex items-start gap-2",
                        selectedIndex === idx
                          ? "bg-emerald/10 text-emerald font-medium"
                          : "text-ink hover:bg-muted/50"
                      )}
                    >
                      <MapPin className="size-3.5 shrink-0 text-muted-foreground mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-ink font-medium">{item.place_name}</p>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          {formatPrecisionLabel(item.place_type)}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Selected Location Summary in Fallback */}
        {selectedLocation ? (
          <div className="mt-4 rounded-lg border border-emerald/30 bg-emerald/5 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald">
                  Selected Candidate Location
                </span>
                <p className="text-sm font-bold text-ink mt-0.5">{selectedLocation.address}</p>
                <p className="font-mono text-xs text-muted-foreground mt-1">
                  {selectedLocation.coordinates[1].toFixed(5)}°N, {Math.abs(selectedLocation.coordinates[0]).toFixed(5)}°W · {selectedLocation.precision}
                </p>
              </div>
              <Button
                size="sm"
                asChild
                className="gap-1.5 bg-emerald text-emerald-foreground hover:bg-emerald-soft text-xs font-semibold cursor-pointer shrink-0"
              >
                <Link
                  href={`/request?location=${encodeURIComponent(
                    `${selectedLocation.address} (${selectedLocation.coordinates[1].toFixed(5)}°N, ${Math.abs(selectedLocation.coordinates[0]).toFixed(5)}°W)`
                  )}`}
                >
                  Use in Site Screen Request
                  <ArrowRight className="size-3" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-line-soft bg-muted/30 p-3 text-xs text-muted-foreground">
            <p>
              Enter any California municipality, nearby substation name, parcel coordinate, or county above to prefill your site screen inquiry.
            </p>
          </div>
        )}

        {/* Disclaimer footer */}
        <div className="mt-5 border-t border-line pt-3 flex items-start gap-2 text-[11px] text-muted-foreground">
          <ShieldCheck className="size-3.5 text-emerald shrink-0 mt-0.5" />
          <span>{MAP_DISCLAIMER}</span>
        </div>
      </div>
    );
  }

  const isDarkModeActive = currentStyle === "dark";

  return (
    <div ref={rootWrapperRef}>
      {/* Backdrop overlay when expanded */}
      {isExpanded && (
        <div
          onClick={() => {
            setIsExpanded(false);
            onExpandChange?.(false);
          }}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Main Mapbox Container (Inline or Expanded) */}
      <div
        className={cn(
          "transition-all duration-300 ease-out",
          isExpanded
            ? "fixed inset-2 sm:inset-5 z-50 flex flex-col rounded-2xl border border-line bg-card shadow-2xl overflow-hidden"
            : cn("surface-card relative flex flex-col overflow-hidden border border-line shadow-md", className)
        )}
      >
        {/* Header Toolbar */}
        <header className="flex flex-col gap-3 border-b border-line bg-card/95 px-4 py-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between z-10">
          {/* Search Box */}
          <div className="relative flex-1 max-w-xl">
            <label htmlFor="hero-mapbox-search" className="sr-only">
              Search California address or coordinates
            </label>
            <div className="relative flex items-center">
              <Search className="absolute left-3 size-3.5 text-muted-foreground pointer-events-none" />
              <Input
                id="hero-mapbox-search"
                type="text"
                role="combobox"
                aria-expanded={isDropdownOpen}
                aria-autocomplete="list"
                aria-controls="hero-geocoder-suggestions"
                placeholder="Search address, city, or coordinates (e.g. Gates Substation, CA)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (suggestions.length > 0) setIsDropdownOpen(true);
                }}
                className="pl-9 pr-16 h-9 bg-background text-xs sm:text-sm text-ink focus-visible:ring-emerald/40"
              />

              <div className="absolute right-2 flex items-center gap-1">
                {isSearching && <Loader2 className="size-3.5 animate-spin text-muted-foreground mr-1" />}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="size-6 inline-flex items-center justify-center rounded text-muted-foreground hover:text-ink hover:bg-muted"
                    aria-label="Clear search"
                  >
                    <X className="size-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Dropdown Suggestions */}
            {isDropdownOpen && (
              <div
                id="hero-geocoder-suggestions"
                role="listbox"
                className="absolute z-50 mt-1 w-full rounded-lg border border-line bg-card p-1 shadow-xl max-h-56 overflow-y-auto"
              >
                {searchError ? (
                  <div className="p-2.5 text-xs text-rose flex items-center gap-2">
                    <AlertTriangle className="size-3.5 shrink-0" />
                    <span>{searchError}</span>
                  </div>
                ) : suggestions.length === 0 ? (
                  <div className="p-3 text-xs text-muted-foreground">
                    {isApnFormat ? (
                      <div className="space-y-1">
                        <p className="font-semibold text-ink flex items-center gap-1.5">
                          <Info className="size-3.5 text-amber" />
                          APNs are not street addresses
                        </p>
                        <p className="text-[11px]">
                          Public geocoders search addresses rather than tax assessor numbers. Enter a nearby street or position the pin manually.
                        </p>
                      </div>
                    ) : (
                      <p>No address matches found. Try entering a nearby street, coordinates, or city.</p>
                    )}
                  </div>
                ) : (
                  suggestions.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={selectedIndex === idx}
                      onClick={() => handleSelectSuggestion(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        "w-full text-left px-2.5 py-2 rounded-md text-xs transition-colors flex items-start gap-2",
                        selectedIndex === idx
                          ? "bg-emerald/10 text-emerald font-medium"
                          : "text-ink hover:bg-muted/50"
                      )}
                    >
                      <MapPin className="size-3.5 shrink-0 text-muted-foreground mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-ink font-medium">{item.place_name}</p>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          {formatPrecisionLabel(item.place_type)}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Right Toolbar Controls: 3D Toggle, Dark Mode Toggle, Styles & Expand */}
          <div className="flex items-center flex-wrap gap-1.5 self-end sm:self-auto shrink-0">
            {/* 3D Realistic Terrain Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggle3D}
              className={cn(
                "h-8 px-2.5 gap-1.5 text-xs font-medium cursor-pointer border-line transition-colors",
                is3D
                  ? "bg-emerald/15 text-emerald border-emerald/40 hover:bg-emerald/25"
                  : "text-muted-foreground hover:text-ink hover:bg-muted"
              )}
              title={is3D ? "3D terrain active (click for top-down flat)" : "Click to enable 3D realistic terrain and oblique angle"}
              aria-label={is3D ? "Switch to 2D flat view" : "Switch to 3D terrain view"}
            >
              <Mountain className="size-3.5" />
              <span>{is3D ? "3D Relief" : "2D Flat"}</span>
            </Button>

            {/* Direct Dark Mode Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleDarkMode}
              className={cn(
                "h-8 px-2.5 gap-1.5 text-xs font-medium cursor-pointer border-line transition-colors",
                isDarkModeActive
                  ? "bg-indigo-500/15 text-indigo-400 border-indigo-500/40 hover:bg-indigo-500/25"
                  : "text-muted-foreground hover:text-ink hover:bg-muted"
              )}
              title={isDarkModeActive ? "Switch to realistic daytime satellite" : "Switch map to dark tactical mode"}
              aria-label={isDarkModeActive ? "Switch to daytime satellite" : "Switch to dark mode"}
            >
              {isDarkModeActive ? (
                <>
                  <Moon className="size-3.5 text-indigo-400" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="size-3.5 text-amber-500" />
                  <span className="hidden sm:inline">Night</span>
                </>
              )}
            </Button>

            {/* Realistic Style Switcher */}
            <div className="inline-flex items-center rounded-md border border-line bg-muted/40 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => switchStyle("satellite")}
                className={cn(
                  "px-2 py-1 rounded text-xs font-medium transition-all cursor-pointer",
                  currentStyle === "satellite"
                    ? "bg-card text-ink shadow-xs border border-line-soft font-semibold"
                    : "text-muted-foreground hover:text-ink"
                )}
                title="Ultra-photorealistic high-resolution satellite imagery"
              >
                Satellite
              </button>
              <button
                type="button"
                onClick={() => switchStyle("outdoors")}
                className={cn(
                  "px-2 py-1 rounded text-xs font-medium transition-all cursor-pointer hidden sm:inline-block",
                  currentStyle === "outdoors"
                    ? "bg-card text-ink shadow-xs border border-line-soft font-semibold"
                    : "text-muted-foreground hover:text-ink"
                )}
                title="Topographic elevation contours and natural features"
              >
                Topo
              </button>
              <button
                type="button"
                onClick={() => switchStyle("streets")}
                className={cn(
                  "px-2 py-1 rounded text-xs font-medium transition-all cursor-pointer hidden md:inline-block",
                  currentStyle === "streets"
                    ? "bg-card text-ink shadow-xs border border-line-soft font-semibold"
                    : "text-muted-foreground hover:text-ink"
                )}
                title="Clean editorial street map"
              >
                Light
              </button>
            </div>

            {/* Expand / Minimize Toggle Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleExpand}
              className="gap-1.5 h-8 px-2.5 text-xs font-medium cursor-pointer border-line"
              title={isExpanded ? "Exit full view (Esc)" : "Expand map across full viewport"}
              aria-label={isExpanded ? "Exit full view" : "Expand map"}
            >
              {isExpanded ? (
                <>
                  <Minimize2 className="size-3.5 text-emerald" />
                  <span className="hidden sm:inline">Minimize</span>
                </>
              ) : (
                <>
                  <Maximize2 className="size-3.5 text-emerald" />
                  <span className="hidden sm:inline">Expand</span>
                </>
              )}
            </Button>
          </div>
        </header>

        {/* Mapbox Canvas Container */}
        <div
          className={cn(
            "relative w-full bg-muted/20 transition-all",
            isExpanded ? "flex-1 min-h-[460px]" : "h-[450px] sm:h-[500px]"
          )}
        >
          <div ref={mapContainerRef} className="absolute inset-0 h-full w-full" />

          {/* 3D Realistic Terrain Hint Badge */}
          {mapLoaded && is3D && (
            <div className="absolute top-3 left-3 z-20 pointer-events-none hidden sm:flex items-center gap-1.5 rounded-full border border-line/60 bg-card/85 px-2.5 py-1 text-[10px] text-muted-foreground shadow-sm backdrop-blur-md">
              <Sparkles className="size-3 text-emerald" />
              <span>Right-click or Ctrl+drag to tilt & orbit 3D terrain</span>
            </div>
          )}

          {/* Loading state */}
          {!mapLoaded && !mapError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-xs z-10 text-muted-foreground gap-2">
              <Loader2 className="size-6 animate-spin text-emerald" />
              <p className="text-xs font-medium">Loading realistic 3D California basemap...</p>
            </div>
          )}

          {/* Error notice */}
          {mapError && (
            <div className="absolute inset-x-4 top-4 z-20 rounded-lg border border-rose/30 bg-card p-3.5 text-xs text-rose shadow-md max-w-sm">
              <div className="flex items-start gap-2">
                <AlertTriangle className="size-4 shrink-0 text-rose" />
                <p>{mapError}</p>
              </div>
            </div>
          )}

          {/* Interactive Selected Location Card Overlay */}
          {selectedLocation && (
            <div className="absolute bottom-3 inset-x-3 sm:inset-x-auto sm:left-3 z-20 max-w-sm w-full surface-card border border-line p-3.5 shadow-xl">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-emerald/15 text-emerald">
                    <MapPin className="size-3" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9.5px] font-semibold uppercase tracking-wider text-emerald">
                      Selected Candidate Site
                    </span>
                    <p className="text-xs font-bold text-ink truncate max-w-[200px]">
                      {selectedLocation.address}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={clearSelection}
                  className="size-5 inline-flex items-center justify-center text-muted-foreground hover:text-ink rounded"
                  aria-label="Clear pin"
                >
                  <X className="size-3" />
                </button>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-[10.5px] border-t border-line-soft pt-2 text-muted-foreground">
                <span className="font-mono text-ink font-medium">
                  {selectedLocation.coordinates[1].toFixed(5)}°N, {Math.abs(selectedLocation.coordinates[0]).toFixed(5)}°W
                </span>
                <span className="font-medium text-ink-soft">{selectedLocation.precision}</span>
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground bg-muted/60 rounded px-2 py-1">
                <Move className="size-2.5 text-emerald shrink-0" />
                <span>
                  {isReverseGeocoding ? (
                    <span className="text-emerald font-medium">Resolving new location...</span>
                  ) : (
                    "Drag pin on map to refine site position."
                  )}
                </span>
              </div>

              {!selectedLocation.isCalifornia && (
                <div className="mt-2 rounded border border-amber/30 bg-amber/5 p-1.5 text-[10px] text-amber flex items-start gap-1.5">
                  <AlertTriangle className="size-3 shrink-0 mt-0.5" />
                  <span>Outside California focus area — will be evaluated for scope fit.</span>
                </div>
              )}

              <div className="mt-2.5 pt-2 border-t border-line">
                <Button
                  size="sm"
                  asChild
                  className="w-full gap-1.5 bg-emerald text-emerald-foreground hover:bg-emerald-soft text-xs font-semibold cursor-pointer h-8"
                >
                  <Link
                    href={`/request?location=${encodeURIComponent(
                      `${selectedLocation.address} (${selectedLocation.coordinates[1].toFixed(5)}°N, ${Math.abs(selectedLocation.coordinates[0]).toFixed(5)}°W)`
                    )}`}
                  >
                    Request Site Screen for This Location
                    <ArrowRight className="size-3" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Disclaimer Strip */}
        <footer className="border-t border-line bg-muted/40 px-3.5 py-2 text-[11px] text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-emerald shrink-0" />
            <span>{MAP_DISCLAIMER}</span>
          </div>
          <span className="text-[10px] text-muted-foreground/80">
            Mapbox Geocoding & High-Res Satellite
          </span>
        </footer>
      </div>
    </div>
  );
}
