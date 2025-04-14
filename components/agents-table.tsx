'use client';

import type React from 'react';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Bot,
  User,
  MoreHorizontal,
  Shield,
  Calendar,
  Key,
  Database,
  Brain,
  Sparkles,
} from 'lucide-react';
import { AgentDetailsDialog } from '@/components/agent-details-dialog';

interface AgentsTableProps {
  agents: any[];
  setAgents: React.Dispatch<React.SetStateAction<any[]>>;
}

export function AgentsTable({ agents, setAgents }: AgentsTableProps) {
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const toggleAgentStatus = (id: string) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id
          ? {
              ...agent,
              status: agent.status === 'Active' ? 'Inactive' : 'Active',
            }
          : agent
      )
    );
  };

  const handleViewDetails = (agent: any) => {
    setSelectedAgent(agent);
    setDetailsOpen(true);
  };

  const getStorageIcon = (provider: string) => {
    switch (provider) {
      case 'ipfs':
        return <Database className='h-4 w-4' />;
      case 'recall':
        return <Brain className='h-4 w-4' />;
      case 'storacha':
        return <Sparkles className='h-4 w-4' />;
      default:
        return <Database className='h-4 w-4' />;
    }
  };

  const getStorageName = (provider: string) => {
    switch (provider) {
      case 'ipfs':
        return 'IPFS/Filecoin';
      case 'recall':
        return 'Recall Network';
      case 'storacha':
        return 'Storacha AI';
      default:
        return 'Unknown';
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Contract Address</TableHead>
            <TableHead>Access Level</TableHead>
            <TableHead>Storage</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Access</TableHead>
            <TableHead>Memory Count</TableHead>
            <TableHead className='w-[80px]'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents.map((agent) => (
            <TableRow key={agent.id} className='group'>
              <TableCell className='font-medium'>{agent.name}</TableCell>
              <TableCell>
                <div className='flex items-center'>
                  {agent.type === 'ai' ? (
                    <Bot className='mr-2 h-4 w-4' />
                  ) : (
                    <User className='mr-2 h-4 w-4' />
                  )}
                  {agent.type === 'ai' ? 'AI' : 'Human'}
                  {agent.type === 'ai' && agent.model && (
                    <Badge variant='outline' className='ml-2'>
                      {agent.model}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className='font-mono text-xs'>
                {agent.address}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    agent.accessLevel === 'full'
                      ? 'default'
                      : agent.accessLevel === 'limited'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  <Shield className='mr-1 h-3 w-3' />
                  {agent.accessLevel === 'full'
                    ? 'Full'
                    : agent.accessLevel === 'limited'
                    ? 'Limited'
                    : 'Read-Only'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className='flex items-center'>
                  {getStorageIcon(agent.storageProvider)}
                  <span className='ml-2'>
                    {getStorageName(agent.storageProvider)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Switch
                  checked={agent.status === 'Active'}
                  onCheckedChange={() => toggleAgentStatus(agent.id)}
                  disabled={agent.type === 'human' && agent.name === 'You'}
                />
              </TableCell>
              <TableCell>
                <div className='flex items-center text-muted-foreground'>
                  <Calendar className='mr-1 h-3 w-3' />
                  {agent.lastAccess}
                </div>
              </TableCell>
              <TableCell>{agent.memoryCount}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='opacity-0 group-hover:opacity-100'
                    >
                      <MoreHorizontal className='h-4 w-4' />
                      <span className='sr-only'>Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleViewDetails(agent)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Key className='mr-2 h-4 w-4' />
                      Edit Access Keys
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Shield className='mr-2 h-4 w-4' />
                      Change Access Level
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='text-destructive'>
                      Delete Agent
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {agents.length === 0 && (
        <div className='flex h-[200px] w-full items-center justify-center'>
          <p className='text-muted-foreground'>No agents found</p>
        </div>
      )}

      {selectedAgent && (
        <AgentDetailsDialog
          agent={selectedAgent}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
        />
      )}
    </div>
  );
}
