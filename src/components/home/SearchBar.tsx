import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { AREAS, GENDER_TYPES } from '@/lib/constants';

export default function SearchBar() {
  const navigate = useNavigate();
  const [area, setArea] = useState('');
  const [genderType, setGenderType] = useState('');
  const [maxRent, setMaxRent] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (area) params.append('area', area);
    if (genderType) params.append('gender_type', genderType);
    if (maxRent) params.append('max_rent', maxRent);
    
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select value={area} onValueChange={setArea}>
          <SelectTrigger>
            <SelectValue placeholder="Select Area" />
          </SelectTrigger>
          <SelectContent>
            {AREAS.map((areaOption) => (
              <SelectItem key={areaOption} value={areaOption}>
                {areaOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={genderType} onValueChange={setGenderType}>
          <SelectTrigger>
            <SelectValue placeholder="Boys/Girls/Co-ed" />
          </SelectTrigger>
          <SelectContent>
            {GENDER_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Max Budget"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
        />

        <Button onClick={handleSearch} className="w-full">
          <Search className="mr-2 h-4 w-4" />
          Search PG
        </Button>
      </div>
    </div>
  );
}
