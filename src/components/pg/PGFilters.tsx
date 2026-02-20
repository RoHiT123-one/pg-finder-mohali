import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AREAS, GENDER_TYPES } from '@/lib/constants';
import type { PGFilters } from '@/types';

interface PGFiltersProps {
  filters: PGFilters;
  onFiltersChange: (filters: PGFilters) => void;
}

export default function PGFiltersComponent({ filters, onFiltersChange }: PGFiltersProps) {
  const [localFilters, setLocalFilters] = useState<PGFilters>(filters);

  const handleFilterChange = (key: keyof PGFilters, value: string | number | boolean | undefined) => {
    setLocalFilters((prev: PGFilters) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
  };

  const clearFilters = () => {
    const emptyFilters: PGFilters = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Area</Label>
          <Select
            value={localFilters.area || 'all'}
            onValueChange={(value) => handleFilterChange('area', value === 'all' ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Areas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              {AREAS.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Gender Type</Label>
          <Select
            value={localFilters.gender_type || 'all'}
            onValueChange={(value) => handleFilterChange('gender_type', value === 'all' ? undefined : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {GENDER_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Budget Range</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Input
              type="number"
              placeholder="Min"
              value={localFilters.min_rent || ''}
              onChange={(e) => handleFilterChange('min_rent', e.target.value ? Number(e.target.value) : undefined)}
            />
            <Input
              type="number"
              placeholder="Max"
              value={localFilters.max_rent || ''}
              onChange={(e) => handleFilterChange('max_rent', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label>Amenities</Label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="food"
              checked={localFilters.food_included || false}
              onCheckedChange={(checked) => handleFilterChange('food_included', checked)}
            />
            <label htmlFor="food" className="text-sm cursor-pointer">
              Food Included
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ac"
              checked={localFilters.ac_available || false}
              onCheckedChange={(checked) => handleFilterChange('ac_available', checked)}
            />
            <label htmlFor="ac" className="text-sm cursor-pointer">
              AC Available
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="bathroom"
              checked={localFilters.attached_bathroom || false}
              onCheckedChange={(checked) => handleFilterChange('attached_bathroom', checked)}
            />
            <label htmlFor="bathroom" className="text-sm cursor-pointer">
              Attached Bathroom
            </label>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={applyFilters} className="flex-1">
            Apply
          </Button>
          <Button onClick={clearFilters} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
