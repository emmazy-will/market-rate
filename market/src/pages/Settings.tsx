
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Globe, Lock, User, Settings as SettingsIcon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });

  return (
    <PageLayout title="Settings">
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="regional" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Regional
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-6">
            <div className="bg-card rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Smith" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.smith@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button>Save Changes</Button>
                  <Button variant="outline" className="ml-2">Cancel</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <div className="bg-card rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email updates about your portfolio</p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get instant alerts on your device</p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive text messages for important updates</p>
                  </div>
                  <Switch 
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
                  />
                </div>

                <div className="pt-4 border-t">
                  <Button>Save Preferences</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <div className="bg-card rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>

                <div className="pt-4 border-t">
                  <Button>Update Security Settings</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="regional" className="mt-6">
            <div className="bg-card rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold mb-6">Regional Settings</h2>
              
              <div className="space-y-6 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Input id="currency" defaultValue="USD" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input id="language" defaultValue="English (US)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Input id="dateFormat" defaultValue="MM/DD/YYYY" />
                </div>

                <div className="pt-4 border-t">
                  <Button>Save Regional Settings</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <div className="bg-card rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold mb-6">Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                  </div>
                  <Switch 
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Compact View</Label>
                    <p className="text-sm text-muted-foreground">Show more data with less spacing</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Auto-refresh Data</Label>
                    <p className="text-sm text-muted-foreground">Automatically update market data</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="pt-4 border-t">
                  <Button>Save Preferences</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Settings;
