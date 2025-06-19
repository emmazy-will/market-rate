import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Globe, Lock, User, Settings as SettingsIcon, Moon, Sun } from 'lucide-react';
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
      <div className="max-w-6xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6">
        {/* Mobile-optimized tabs with horizontal scroll */}
        <Tabs defaultValue="account" className="w-full mt-3">
          <div className="relative">
            <div className="overflow-x-auto pb-1 scrollbar-hide h-20">
              <TabsList className="w-max min-w-full grid grid-flow-col auto-cols-max gap-1 px-1 ">
                <TabsTrigger 
                  value="account" 
                  className="flex flex-col items-center justify-center gap-1 p-2 min-w-[5rem] text-xs"
                >
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="flex flex-col items-center justify-center gap-1 p-2 min-w-[5rem] text-xs"
                >
                  <Bell className="h-4 w-4" />
                  <span>Alerts</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="flex flex-col items-center justify-center gap-1 p-2 min-w-[5rem] text-xs"
                >
                  <Lock className="h-4 w-4" />
                  <span>Security</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="regional" 
                  className="flex flex-col items-center justify-center gap-1 p-2 min-w-[5rem] text-xs"
                >
                  <Globe className="h-4 w-4" />
                  <span>Region</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="preferences" 
                  className="flex flex-col items-center justify-center gap-1 p-2 min-w-[5rem] text-xs"
                >
                  <SettingsIcon className="h-4 w-4" />
                  <span>Prefs</span>
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>

          {/* Tab Contents */}
          <div className="mt-3 sm:mt-4 md:mt-6">
            {/* Account Settings */}
            <TabsContent value="account">
              <div className="bg-card rounded-lg p-3 sm:p-4 md:p-6 shadow">
                <h2 className="text-lg font-semibold mb-3 sm:mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-medium mb-2 sm:mb-3">Personal Info</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {[
                        { id: 'firstName', label: 'First Name', defaultValue: 'John' },
                        { id: 'lastName', label: 'Last Name', defaultValue: 'Smith' },
                        { id: 'email', label: 'Email', type: 'email', defaultValue: 'john@example.com' },
                        { id: 'phone', label: 'Phone', defaultValue: '+1 (555) 123-4567' }
                      ].map((field) => (
                        <div key={field.id} className="space-y-1">
                          <Label htmlFor={field.id}>{field.label}</Label>
                          <Input 
                            id={field.id} 
                            type={field.type || 'text'} 
                            defaultValue={field.defaultValue} 
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-3 border-t flex flex-col sm:flex-row gap-2">
                    <Button className="w-full sm:w-auto">Save Changes</Button>
                    <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications">
              <div className="bg-card rounded-lg p-3 sm:p-4 md:p-6 shadow">
                <h2 className="text-lg font-semibold mb-3 sm:mb-4">Notification Settings</h2>
                <div className="space-y-3">
                  {[
                    { key: 'email', label: 'Email Alerts', description: 'Portfolio updates via email' },
                    { key: 'push', label: 'Push Alerts', description: 'Instant device notifications' },
                    { key: 'sms', label: 'SMS Alerts', description: 'Important text messages' }
                  ].map((item) => (
                    <div 
                      key={item.key} 
                      className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex-1">
                        <Label className="text-sm font-medium">{item.label}</Label>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <Switch 
                        checked={notifications[item.key]}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, [item.key]: checked }))
                        }
                      />
                    </div>
                  ))}
                  <div className="pt-3 border-t">
                    <Button className="w-full sm:w-auto">Save Preferences</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <div className="bg-card rounded-lg p-3 sm:p-4 md:p-6 shadow">
                <h2 className="text-lg font-semibold mb-3 sm:mb-4">Security Settings</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-medium mb-2 sm:mb-3">Change Password</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { id: 'currentPassword', label: 'Current Password', type: 'password' },
                        { id: 'newPassword', label: 'New Password', type: 'password' },
                        { id: 'confirmPassword', label: 'Confirm Password', type: 'password' }
                      ].map((field) => (
                        <div key={field.id} className="space-y-1">
                          <Label htmlFor={field.id}>{field.label}</Label>
                          <Input id={field.id} type={field.type} className="w-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <Label className="text-sm font-medium">2FA</Label>
                      <p className="text-xs text-muted-foreground">Extra security layer</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="pt-3 border-t">
                    <Button className="w-full sm:w-auto">Update Security</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Regional Settings */}
            <TabsContent value="regional">
              <div className="bg-card rounded-lg p-3 sm:p-4 md:p-6 shadow">
                <h2 className="text-lg font-semibold mb-3 sm:mb-4">Regional Settings</h2>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'timezone', label: 'Timezone', defaultValue: 'UTC-5 (Eastern Time)' },
                    { id: 'currency', label: 'Default Currency', defaultValue: 'USD' },
                    { id: 'language', label: 'Language', defaultValue: 'English (US)' },
                    { id: 'dateFormat', label: 'Date Format', defaultValue: 'MM/DD/YYYY' }
                  ].map((field) => (
                    <div key={field.id} className="space-y-1">
                      <Label htmlFor={field.id}>{field.label}</Label>
                      <Input 
                        id={field.id} 
                        defaultValue={field.defaultValue} 
                        className="w-full"
                      />
                    </div>
                  ))}
                  <div className="pt-3 border-t">
                    <Button className="w-full sm:w-auto">Save Settings</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Preferences */}
            <TabsContent value="preferences">
              <div className="bg-card rounded-lg p-3 sm:p-4 md:p-6 shadow">
                <h2 className="text-lg font-semibold mb-3 sm:mb-4">Preferences</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/50 border">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {theme === 'dark' ? (
                          <Moon className="h-4 w-4 text-yellow-300" />
                        ) : (
                          <Sun className="h-4 w-4 text-orange-500" />
                        )}
                        <Label className="text-sm font-medium">Dark Mode</Label>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {theme === 'dark' ? 'Dark theme enabled' : 'Light theme enabled'}
                      </p>
                    </div>
                    <Switch 
                      checked={theme === 'dark'}
                      onCheckedChange={toggleTheme}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                  {[
                    { id: 'compact', label: 'Compact View', description: 'Denser content layout' },
                    { id: 'refresh', label: 'Auto-refresh', description: 'Update data automatically' }
                  ].map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex-1">
                        <Label className="text-sm font-medium">{item.label}</Label>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                  <div className="pt-3 border-t">
                    <Button className="w-full sm:w-auto">Save Preferences</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Settings;