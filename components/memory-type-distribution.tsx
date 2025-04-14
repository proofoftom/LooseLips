'use client';

import { useEffect, useRef } from 'react';
import { FileText, MessageSquare, Book, Database } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MemoryTypeDistributionProps {
  timeRange: string;
}

export function MemoryTypeDistribution({
  timeRange,
}: MemoryTypeDistributionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock data for memory types
  const memoryTypes = [
    { type: 'Document', count: 48, color: '#3b82f6', icon: FileText }, // blue
    { type: 'Conversation', count: 36, color: '#8b5cf6', icon: MessageSquare }, // purple
    { type: 'Journal', count: 24, color: '#ec4899', icon: Database }, // pink
    { type: 'Research', count: 20, color: '#10b981', icon: Book }, // green
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw pie chart
    const drawPieChart = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 40;

      const total = memoryTypes.reduce((sum, type) => sum + type.count, 0);

      let startAngle = 0;

      memoryTypes.forEach((memoryType) => {
        const portion = memoryType.count / total;
        const endAngle = startAngle + portion * 2 * Math.PI;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();

        ctx.fillStyle = memoryType.color;
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
      const legendX = 20;
      let legendY = 20;

      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';

      memoryTypes.forEach((memoryType) => {
        // Color box
        ctx.fillStyle = memoryType.color;
        ctx.fillRect(legendX, legendY - 8, 16, 16);

        // Stroke
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(legendX, legendY - 8, 16, 16);

        // Label
        ctx.fillStyle = 'white';
        ctx.fillText(
          `${memoryType.type} (${memoryType.count})`,
          legendX + 25,
          legendY
        );

        legendY += 25;
      });
    };

    drawPieChart();

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = canvasRef.current.offsetWidth;
      canvasRef.current.height = canvasRef.current.offsetHeight;
      drawPieChart();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [timeRange]);

  return (
    <div className='relative h-[300px]'>
      <canvas ref={canvasRef} className='w-full h-full' />
      <div className='absolute top-2 right-2 flex space-x-2'>
        {memoryTypes.map((type) => (
          <Badge
            key={type.type}
            variant='outline'
            className='bg-background/50 backdrop-blur-sm'
          >
            <type.icon className='mr-1 h-3 w-3' style={{ color: type.color }} />
            {type.type}
          </Badge>
        ))}
      </div>
    </div>
  );
}
