import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MemoryStats } from '@/components/memory-stats';
import { MemoryAccessVisualization } from '@/components/memory-access-visualization';
import { SecurityStatus } from '@/components/security-status';
import { RecentMemories } from '@/components/recent-memories';
import AnalyticsPage from '@/app/analytics/page';

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
            <Card className='col-span-4'>
              <CardHeader>
                <CardTitle>Memory Access Visualization</CardTitle>
                <CardDescription>
                  Interactive visualization of memory access patterns
                </CardDescription>
              </CardHeader>
              <CardContent className='pl-2'>
                <MemoryAccessVisualization />
              </CardContent>
            </Card>

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
          </div>
        </TabsContent>

        <TabsContent value='analytics' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
            <div className='col-span-7'>
              <AnalyticsPage />
            </div>
          </div>
        </TabsContent>

        <TabsContent value='security' className='space-y-4'>
          <SecurityStatus />
        </TabsContent>
      </Tabs>
    </div>
  );
}
