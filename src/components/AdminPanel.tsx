
import React, { useState } from 'react';
import { useProfiles } from '@/context/ProfileContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Profile } from '@/types';
import { PlusCircle, Edit, Trash2, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminPanel: React.FC = () => {
  const { profiles, addProfile, updateProfile, deleteProfile } = useProfiles();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Profile>>({
    name: '',
    imageUrl: '',
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      coordinates: {
        lat: 0,
        lng: 0
      }
    },
    contactInfo: {
      email: '',
      phone: '',
      website: ''
    },
    tags: []
  });
  const { toast } = useToast();

  const handleOpenAddDialog = () => {
    setFormData({
      name: '',
      imageUrl: '',
      description: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        coordinates: {
          lat: 0,
          lng: 0
        }
      },
      contactInfo: {
        email: '',
        phone: '',
        website: ''
      },
      tags: []
    });
    setIsAddDialogOpen(true);
  };

  const handleOpenEditDialog = (profileId: string) => {
    const profileToEdit = profiles.find(p => p.id === profileId);
    if (profileToEdit) {
      setFormData(profileToEdit);
      setSelectedProfileId(profileId);
      setIsEditDialogOpen(true);
    }
  };

  const handleOpenDeleteDialog = (profileId: string) => {
    setSelectedProfileId(profileId);
    setIsDeleteDialogOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof Profile] as Record<string, unknown>),
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCoordinateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const coordinate = name.split('.')[2]; // coordinates.lat or coordinates.lng
    
    setFormData({
      ...formData,
      address: {
        ...formData.address!,
        coordinates: {
          ...formData.address!.coordinates,
          [coordinate]: parseFloat(value) || 0
        }
      }
    });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagString = e.target.value;
    const tagArray = tagString.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData({
      ...formData,
      tags: tagArray
    });
  };

  const handleAddProfile = () => {
    // Validate required fields
    if (!formData.name || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Name and description are required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create new profile
    const newProfile: Profile = {
      id: Date.now().toString(),
      name: formData.name!,
      imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
      description: formData.description!,
      address: formData.address!,
      contactInfo: formData.contactInfo,
      tags: formData.tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      interests: []
    };

    addProfile(newProfile);
    setIsAddDialogOpen(false);
    toast({
      title: "Success",
      description: "Profile added successfully!",
    });
  };

  const handleUpdateProfile = () => {
    if (!selectedProfileId) return;
    
    // Validate required fields
    if (!formData.name || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Name and description are required fields.",
        variant: "destructive"
      });
      return;
    }

    updateProfile(selectedProfileId, formData);
    setIsEditDialogOpen(false);
    toast({
      title: "Success",
      description: "Profile updated successfully!",
    });
  };

  const handleDeleteProfile = () => {
    if (!selectedProfileId) return;
    
    deleteProfile(selectedProfileId);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Success",
      description: "Profile deleted successfully!",
    });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
        <Button onClick={handleOpenAddDialog} className="bg-geo-blue hover:bg-geo-darkBlue">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Profile
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Profiles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="py-3 px-4 text-left font-medium text-sm">Name</th>
                  <th className="py-3 px-4 text-left font-medium text-sm">Location</th>
                  <th className="py-3 px-4 text-left font-medium text-sm">Tags</th>
                  <th className="py-3 px-4 text-left font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile) => (
                  <tr key={profile.id} className="border-b border-gray-200 hover:bg-muted/30">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={profile.imageUrl}
                          alt={profile.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="font-medium">{profile.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {profile.address.city}, {profile.address.state}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {profile.tags?.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="bg-geo-lightBlue text-geo-darkBlue">
                            {tag}
                          </Badge>
                        ))}
                        {profile.tags && profile.tags.length > 3 && (
                          <Badge variant="secondary" className="bg-muted text-muted-foreground">
                            +{profile.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEditDialog(profile.id)}
                          className="text-geo-blue hover:text-geo-darkBlue hover:bg-geo-lightBlue"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDeleteDialog(profile.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Profile Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Add New Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                placeholder="Brief description of the person"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address.street">Street</Label>
                <Input
                  id="address.street"
                  name="address.street"
                  value={formData.address?.street || ''}
                  onChange={handleChange}
                  placeholder="123 Main St"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.city">City</Label>
                <Input
                  id="address.city"
                  name="address.city"
                  value={formData.address?.city || ''}
                  onChange={handleChange}
                  placeholder="New York"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address.state">State</Label>
                <Input
                  id="address.state"
                  name="address.state"
                  value={formData.address?.state || ''}
                  onChange={handleChange}
                  placeholder="NY"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.zip">ZIP Code</Label>
                <Input
                  id="address.zip"
                  name="address.zip"
                  value={formData.address?.zip || ''}
                  onChange={handleChange}
                  placeholder="10001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.country">Country</Label>
                <Input
                  id="address.country"
                  name="address.country"
                  value={formData.address?.country || ''}
                  onChange={handleChange}
                  placeholder="USA"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address.coordinates.lat">Latitude</Label>
                <Input
                  id="address.coordinates.lat"
                  name="address.coordinates.lat"
                  type="number"
                  step="0.000001"
                  value={formData.address?.coordinates?.lat || 0}
                  onChange={handleCoordinateChange}
                  placeholder="40.7128"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address.coordinates.lng">Longitude</Label>
                <Input
                  id="address.coordinates.lng"
                  name="address.coordinates.lng"
                  type="number"
                  step="0.000001"
                  value={formData.address?.coordinates?.lng || 0}
                  onChange={handleCoordinateChange}
                  placeholder="-74.0060"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactInfo.email">Email</Label>
                <Input
                  id="contactInfo.email"
                  name="contactInfo.email"
                  value={formData.contactInfo?.email || ''}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactInfo.phone">Phone</Label>
                <Input
                  id="contactInfo.phone"
                  name="contactInfo.phone"
                  value={formData.contactInfo?.phone || ''}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactInfo.website">Website</Label>
                <Input
                  id="contactInfo.website"
                  name="contactInfo.website"
                  value={formData.contactInfo?.website || ''}
                  onChange={handleChange}
                  placeholder="example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags?.join(', ') || ''}
                onChange={handleTagsChange}
                placeholder="Design, Research, Marketing"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProfile} className="bg-geo-blue hover:bg-geo-darkBlue">
              Add Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name *</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-imageUrl">Image URL</Label>
                <Input
                  id="edit-imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                placeholder="Brief description of the person"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-address.street">Street</Label>
                <Input
                  id="edit-address.street"
                  name="address.street"
                  value={formData.address?.street || ''}
                  onChange={handleChange}
                  placeholder="123 Main St"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-address.city">City</Label>
                <Input
                  id="edit-address.city"
                  name="address.city"
                  value={formData.address?.city || ''}
                  onChange={handleChange}
                  placeholder="New York"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-address.state">State</Label>
                <Input
                  id="edit-address.state"
                  name="address.state"
                  value={formData.address?.state || ''}
                  onChange={handleChange}
                  placeholder="NY"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-address.zip">ZIP Code</Label>
                <Input
                  id="edit-address.zip"
                  name="address.zip"
                  value={formData.address?.zip || ''}
                  onChange={handleChange}
                  placeholder="10001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-address.country">Country</Label>
                <Input
                  id="edit-address.country"
                  name="address.country"
                  value={formData.address?.country || ''}
                  onChange={handleChange}
                  placeholder="USA"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-address.coordinates.lat">Latitude</Label>
                <Input
                  id="edit-address.coordinates.lat"
                  name="address.coordinates.lat"
                  type="number"
                  step="0.000001"
                  value={formData.address?.coordinates?.lat || 0}
                  onChange={handleCoordinateChange}
                  placeholder="40.7128"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-address.coordinates.lng">Longitude</Label>
                <Input
                  id="edit-address.coordinates.lng"
                  name="address.coordinates.lng"
                  type="number"
                  step="0.000001"
                  value={formData.address?.coordinates?.lng || 0}
                  onChange={handleCoordinateChange}
                  placeholder="-74.0060"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-contactInfo.email">Email</Label>
                <Input
                  id="edit-contactInfo.email"
                  name="contactInfo.email"
                  value={formData.contactInfo?.email || ''}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-contactInfo.phone">Phone</Label>
                <Input
                  id="edit-contactInfo.phone"
                  name="contactInfo.phone"
                  value={formData.contactInfo?.phone || ''}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-contactInfo.website">Website</Label>
                <Input
                  id="edit-contactInfo.website"
                  name="contactInfo.website"
                  value={formData.contactInfo?.website || ''}
                  onChange={handleChange}
                  placeholder="example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-tags">Tags (comma separated)</Label>
              <Input
                id="edit-tags"
                name="tags"
                value={formData.tags?.join(', ') || ''}
                onChange={handleTagsChange}
                placeholder="Design, Research, Marketing"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProfile} className="bg-geo-blue hover:bg-geo-darkBlue">
              Update Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Profile Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              Are you sure you want to delete this profile? This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProfile}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
