import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/db/supabase';
import { createPG } from '@/db/api';
import { AREAS, GENDER_TYPES, FACILITIES } from '@/lib/constants';
import type { PGFormData } from '@/types';

export default function ListYourPG() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const form = useForm<PGFormData>({
    defaultValues: {
      name: '',
      area: '',
      address: '',
      rent_single: null,
      rent_double: null,
      rent_triple: null,
      security_deposit: null,
      gender_type: 'Boys',
      food_included: false,
      ac_available: false,
      attached_bathroom: false,
      wifi: false,
      laundry: false,
      ro_water: false,
      cctv: false,
      power_backup: false,
      owner_name: '',
      owner_phone: '',
      map_location: '',
      description: '',
    },
  });

  const handleImageUpload = async (files: File[]) => {
    setUploading(true);
    try {
      const urls: string[] = [];
      
      for (const file of files) {
        const fileName = `${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('app-9rps3w1146pt_pg_images')
          .upload(fileName, file);
        
        if (uploadError) throw uploadError;
        
        const { data } = supabase.storage
          .from('app-9rps3w1146pt_pg_images')
          .getPublicUrl(fileName);
        
        urls.push(data.publicUrl);
      }
      
      setImageUrls((prev) => [...prev, ...urls]);
      toast({
        title: 'Success',
        description: `${urls.length} image(s) uploaded successfully`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload images',
      });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: PGFormData) => {
    if (imageUrls.length === 0) {
      toast({
        title: 'Error',
        description: 'Please upload at least one image',
      });
      return;
    }

    try {
      const pg = await createPG(data, imageUrls);
      toast({
        title: 'Success',
        description: 'Your PG listing has been created successfully!',
      });
      navigate(`/pg/${pg?.id}`);
    } catch (error) {
      console.error('Error creating PG:', error);
      toast({
        title: 'Error',
        description: 'Failed to create PG listing',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">List Your PG</CardTitle>
            <CardDescription>
              Fill in the details below to list your PG accommodation. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: 'PG name is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PG Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Sunshine PG" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="area"
                    rules={{ required: 'Area is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select area" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {AREAS.map((area) => (
                              <SelectItem key={area} value={area}>
                                {area}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    rules={{ required: 'Address is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Address *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter complete address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender Type *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {GENDER_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe your PG..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Rent Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Rent Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="rent_single"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Single Sharing</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="₹"
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rent_double"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Double Sharing</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="₹"
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rent_triple"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Triple Sharing</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="₹"
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="security_deposit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Security Deposit</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="₹"
                            {...field}
                            value={field.value || ''}
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : null)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Facilities */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Facilities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {FACILITIES.map((facility) => (
                      <FormField
                        key={facility.key}
                        control={form.control}
                        name={facility.key as keyof PGFormData}
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value as boolean}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="cursor-pointer">{facility.label}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Owner Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Owner Details</h3>
                  
                  <FormField
                    control={form.control}
                    name="owner_name"
                    rules={{ required: 'Owner name is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Owner Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="owner_phone"
                    rules={{ required: 'Phone number is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="map_location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Maps Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter location name or coordinates" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Photos *</h3>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length > 0) {
                          handleImageUpload(files);
                        }
                      }}
                      disabled={uploading}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload images (max 10 files, 1MB each)
                        </p>
                      </div>
                    </label>
                  </div>
                  {imageUrls.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="relative h-20 rounded-lg overflow-hidden border border-border">
                          <img src={url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Submit Listing'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
