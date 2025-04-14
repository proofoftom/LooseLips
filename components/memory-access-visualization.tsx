'use client';

import { useEffect, useRef, useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Database, Brain, Sparkles, Lock, Eye } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for the visualizations
const mockAgents = [
  { id: 'agent-001', name: 'Alpha', type: 'ai', color: '#6366f1' },
  { id: 'agent-002', name: 'Beta', type: 'ai', color: '#8b5cf6' },
  { id: 'agent-003', name: 'You', type: 'human', color: '#ec4899' },
  { id: 'agent-004', name: 'Gamma', type: 'ai', color: '#10b981' },
];

const mockMemories = [
  {
    id: 'mem-001',
    title: 'Meeting Notes',
    type: 'Document',
    size: 128,
    access: 'Private',
  },
  {
    id: 'mem-002',
    title: 'Project Moonshot',
    type: 'Conversation',
    size: 256,
    access: 'Shared',
  },
  {
    id: 'mem-003',
    title: 'Research Data',
    type: 'Research',
    size: 512,
    access: 'Shared',
  },
  {
    id: 'mem-004',
    title: 'Personal Journal',
    type: 'Journal',
    size: 64,
    access: 'Private',
  },
  {
    id: 'mem-005',
    title: 'Financial Records',
    type: 'Document',
    size: 320,
    access: 'Private',
  },
  {
    id: 'mem-006',
    title: 'AI Ethics Discussion',
    type: 'Conversation',
    size: 180,
    access: 'Shared',
  },
  {
    id: 'mem-007',
    title: 'Weekly Reflection',
    type: 'Journal',
    size: 90,
    access: 'Private',
  },
  {
    id: 'mem-008',
    title: 'Quantum Computing',
    type: 'Research',
    size: 420,
    access: 'Shared',
  },
];

// Mock access events for the past 30 days
const generateAccessEvents = () => {
  const events = [];
  const now = new Date();

  for (let i = 0; i < 200; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);

    const agentId =
      mockAgents[Math.floor(Math.random() * mockAgents.length)].id;
    const memoryId =
      mockMemories[Math.floor(Math.random() * mockMemories.length)].id;
    const accessType = Math.random() > 0.7 ? 'write' : 'read';
    const storageProvider = ['ipfs', 'recall', 'storacha'][
      Math.floor(Math.random() * 3)
    ];

    events.push({
      id: `event-${i}`,
      date: date,
      agentId,
      memoryId,
      accessType,
      storageProvider,
    });
  }

  return events.sort((a, b) => a.date.getTime() - b.date.getTime());
};

const accessEvents = generateAccessEvents();

