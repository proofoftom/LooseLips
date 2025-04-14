import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MemoryStats } from '@/components/memory-stats';
import { AccessPatterns } from '@/components/access-patterns';
import { SecurityStatus } from '@/components/security-status';
import { RecentMemories } from '@/components/recent-memories';
import { AgentsTable } from '@/components/agents-table';

const agents = [
  {
    id: 'agent-001',
    name: 'Alpha',
    type: 'ai',
    model: 'deepseek-r1',
    address: '0x1a2b3c4d5e6f7g8h9i0j',
    accessLevel: 'limited',
    status: 'Active',
    lastAccess: '2023-04-12',
    memoryCount: 42,
    storageProvider: 'ipfs',
    description: 'General purpose assistant for memory management',
  },
  {
    id: 'agent-002',
    name: 'Beta',
    type: 'ai',
    model: 'llama-3.3',
    address: '0x9i8h7g6f5e4d3c2b1a0',
    accessLevel: 'readonly',
    status: 'Active',
    lastAccess: '2023-04-10',
    memoryCount: 28,
    storageProvider: 'recall',
    description: 'Research assistant with read-only access',
  },
  {
    id: 'agent-003',
    name: 'You',
    type: 'human',
    address: '0x1a2...3b4c',
    accessLevel: 'full',
    status: 'Active',
    lastAccess: '2023-04-13',
    memoryCount: 128,
    storageProvider: 'storacha',
    description: 'Human user with full access',
  },
];

export default function Dashboard() {
  return (
    <div className='flex-1 space-y-4 p-4 md:p-8 pt-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
        <div className='flex items-center space-x-2'>
          <span className='text-sm text-muted-foreground'>
            Last encrypted: 2 minutes ago
          </span>
        </div>
      </div>

      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          <TabsTrigger value='security'>Security</TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <MemoryStats />
          </div>

          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
            <Card className='col-span-3'>
              <CardHeader>
                <CardTitle>Recent Memories</CardTitle>
                <CardDescription>
                  Your most recently stored memories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentMemories />
              </CardContent>
            </Card>
            <Card className='col-span-4'>
              <CardHeader>
                <CardTitle>AI Agents</CardTitle>
                <CardDescription>
                  Your AI agents for managing memories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AgentsTable agents={agents} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='analytics' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
            <Card className='col-span-7'>
              <CardHeader>
                <CardTitle>Access Patterns</CardTitle>
                <CardDescription>
                  Visualization of memory access over time
                </CardDescription>
              </CardHeader>
              <CardContent className='pl-2'>
                <AccessPatterns />
              </CardContent>
            </Card>
            <Card className='col-span-7'>
              <CardHeader>
                <CardTitle>Memory Usage</CardTitle>
                <CardDescription>
                  Detailed analysis of your memory storage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='h-[400px] flex items-center justify-center border rounded-md'>
                  <p className='text-muted-foreground'>
                    Detailed analytics visualization would appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='security' className='space-y-4'>
          <SecurityStatus />
        </TabsContent>
      </Tabs>
    </div>
  );
}
