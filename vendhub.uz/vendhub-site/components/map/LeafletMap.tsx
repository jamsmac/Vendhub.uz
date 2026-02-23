'use client'

import { useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import L from 'leaflet'
import type { Machine } from '@/lib/types'

import 'leaflet/dist/leaflet.css'

// Tashkent center
const CENTER: L.LatLngExpression = [41.31, 69.28]
const ZOOM = 11

// Design system colors
const COLOR_ONLINE = '#7CB69D' // mint
const COLOR_OFFLINE = '#E57373' // soft red
const COLOR_CLUSTER = '#5D4037' // espresso-dark

function createMachineIcon(status: string) {
  const color = status === 'online' ? COLOR_ONLINE : COLOR_OFFLINE
  return L.divIcon({
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
    html: `<div style="
      width:36px;height:36px;border-radius:50%;
      background:${color};border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.25);
      display:flex;align-items:center;justify-content:center;
      font-size:16px;cursor:pointer;
      transition:transform 0.15s ease;
    " onmouseenter="this.style.transform='scale(1.2)'"
       onmouseleave="this.style.transform='scale(1)'"
    >☕</div>`,
  })
}

function createClusterIcon(count: number) {
  return L.divIcon({
    className: '',
    iconSize: [44, 44],
    html: `<div style="
      width:44px;height:44px;border-radius:50%;
      background:${COLOR_CLUSTER};border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
      display:flex;align-items:center;justify-content:center;
      color:white;font-size:14px;font-weight:700;
      font-family:'DM Sans',sans-serif;cursor:pointer;
    ">${count}</div>`,
  })
}

// Fit map bounds to filtered machines
function FitBounds({ machines }: { machines: Machine[] }) {
  const map = useMap()

  useMemo(() => {
    const points = machines
      .filter((m) => m.latitude != null && m.longitude != null)
      .map((m) => [m.latitude!, m.longitude!] as L.LatLngTuple)

    if (points.length > 1) {
      map.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 14 })
    } else if (points.length === 1) {
      map.setView(points[0], 14)
    }
  }, [machines, map])

  return null
}

const USER_ICON = L.divIcon({
  className: '',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  html: `<div style="
    width:20px;height:20px;border-radius:50%;
    background:#4285F4;border:3px solid white;
    box-shadow:0 0 0 0 rgba(66,133,244,0.4),0 2px 6px rgba(0,0,0,0.25);
    animation:userPulse 2s ease-out infinite;
  "></div>
  <style>
    @keyframes userPulse {
      0% { box-shadow:0 0 0 0 rgba(66,133,244,0.4),0 2px 6px rgba(0,0,0,0.25); }
      70% { box-shadow:0 0 0 20px rgba(66,133,244,0),0 2px 6px rgba(0,0,0,0.25); }
      100% { box-shadow:0 0 0 0 rgba(66,133,244,0),0 2px 6px rgba(0,0,0,0.25); }
    }
  </style>`,
})

interface LeafletMapProps {
  machines: Machine[]
  onMachineClick: (machine: Machine) => void
  userLocation?: { lat: number; lng: number } | null
}

export default function LeafletMap({ machines, onMachineClick, userLocation }: LeafletMapProps) {
  const validMachines = useMemo(
    () => machines.filter((m) => m.latitude != null && m.longitude != null),
    [machines]
  )

  return (
    <div className="relative mb-8">
      <MapContainer
        center={CENTER}
        zoom={ZOOM}
        className="h-64 md:h-96 rounded-2xl overflow-hidden shadow-md z-0"
        scrollWheelZoom={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={(cluster: { getChildCount: () => number }) =>
            createClusterIcon(cluster.getChildCount())
          }
        >
          {validMachines.map((machine) => (
            <Marker
              key={machine.id}
              position={[machine.latitude!, machine.longitude!]}
              icon={createMachineIcon(machine.status)}
              eventHandlers={{
                click: () => onMachineClick(machine),
              }}
            >
              <Popup>
                <div className="text-sm font-medium">{machine.name}</div>
                <div className="text-xs text-gray-500">{machine.address}</div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <FitBounds machines={validMachines} />
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={USER_ICON}
          />
        )}
      </MapContainer>
    </div>
  )
}
