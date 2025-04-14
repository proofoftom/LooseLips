"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Shield, Lock, Key, Database, Cloud, RefreshCw, Eye, Download, Brain, Sparkles } from "lucide-react"

export default function SettingsPage() {
  const [defaultStorage, setDefaultStorage] = useState("ipfs")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="User" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="user@example.com" />
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Enable Notifications</Label>
                  <Switch id="notifications" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about memory access and security events
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="theme">Dark Mode</Label>
                  <Switch id="theme" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Toggle between light and dark theme</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure encryption and access control settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Encryption Algorithm</Label>
                    <p className="text-sm text-muted-foreground">AES-256 encryption for all stored memories</p>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    <Lock className="mr-1 h-3 w-3" />
                    AES-256
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Key Management</Label>
                    <p className="text-sm text-muted-foreground">
                      Lit Protocol manages encryption keys with condition-based access
                    </p>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    <Key className="mr-1 h-3 w-3" />
                    Lit Protocol
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <Switch id="two-factor" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Require additional verification when accessing sensitive memories
                </p>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label htmlFor="recovery-phrase">Recovery Phrase</Label>
                <div className="flex space-x-2">
                  <Input id="recovery-phrase" type="password" value="••••••••••••" readOnly />
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your recovery phrase can be used to restore access to your encrypted memories
                </p>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Shield className="mr-2 h-4 w-4" />
                  Run Security Audit
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Storage Settings</CardTitle>
              <CardDescription>Configure decentralized storage settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Storage Provider</Label>
                <RadioGroup value={defaultStorage} onValueChange={setDefaultStorage} className="space-y-3">
                  <div className="flex items-start space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="ipfs" id="ipfs" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="ipfs" className="flex items-center">
                        <Database className="mr-2 h-4 w-4 text-blue-500" />
                        IPFS/Filecoin
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Decentralized storage on the InterPlanetary File System and Filecoin network
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="outline">Permanent storage</Badge>
                        <Badge variant="outline">Content-addressed</Badge>
                        <Badge variant="outline">Decentralized</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="recall" id="recall" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="recall" className="flex items-center">
                        <Brain className="mr-2 h-4 w-4 text-green-500" />
                        Recall Network
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Unstoppable intelligence network for storing, sharing and trading knowledge on-chain
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="outline">Agent-centric</Badge>
                        <Badge variant="outline">Knowledge trading</Badge>
                        <Badge variant="outline">On-chain storage</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="storacha" id="storacha" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="storacha" className="flex items-center">
                        <Sparkles className="mr-2 h-4 w-4 text-purple-500" />
                        Storacha AI
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Self-sovereign data for multi-agent deployment with enhanced privacy
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="outline">Multi-agent optimized</Badge>
                        <Badge variant="outline">Self-sovereign</Badge>
                        <Badge variant="outline">Privacy-focused</Badge>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-backup">Automatic Backup</Label>
                  <Switch id="auto-backup" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Automatically backup memories to multiple storage providers
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="redundancy">Storage Redundancy</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="redundancy" type="number" defaultValue="3" className="w-16" />
                    <span className="text-sm text-muted-foreground">copies</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Number of redundant copies stored on the network</p>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label className="text-base">Storage Usage</Label>
                <div className="h-4 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-primary" style={{ width: "35%" }}></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>1.4 GB used</span>
                  <span className="text-muted-foreground">4.0 GB total</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Cloud className="mr-2 h-4 w-4" />
                  Manage Storage Providers
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Storage Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <Switch id="debug-mode" />
                </div>
                <p className="text-sm text-muted-foreground">Enable detailed logging for troubleshooting</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="api-access">API Access</Label>
                  <Switch id="api-access" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  Allow external applications to access your memories via API
                </p>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex space-x-2">
                  <Input id="api-key" type="password" value="••••••••••••" readOnly />
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Rotate
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Your API key for programmatic access to your memories</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data-export">Export All Data</Label>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Export Encrypted Data
                </Button>
                <p className="text-sm text-muted-foreground">
                  Download all your encrypted memories and access control settings
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reset">Reset Application</Label>
                <Button variant="destructive" className="w-full">
                  Reset All Settings
                </Button>
                <p className="text-sm text-muted-foreground">Reset all application settings to default values</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Advanced Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