export function MemoryAccessVisualization() {
  const [activeView, setActiveView] = useState('network');
  const [timeRange, setTimeRange] = useState('30d');
  const networkCanvasRef = useRef<HTMLCanvasElement>(null);
  const heatmapCanvasRef = useRef<HTMLCanvasElement>(null);
  const storageCanvasRef = useRef<HTMLCanvasElement>(null);

  // Network visualization showing connections between agents and memories
  useEffect(() => {
    if (!networkCanvasRef.current || activeView !== 'network') return;

    const canvas = networkCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw network visualization
    const drawNetwork = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
      ctx.lineWidth = 1;

      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Create nodes for agents and memories
      const nodes: any[] = [];

      // Agent nodes in the left part of the canvas
      mockAgents.forEach((agent, index) => {
        const x = canvas.width * 0.2;
        const y = (index + 1) * (canvas.height / (mockAgents.length + 1));
        nodes.push({
          id: agent.id,
          x,
          y,
          radius: 15,
          color: agent.color,
          type: 'agent',
          name: agent.name,
          agentType: agent.type,
        });
      });

      // Memory nodes in the right part of the canvas
      mockMemories.forEach((memory, index) => {
        const x = canvas.width * 0.8;
        const y = (index + 1) * (canvas.height / (mockMemories.length + 1));
        nodes.push({
          id: memory.id,
          x,
          y,
          radius: 10,
          color: memory.access === 'Private' ? '#ec4899' : '#6366f1',
          type: 'memory',
          name: memory.title,
          memoryType: memory.type,
          access: memory.access,
        });
      });

      // Draw connections based on access events
      const filteredEvents = accessEvents.filter((event) => {
        if (timeRange === '7d') {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          return event.date >= sevenDaysAgo;
        } else if (timeRange === '14d') {
          const fourteenDaysAgo = new Date();
          fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
          return event.date >= fourteenDaysAgo;
        }
        return true; // 30d - show all
      });

      // Count connections for line thickness
      const connections: Record<string, { count: number; accessType: string }> =
        {};

      filteredEvents.forEach((event) => {
        const key = `${event.agentId}-${event.memoryId}`;
        if (!connections[key]) {
          connections[key] = { count: 0, accessType: event.accessType };
        }
        connections[key].count++;
        // If there's any write access, mark the connection as write
        if (event.accessType === 'write') {
          connections[key].accessType = 'write';
        }
      });

      // Draw connections
      Object.entries(connections).forEach(([key, { count, accessType }]) => {
        const [agentId, memoryId] = key.split('-');
        const agentNode = nodes.find((node) => node.id === agentId);
        const memoryNode = nodes.find((node) => node.id === memoryId);

        if (agentNode && memoryNode) {
          // Line thickness based on access count
          const lineWidth = Math.min(Math.max(count / 5, 1), 5);

          // Line color based on access type
          const lineColor =
            accessType === 'write'
              ? 'rgba(236, 72, 153, 0.6)'
              : 'rgba(99, 102, 241, 0.6)';

          ctx.beginPath();
          ctx.moveTo(agentNode.x, agentNode.y);
          ctx.lineTo(memoryNode.x, memoryNode.y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach((node) => {
        // Glow effect
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius * 2
        );
        gradient.addColorStop(0, node.color + '80'); // 50% opacity
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Node
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Node border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Node label
        ctx.fillStyle = 'white';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw label below the node
        if (node.type === 'agent') {
          ctx.fillText(node.name, node.x, node.y + node.radius + 15);
        } else {
          // Truncate memory names if too long
          const displayName =
            node.name.length > 15
              ? node.name.substring(0, 12) + '...'
              : node.name;
          ctx.fillText(displayName, node.x, node.y + node.radius + 15);
        }
      });
    };

    drawNetwork();

    // Handle resize
    const handleResize = () => {
      if (!networkCanvasRef.current) return;
      networkCanvasRef.current.width = networkCanvasRef.current.offsetWidth;
      networkCanvasRef.current.height = networkCanvasRef.current.offsetHeight;
      drawNetwork();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [timeRange, activeView]);

  // Heatmap visualization showing access patterns over time
  useEffect(() => {
    if (!heatmapCanvasRef.current || activeView !== 'heatmap') return;

    const canvas = heatmapCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw heatmap visualization
    const drawHeatmap = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Filter events based on time range
      const filteredEvents = accessEvents.filter((event) => {
        if (timeRange === '7d') {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          return event.date >= sevenDaysAgo;
        } else if (timeRange === '14d') {
          const fourteenDaysAgo = new Date();
          fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
          return event.date >= fourteenDaysAgo;
        }
        return true; // 30d - show all
      });

      // Determine date range
      const days = timeRange === '7d' ? 7 : timeRange === '14d' ? 14 : 30;
      const now = new Date();
      const startDate = new Date(now);
      startDate.setDate(startDate.getDate() - days);

      // Create day buckets
      const dayWidth = canvas.width / days;
      const dayBuckets: Record<string, { reads: number; writes: number }> = {};

      for (let i = 0; i < days; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dateKey = date.toISOString().split('T')[0];
        dayBuckets[dateKey] = { reads: 0, writes: 0 };
      }

      // Count events per day
      filteredEvents.forEach((event) => {
        const dateKey = event.date.toISOString().split('T')[0];
        if (dayBuckets[dateKey]) {
          if (event.accessType === 'read') {
            dayBuckets[dateKey].reads++;
          } else {
            dayBuckets[dateKey].writes++;
          }
        }
      });

      // Find max counts for scaling
      let maxReads = 0;
      let maxWrites = 0;
      Object.values(dayBuckets).forEach(({ reads, writes }) => {
        maxReads = Math.max(maxReads, reads);
        maxWrites = Math.max(maxWrites, writes);
      });

      // Draw day labels and grid lines
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';

      let i = 0;
      Object.keys(dayBuckets).forEach((dateKey) => {
        const x = i * dayWidth + dayWidth / 2;

        // Grid line
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();

        // Date label (show every few days depending on range)
        const skipFactor = days <= 7 ? 1 : days <= 14 ? 2 : 3;
        if (i % skipFactor === 0) {
          const date = new Date(dateKey);
          const label = `${date.getDate()}/${date.getMonth() + 1}`;
          ctx.fillText(label, x, canvas.height - 5);
        }

        i++;
      });

      // Draw horizontal grid lines and labels
      const gridLines = 5;
      ctx.textAlign = 'left';

      for (let i = 0; i <= gridLines; i++) {
        const y = (canvas.height - 20) * (i / gridLines);

        // Grid line
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();

        // Value label
        const value = Math.round((1 - i / gridLines) * maxReads);
        ctx.fillText(value.toString(), 5, y + 10);
      }

      // Draw heatmap bars
      i = 0;
      Object.entries(dayBuckets).forEach(([dateKey, { reads, writes }]) => {
        const x = i * dayWidth;

        // Read bars (blue)
        const readHeight = (reads / maxReads) * (canvas.height - 20);
        const readGradient = ctx.createLinearGradient(
          0,
          canvas.height - readHeight,
          0,
          canvas.height
        );
        readGradient.addColorStop(0, 'rgba(99, 102, 241, 0.8)');
        readGradient.addColorStop(1, 'rgba(99, 102, 241, 0.2)');

        ctx.fillStyle = readGradient;
        ctx.fillRect(
          x + 2,
          canvas.height - readHeight - 20,
          dayWidth - 4,
          readHeight
        );

        // Write bars (pink, overlay on top with transparency)
        if (writes > 0) {
          const writeHeight = (writes / maxWrites) * (canvas.height - 20) * 0.8; // Scale down a bit
          const writeGradient = ctx.createLinearGradient(
            0,
            canvas.height - writeHeight,
            0,
            canvas.height
          );
          writeGradient.addColorStop(0, 'rgba(236, 72, 153, 0.8)');
          writeGradient.addColorStop(1, 'rgba(236, 72, 153, 0.2)');

          ctx.fillStyle = writeGradient;
          ctx.fillRect(
            x + dayWidth / 4 + 2,
            canvas.height - writeHeight - 20,
            dayWidth / 2 - 4,
            writeHeight
          );
        }

        i++;
      });

      // Draw legend
      ctx.fillStyle = 'rgba(99, 102, 241, 0.8)';
      ctx.fillRect(canvas.width - 100, 10, 15, 10);
      ctx.fillStyle = 'rgba(236, 72, 153, 0.8)';
      ctx.fillRect(canvas.width - 100, 30, 15, 10);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.textAlign = 'left';
      ctx.fillText('Read Access', canvas.width - 80, 18);
      ctx.fillText('Write Access', canvas.width - 80, 38);
    };

    drawHeatmap();

    // Handle resize
    const handleResize = () => {
      if (!heatmapCanvasRef.current) return;
      heatmapCanvasRef.current.width = heatmapCanvasRef.current.offsetWidth;
      heatmapCanvasRef.current.height = heatmapCanvasRef.current.offsetHeight;
      drawHeatmap();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [timeRange, activeView]);

  // Storage distribution visualization
  useEffect(() => {
    if (!storageCanvasRef.current || activeView !== 'storage') return;

    const canvas = storageCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw storage visualization
    const drawStorageViz = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Filter events based on time range
      const filteredEvents = accessEvents.filter((event) => {
        if (timeRange === '7d') {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          return event.date >= sevenDaysAgo;
        } else if (timeRange === '14d') {
          const fourteenDaysAgo = new Date();
          fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
          return event.date >= fourteenDaysAgo;
        }
        return true; // 30d - show all
      });

      // Count storage distribution
      const storageCount = {
        ipfs: 0,
        recall: 0,
        storacha: 0,
      };

      filteredEvents.forEach((event) => {
        storageCount[event.storageProvider as keyof typeof storageCount]++;
      });

      const total = Object.values(storageCount).reduce(
        (sum, count) => sum + count,
        0
      );

      // Storage provider colors
      const colors = {
        ipfs: '#3b82f6', // blue
        recall: '#10b981', // green
        storacha: '#8b5cf6', // purple
      };

      // Draw pie chart
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 40;

      let startAngle = 0;

      Object.entries(storageCount).forEach(([provider, count]) => {
        const portion = count / total;
        const endAngle = startAngle + portion * 2 * Math.PI;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();

        ctx.fillStyle = colors[provider as keyof typeof colors];
        ctx.fill();

        // Add stroke
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Calculate position for label
        const midAngle = startAngle + (endAngle - startAngle) / 2;
        const labelRadius = radius * 0.7;
        const labelX = centerX + Math.cos(midAngle) * labelRadius;
        const labelY = centerY + Math.sin(midAngle) * labelRadius;

        // Draw percentage label if segment is large enough
        if (portion > 0.05) {
          ctx.fillStyle = 'white';
          ctx.font = 'bold 14px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(`${Math.round(portion * 100)}%`, labelX, labelY);
        }

        startAngle = endAngle;
      });

      // Draw legend
      const legendItems = [
        { provider: 'ipfs', label: 'IPFS/Filecoin' },
        { provider: 'recall', label: 'Recall Network' },
        { provider: 'storacha', label: 'Storacha AI' },
      ];

      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';

      legendItems.forEach((item, index) => {
        const x = 20;
        const y = 20 + index * 25;

        // Color box
        ctx.fillStyle = colors[item.provider as keyof typeof colors];
        ctx.fillRect(x, y - 8, 16, 16);

        // Stroke
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y - 8, 16, 16);

        // Label
        ctx.fillStyle = 'white';
        ctx.fillText(item.label, x + 25, y);

        // Count and percentage
        const count = storageCount[item.provider as keyof typeof storageCount];
        const percentage = Math.round((count / total) * 100);
        ctx.fillText(`${count} (${percentage}%)`, x + 150, y);
      });
    };

    drawStorageViz();

    // Handle resize
    const handleResize = () => {
      if (!storageCanvasRef.current) return;
      storageCanvasRef.current.width = storageCanvasRef.current.offsetWidth;
      storageCanvasRef.current.height = storageCanvasRef.current.offsetHeight;
      drawStorageViz();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [timeRange, activeView]);

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <Tabs
          value={activeView}
          onValueChange={setActiveView}
          className='w-[400px]'
        >
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='network'>By Category</TabsTrigger>
            <TabsTrigger value='heatmap'>Access Heatmap</TabsTrigger>
            <TabsTrigger value='storage'>Storage</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select time range' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='7d'>Last 7 days</SelectItem>
            <SelectItem value='14d'>Last 14 days</SelectItem>
            <SelectItem value='30d'>Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='relative h-[300px]'>
        {activeView === 'network' && (
          <div className='absolute inset-0'>
            <canvas ref={networkCanvasRef} className='w-full h-full' />
            <div className='absolute top-2 left-2 flex space-x-2'>
              <Badge
                variant='outline'
                className='bg-background/50 backdrop-blur-sm'
              >
                <User className='mr-1 h-3 w-3' />
                Agents
              </Badge>
              <Badge
                variant='outline'
                className='bg-background/50 backdrop-blur-sm'
              >
                <Database className='mr-1 h-3 w-3' />
                Memories
              </Badge>
            </div>
            <div className='absolute top-2 right-2 flex space-x-2'>
              <Badge
                variant='outline'
                className='bg-background/50 backdrop-blur-sm'
              >
                <Eye className='mr-1 h-3 w-3 text-blue-400' />
                Read Access
              </Badge>
              <Badge
                variant='outline'
                className='bg-background/50 backdrop-blur-sm'
              >
                <Lock className='mr-1 h-3 w-3 text-pink-400' />
                Write Access
              </Badge>
            </div>
          </div>
        )}

        {activeView === 'heatmap' && (
          <div className='absolute inset-0'>
            <canvas ref={heatmapCanvasRef} className='w-full h-full' />
          </div>
        )}

        {activeView === 'storage' && (
          <div className='absolute inset-0'>
            <canvas ref={storageCanvasRef} className='w-full h-full' />
          </div>
        )}
      </div>

      <div className='grid grid-cols-3 gap-4'>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center space-x-2'>
              <Database className='h-5 w-5 text-blue-500' />
              <div>
                <div className='text-sm font-medium'>IPFS/Filecoin</div>
                <div className='text-xs text-muted-foreground'>
                  Decentralized storage
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center space-x-2'>
              <Brain className='h-5 w-5 text-green-500' />
              <div>
                <div className='text-sm font-medium'>Recall Network</div>
                <div className='text-xs text-muted-foreground'>
                  Agent knowledge network
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center space-x-2'>
              <Sparkles className='h-5 w-5 text-purple-500' />
              <div>
                <div className='text-sm font-medium'>Storacha AI</div>
                <div className='text-xs text-muted-foreground'>
                  Self-sovereign data
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
