import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Search, FileSpreadsheet, Plus, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type Notebook } from "@shared/schema";
import NotebookForm from "@/components/notebook-form";
import DeleteConfirmation from "@/components/delete-confirmation";
import { exportToExcel } from "@/lib/excel-export";

export default function NotebookManagement() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNotebook, setEditingNotebook] = useState<Notebook | null>(null);
  const [deletingNotebook, setDeletingNotebook] = useState<Notebook | null>(null);

  // Fetch notebooks
  const { data: notebooks = [], isLoading } = useQuery<Notebook[]>({
    queryKey: ["/api/notebooks"],
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/notebooks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notebooks"] });
      toast({ title: "Success", description: "Notebook deleted successfully" });
      setDeletingNotebook(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete notebook", variant: "destructive" });
    },
  });

  // Filter and sort notebooks
  const filteredAndSortedNotebooks = useMemo(() => {
    let filtered = notebooks;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = notebooks.filter(notebook => 
        Object.values(notebook).some(value => 
          value?.toString().toLowerCase().includes(query)
        )
      );
    }

    // Apply sorting
    if (sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortColumn as keyof Notebook]?.toString() || "";
        const bValue = b[sortColumn as keyof Notebook]?.toString() || "";
        
        if (sortDirection === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }

    return filtered;
  }, [notebooks, searchQuery, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedNotebooks.length / rowsPerPage);
  const paginatedNotebooks = filteredAndSortedNotebooks.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Summary calculations
  const summary = useMemo(() => {
    const total = notebooks.length;
    const active = notebooks.filter(n => n.status === "active").length;
    const inactive = notebooks.filter(n => n.status === "inactive").length;
    const damaged = notebooks.filter(n => n.status === "damaged").length;
    return { total, active, inactive, damaged };
  }, [notebooks]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">🟢 Active</Badge>;
      case "inactive":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">🔴 Inactive</Badge>;
      case "damaged":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">🟡 Damaged</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRowClassName = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 hover:bg-green-100";
      case "inactive":
        return "bg-red-50 hover:bg-red-100";
      case "damaged":
        return "bg-yellow-50 hover:bg-yellow-100";
      default:
        return "hover:bg-gray-50";
    }
  };

  const handleExport = () => {
    exportToExcel(notebooks, "notebook-inventory.xlsx");
    toast({ title: "Success", description: "Excel file exported successfully" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading notebooks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Notebook Data Management System</h1>
        <p className="text-gray-600">Manage and track your notebook inventory with comprehensive status monitoring</p>
      </div>

      {/* Top Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Devices</p>
                <p className="text-3xl font-bold text-gray-900">{summary.total}</p>
              </div>
              <Laptop className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-3xl font-bold text-green-600">{summary.active}</p>
              </div>
              <div className="text-green-500 text-3xl">🟢</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Inactive/Returned</p>
                <p className="text-3xl font-bold text-red-600">{summary.inactive}</p>
              </div>
              <div className="text-red-500 text-3xl">🔴</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Damaged</p>
                <p className="text-3xl font-bold text-yellow-600">{summary.damaged}</p>
              </div>
              <div className="text-yellow-500 text-3xl">🟡</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search notebooks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Show:</label>
                <Select value={rowsPerPage.toString()} onValueChange={(value) => {
                  setRowsPerPage(parseInt(value));
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-gray-600">entries</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleExport}>
                <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                Export to Excel
              </Button>
              <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="mb-6">
        <div className="overflow-x-auto min-w-full">
          <Table className="min-w-max">
            <TableHeader>
              <TableRow className="bg-sky-100 hover:bg-sky-100">
                {[
                  { key: "index", label: "No." },
                  { key: "assetCode", label: "Asset Code" },
                  { key: "model", label: "Model" },
                  { key: "serialNumber", label: "Serial Number" },
                  { key: "location", label: "Location" },
                  { key: "userName", label: "User Name" },
                  { key: "department", label: "Department" },
                  { key: "status", label: "Status" },
                  { key: "deviceNumber", label: "Device Number" },
                  { key: "purchasedUnder", label: "Purchased Under" },
                  { key: "dueDate", label: "5-Year Due Date" },
                  { key: "remark", label: "Remark" },
                ].map((column) => (
                  <TableHead
                    key={column.key}
                    className={`text-sky-800 font-semibold cursor-pointer hover:bg-sky-200 transition-colors ${
                      column.key === 'remark' ? 'w-324' : 'whitespace-nowrap'
                    }`}
                    onClick={() => handleSort(column.key)}
                  >
                    <div className="flex items-center justify-between">
                      {column.label}
                      <span className="text-sky-600">
                        {sortColumn === column.key ? (sortDirection === "asc" ? "↑" : "↓") : "↕"}
                      </span>
                    </div>
                  </TableHead>
                ))}
                <TableHead className="text-sky-800 font-semibold whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedNotebooks.map((notebook, index) => (
                <TableRow key={notebook.id} className={getRowClassName(notebook.status)}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {(currentPage - 1) * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{notebook.assetCode}</TableCell>
                  <TableCell className="whitespace-nowrap">{notebook.model}</TableCell>
                  <TableCell className="whitespace-nowrap">{notebook.serialNumber}</TableCell>
                  <TableCell className="whitespace-nowrap">{notebook.location}</TableCell>
                  <TableCell className="whitespace-nowrap">{notebook.userName || "-"}</TableCell>
                  <TableCell className="whitespace-nowrap">{notebook.department}</TableCell>
                  <TableCell className="whitespace-nowrap">{getStatusBadge(notebook.status)}</TableCell>
                  <TableCell className="whitespace-nowrap">{notebook.deviceNumber || "-"}</TableCell>
                  <TableCell className="whitespace-nowrap">{notebook.purchasedUnder || "-"}</TableCell>
                  <TableCell className="whitespace-nowrap">{notebook.dueDate || "-"}</TableCell>
                  <TableCell className="w-324 break-words whitespace-normal max-w-xs" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                    <div className="max-w-full" style={{ maxWidth: '50ch' }}>
                      {notebook.remark || "-"}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingNotebook(notebook);
                          setIsFormOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeletingNotebook(notebook)}
                        className="text-red-600 hover:text-red-900 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to{" "}
          <span className="font-medium">
            {Math.min(currentPage * rowsPerPage, filteredAndSortedNotebooks.length)}
          </span>{" "}
          of <span className="font-medium">{filteredAndSortedNotebooks.length}</span> entries
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg">🟢</span>
            <span className="text-sm text-gray-700">Active: <span className="font-medium">{summary.active}</span> devices</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🔴</span>
            <span className="text-sm text-gray-700">Inactive: <span className="font-medium">{summary.inactive}</span> devices</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🟡</span>
            <span className="text-sm text-gray-700">Damaged: <span className="font-medium">{summary.damaged}</span> devices</span>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              );
            })}
            {totalPages > 5 && (
              <>
                <span className="text-sm text-gray-700">...</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </Button>
              </>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <NotebookForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingNotebook(null);
        }}
        notebook={editingNotebook}
      />

      <DeleteConfirmation
        isOpen={!!deletingNotebook}
        notebook={deletingNotebook}
        onConfirm={() => {
          if (deletingNotebook) {
            deleteMutation.mutate(deletingNotebook.id);
          }
        }}
        onCancel={() => setDeletingNotebook(null)}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
