'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { companies } from '@/lib/mockData';

// Fix leaflet default icon
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  filteredCompanies?: typeof companies;
}

export default function MapComponent({ filteredCompanies }: MapComponentProps) {
  const displayCompanies = filteredCompanies || companies;

  return (
    <MapContainer
      center={[23.6345, -102.5528]}
      zoom={5}
      style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {displayCompanies.map((company) => (
        <Marker key={company.id} position={[company.lat, company.lng]}>
          <Popup>
            <div style={{ minWidth: '180px' }}>
              <strong>{company.name}</strong><br />
              {company.industry} | {company.city}<br />
              Score: {company.score} | {company.status}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
