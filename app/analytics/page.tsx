'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Download,
  Filter,
  Bot,
  Database,
  Brain,
  Sparkles,
  FileText,
  MessageSquare,
  Book,
  Lock,
  Eye,
} from 'lucide-react';
import { MemoryTypeDistribution } from '@/components/memory-type-distribution';
import { AgentActivityChart } from '@/components/agent-activity-chart';
import { StorageDistributionChart } from '@/components/storage-distribution-chart';
import { EncryptionStatusChart } from '@/components/encryption-status-chart';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className='flex-1 space-y-4'>
      <div className='flex items-center justify-between'>
        {/* <h2 className="text-3xl font-bold tracking-tight">Analytics</h2> */}
        <div className='flex items-center space-x-2'>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select time range' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='7d'>Last 7 days</SelectItem>
              <SelectItem value='14d'>Last 14 days</SelectItem>
              <SelectItem value='30d'>Last 30 days</SelectItem>
              <SelectItem value='90d'>Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant='outline' size='sm'>
            <Filter className='mr-2 h-4 w-4' />
            Filter
          </Button>
          <Button variant='outline' size='sm'>
            <Download className='mr-2 h-4 w-4' />
            Export Data
          </Button>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Memories
            </CardTitle>
            <Database className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>128</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-green-500'>+12</span> in the last{' '}
              {timeRange === '7d'
                ? 'week'
                : timeRange === '14d'
                ? '2 weeks'
                : timeRange === '30d'
                ? 'month'
                : '3 months'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Agents</CardTitle>
            <Bot className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>4</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-green-500'>+1</span> in the last{' '}
              {timeRange === '7d'
                ? 'week'
                : timeRange === '14d'
                ? '2 weeks'
                : timeRange === '30d'
                ? 'month'
                : '3 months'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Memory Access</CardTitle>
            <Eye className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>342</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-green-500'>+86</span> in the last{' '}
              {timeRange === '7d'
                ? 'week'
                : timeRange === '14d'
                ? '2 weeks'
                : timeRange === '30d'
                ? 'month'
                : '3 months'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Storage Used</CardTitle>
            <Database className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>1.4 GB</div>
            <p className='text-xs text-muted-foreground'>
              <span className='text-green-500'>+0.3 GB</span> in the last{' '}
              {timeRange === '7d'
                ? 'week'
                : timeRange === '14d'
                ? '2 weeks'
                : timeRange === '30d'
                ? 'month'
                : '3 months'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='agents'>Agent Activity</TabsTrigger>
          <TabsTrigger value='storage'>Storage Analysis</TabsTrigger>
          <TabsTrigger value='security'>Security Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
            <Card className='col-span-4'>
              <CardHeader>
                <CardTitle>Memory Type Distribution</CardTitle>
                <CardDescription>
                  Breakdown of memory types stored in your system
                </CardDescription>
              </CardHeader>
              <CardContent className='pl-2'>
                <MemoryTypeDistribution timeRange={timeRange} />
              </CardContent>
            </Card>

            <Card className='col-span-3'>
              <CardHeader>
                <CardTitle>Storage Distribution</CardTitle>
                <CardDescription>
                  How your data is distributed across storage providers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StorageDistributionChart timeRange={timeRange} />
              </CardContent>
            </Card>
          </div>

          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
            <Card className='col-span-3'>
              <CardHeader>
                <CardTitle>Encryption Status</CardTitle>
                <CardDescription>
                  Security status of your stored memories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EncryptionStatusChart />
              </CardContent>
            </Card>

            <Card className='col-span-4'>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest memory access and modifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className='flex items-center justify-between border-b pb-2'
                    >
                      <div className='flex items-center space-x-3'>
                        <div className='h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center'>
                          {i % 3 === 0 ? (
                            <Bot className='h-4 w-4 text-primary' />
                          ) : i % 3 === 1 ? (
                            <Database className='h-4 w-4 text-primary' />
                          ) : (
                            <Lock className='h-4 w-4 text-primary' />
                          )}
                        </div>
                        <div>
                          <div className='text-sm font-medium'>
                            {i % 3 === 0
                              ? 'Agent Alpha accessed memory'
                              : i % 3 === 1
                              ? 'New memory created'
                              : 'Encryption key rotated'}
                          </div>
                          <div className='flex items-center text-xs text-muted-foreground'>
                            <Calendar className='mr-1 h-3 w-3' />
                            {i} {i === 1 ? 'hour' : 'hours'} ago
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          i % 3 === 0
                            ? 'outline'
                            : i % 3 === 1
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {i % 3 === 0
                          ? 'Read'
                          : i % 3 === 1
                          ? 'Create'
                          : 'Security'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='agents' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Agent Activity</CardTitle>
              <CardDescription>
                Memory access patterns by agent over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-[400px]'>
                <AgentActivityChart timeRange={timeRange} />
              </div>
            </CardContent>
          </Card>

          <div className='grid gap-4 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Agent Access Distribution</CardTitle>
                <CardDescription>
                  Percentage of memory access by agent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {[
                    { name: 'Alpha', percentage: 42, count: 144, type: 'ai' },
                    { name: 'Beta', percentage: 28, count: 96, type: 'ai' },
                    { name: 'You', percentage: 22, count: 75, type: 'human' },
                    { name: 'Gamma', percentage: 8, count: 27, type: 'ai' },
                  ].map((agent) => (
                    <div key={agent.name} className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                          {agent.type === 'ai' ? (
                            <Bot className='mr-2 h-4 w-4 text-primary' />
                          ) : (
                            <Eye className='mr-2 h-4 w-4 text-primary' />
                          )}
                          <span className='text-sm font-medium'>
                            {agent.name}
                          </span>
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          {agent.count} accesses
                        </div>
                      </div>
                      <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                        <div
                          className='h-full bg-primary'
                          style={{ width: `${agent.percentage}%` }}
                        ></div>
                      </div>
                      <div className='text-xs text-muted-foreground text-right'>
                        {agent.percentage}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Access Type by Agent</CardTitle>
                <CardDescription>
                  Read vs. write operations by agent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {[
                    { name: 'Alpha', read: 120, write: 24, type: 'ai' },
                    { name: 'Beta', read: 96, write: 0, type: 'ai' },
                    { name: 'You', read: 45, write: 30, type: 'human' },
                    { name: 'Gamma', read: 20, write: 7, type: 'ai' },
                  ].map((agent) => (
                    <div key={agent.name} className='space-y-2'>
                      <div className='flex items-center'>
                        {agent.type === 'ai' ? (
                          <Bot className='mr-2 h-4 w-4 text-primary' />
                        ) : (
                          <Eye className='mr-2 h-4 w-4 text-primary' />
                        )}
                        <span className='text-sm font-medium'>
                          {agent.name}
                        </span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <div className='flex-1 space-y-1'>
                          <div className='flex items-center justify-between text-xs'>
                            <span>Read</span>
                            <span>{agent.read}</span>
                          </div>
                          <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                            <div
                              className='h-full bg-blue-500'
                              style={{
                                width: `${
                                  (agent.read / (agent.read + agent.write)) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className='flex-1 space-y-1'>
                          <div className='flex items-center justify-between text-xs'>
                            <span>Write</span>
                            <span>{agent.write}</span>
                          </div>
                          <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                            <div
                              className='h-full bg-pink-500'
                              style={{
                                width: `${
                                  (agent.write / (agent.read + agent.write)) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='storage' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-3'>
            <Card>
              <CardHeader>
                <CardTitle>IPFS/Filecoin</CardTitle>
                <CardDescription>Decentralized storage metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm'>Storage Used</span>
                      <span className='text-sm font-medium'>0.8 GB</span>
                    </div>
                    <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                      <div
                        className='h-full bg-blue-500'
                        style={{ width: '57%' }}
                      ></div>
                    </div>
                    <div className='text-xs text-muted-foreground text-right'>
                      57% of total storage
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm'>Memory Count</span>
                      <span className='text-sm font-medium'>73 memories</span>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm'>Average Size</span>
                      <span className='text-sm font-medium'>11.2 KB</span>
                    </div>
                  </div>

                  <div className='pt-2'>
                    <Badge
                      variant='outline'
                      className='flex items-center w-full justify-center'
                    >
                      <Database className='mr-2 h-3 w-3' />
                      Content-addressed Storage
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recall Network</CardTitle>
                <CardDescription>
                  Agent knowledge network metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm'>Storage Used</span>
                      <span className='text-sm font-medium'>0.4 GB</span>
                    </div>
                    <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                      <div
                        className='h-full bg-green-500'
                        style={{ width: '29%' }}
                      ></div>
                    </div>
                    <div className='text-xs text-muted-foreground text-right'>
                      29% of total storage
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm'>Memory Count</span>
                      <span className='text-sm font-medium'>37 memories</span>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm'>Average Size</span>
                      <span className='text-sm font-medium'>11.0 KB</span>
                    </div>
                  </div>

                  <div className='pt-2'>
                    <Badge
                      variant='outline'
                      className='flex items-center w-full justify-center'
                    >
                      <Brain className='mr-2 h-3 w-3' />
                      Agent-centric Storage
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storacha AI</CardTitle>
                <CardDescription>Self-sovereign data metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm'>Storage Used</span>
                      <span className='text-sm font-medium'>0.2 GB</span>
                    </div>
                    <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                      <div
                        className='h-full bg-purple-500'
                        style={{ width: '14%' }}
                      ></div>
                    </div>
                    <div className='text-xs text-muted-foreground text-right'>
                      14% of total storage
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm'>Memory Count</span>
                      <span className='text-sm font-medium'>18 memories</span>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm'>Average Size</span>
                      <span className='text-sm font-medium'>11.4 KB</span>
                    </div>
                  </div>

                  <div className='pt-2'>
                    <Badge
                      variant='outline'
                      className='flex items-center w-full justify-center'
                    >
                      <Sparkles className='mr-2 h-3 w-3' />
                      Privacy-focused Storage
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Memory Type by Storage Provider</CardTitle>
              <CardDescription>
                Distribution of memory types across storage providers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-8'>
                <div className='space-y-2'>
                  <div className='flex items-center'>
                    <FileText className='mr-2 h-4 w-4 text-primary' />
                    <span className='text-sm font-medium'>Documents</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center justify-between text-xs'>
                        <span>IPFS/Filecoin</span>
                        <span>65%</span>
                      </div>
                      <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                        <div
                          className='h-full bg-blue-500'
                          style={{ width: '65%' }}
                        ></div>
                      </div>
                    </div>
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center justify-between text-xs'>
                        <span>Recall Network</span>
                        <span>20%</span>
                      </div>
                      <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                        <div
                          className='h-full bg-green-500'
                          style={{ width: '20%' }}
                        ></div>
                      </div>
                    </div>
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center justify-between text-xs'>
                        <span>Storacha AI</span>
                        <span>15%</span>
                      </div>
                      <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                        <div
                          className='h-full bg-purple-500'
                          style={{ width: '15%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center'>
                    <MessageSquare className='mr-2 h-4 w-4 text-primary' />
                    <span className='text-sm font-medium'>Conversations</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center justify-between text-xs'>
                        <span>IPFS/Filecoin</span>
                        <span>30%</span>
                      </div>
                      <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                        <div
                          className='h-full bg-blue-500'
                          style={{ width: '30%' }}
                        ></div>
                      </div>
                    </div>
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center justify-between text-xs'>
                        <span>Recall Network</span>
                        <span>55%</span>
                      </div>
                      <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                        <div
                          className='h-full bg-green-500'
                          style={{ width: '55%' }}
                        ></div>
                      </div>
                    </div>
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center justify-between text-xs'>
                        <span>Storacha AI</span>
                        <span>15%</span>
                      </div>
                      <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                        <div
                          className='h-full bg-purple-500'
                          style={{ width: '15%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center'>
                    <Book className='mr-2 h-4 w-4 text-primary' />
                    <span className='text-sm font-medium'>
                      Research & Journals
                    </span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center justify-between text-xs'>
                        <span>IPFS/Filecoin</span>
                        <span>45%</span>
                      </div>
                      <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                        <div
                          className='h-full bg-blue-500'
                          style={{ width: '45%' }}
                        ></div>
                      </div>
                    </div>
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center justify-between text-xs'>
                        <span>Recall Network</span>
                        <span>25%</span>
                      </div>
                      <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                        <div
                          className='h-full bg-green-500'
                          style={{ width: '25%' }}
                        ></div>
                      </div>
                    </div>
                    <div className='flex-1 space-y-1'>
                      <div className='flex items-center justify-between text-xs'>
                        <span>Storacha AI</span>
                        <span>30%</span>
                      </div>
                      <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                        <div
                          className='h-full bg-purple-500'
                          style={{ width: '30%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='security' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Encryption Status</CardTitle>
              <CardDescription>
                Security metrics for your stored memories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-[300px]'>
                <EncryptionStatusChart />
              </div>
            </CardContent>
          </Card>

          <div className='grid gap-4 md:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Access Control Metrics</CardTitle>
                <CardDescription>
                  Analysis of memory access permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm'>Private Memories</span>
                      <span className='text-sm font-medium'>72 (56%)</span>
                    </div>
                    <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                      <div
                        className='h-full bg-pink-500'
                        style={{ width: '56%' }}
                      ></div>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm'>Shared Memories</span>
                      <span className='text-sm font-medium'>56 (44%)</span>
                    </div>
                    <div className='h-2 w-full overflow-hidden rounded-full bg-secondary'>
                      <div
                        className='h-full bg-blue-500'
                        style={{ width: '44%' }}
                      ></div>
                    </div>
                  </div>

                  <div className='pt-4 space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm'>Full Access Agents</span>
                      <span className='text-sm font-medium'>1</span>
                    </div>

                    <div className='flex items-center justify-between'>
                      <span className='text-sm'>Limited Access Agents</span>
                      <span className='text-sm font-medium'>2</span>
                    </div>

                    <div className='flex items-center justify-between'>
                      <span className='text-sm'>Read-Only Agents</span>
                      <span className='text-sm font-medium'>1</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Events</CardTitle>
                <CardDescription>
                  Recent security-related activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {[
                    {
                      event: 'Key rotation completed',
                      time: '2 days ago',
                      type: 'success',
                    },
                    {
                      event: 'Security audit completed',
                      time: '1 week ago',
                      type: 'success',
                    },
                    {
                      event: 'New agent access granted',
                      time: '2 weeks ago',
                      type: 'info',
                    },
                    {
                      event: 'Unauthorized access attempt',
                      time: '3 weeks ago',
                      type: 'warning',
                    },
                    {
                      event: 'Encryption algorithm updated',
                      time: '1 month ago',
                      type: 'info',
                    },
                  ].map((event, i) => (
                    <div
                      key={i}
                      className='flex items-center justify-between border-b pb-2'
                    >
                      <div className='flex items-center space-x-3'>
                        <div className='h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center'>
                          <Lock
                            className={`h-4 w-4 ${
                              event.type === 'success'
                                ? 'text-green-500'
                                : event.type === 'warning'
                                ? 'text-yellow-500'
                                : 'text-blue-500'
                            }`}
                          />
                        </div>
                        <div>
                          <div className='text-sm font-medium'>
                            {event.event}
                          </div>
                          <div className='flex items-center text-xs text-muted-foreground'>
                            <Calendar className='mr-1 h-3 w-3' />
                            {event.time}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          event.type === 'success'
                            ? 'default'
                            : event.type === 'warning'
                            ? 'destructive'
                            : 'outline'
                        }
                      >
                        {event.type === 'success'
                          ? 'Success'
                          : event.type === 'warning'
                          ? 'Warning'
                          : 'Info'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
