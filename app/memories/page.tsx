import { MemoriesTable } from "@/components/memories-table"
import { Button } from "@/components/ui/button"
import { Plus, Filter, Download } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MemoriesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Memory Management</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Memory
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Memories</TabsTrigger>
          <TabsTrigger value="private">Private</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Memory Storage</CardTitle>
              <CardDescription>Manage your encrypted memories and their access controls</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <MemoriesTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="private" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Private Memories</CardTitle>
              <CardDescription>Memories only accessible by you</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <MemoriesTable filterType="private" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shared" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Shared Memories</CardTitle>
              <CardDescription>Memories shared with authorized agents</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <MemoriesTable filterType="shared" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Archived Memories</CardTitle>
              <CardDescription>Memories that have been archived</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <MemoriesTable filterType="archived" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
