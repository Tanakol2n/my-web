import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertNotebookSchema, type InsertNotebook, type Notebook } from "@shared/schema";
import { X } from "lucide-react";

interface NotebookFormProps {
  isOpen: boolean;
  onClose: () => void;
  notebook?: Notebook | null;
}

export default function NotebookForm({ isOpen, onClose, notebook }: NotebookFormProps) {
  const { toast } = useToast();
  const isEditing = !!notebook;

  const form = useForm<InsertNotebook>({
    resolver: zodResolver(insertNotebookSchema),
    defaultValues: {
      assetCode: "",
      model: "",
      serialNumber: "",
      location: "",
      userName: "",
      department: "",
      status: "",
      deviceNumber: "",
      purchasedUnder: "",
      dueDate: "",
      remark: "",
    },
  });

  // Reset form when notebook changes
  useEffect(() => {
    if (notebook) {
      form.reset({
        assetCode: notebook.assetCode,
        model: notebook.model,
        serialNumber: notebook.serialNumber,
        location: notebook.location,
        userName: notebook.userName || "",
        department: notebook.department,
        status: notebook.status,
        deviceNumber: notebook.deviceNumber || "",
        purchasedUnder: notebook.purchasedUnder || "",
        dueDate: notebook.dueDate || "",
        remark: notebook.remark || "",
      });
    } else {
      form.reset({
        assetCode: "",
        model: "",
        serialNumber: "",
        location: "",
        userName: "",
        department: "",
        status: "",
        deviceNumber: "",
        purchasedUnder: "",
        dueDate: "",
        remark: "",
      });
    }
  }, [notebook, form]);

  const mutation = useMutation({
    mutationFn: async (data: InsertNotebook) => {
      if (isEditing && notebook) {
        return await apiRequest("PUT", `/api/notebooks/${notebook.id}`, data);
      } else {
        return await apiRequest("POST", "/api/notebooks", data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notebooks"] });
      toast({
        title: "Success",
        description: `Notebook ${isEditing ? "updated" : "created"} successfully`,
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} notebook`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertNotebook) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {isEditing ? "Edit Notebook" : "Add New Notebook"}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="assetCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Code *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., NB-2024-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Dell Latitude 5520" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., DL5520240101" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., IT Department - Floor 3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Smith" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Information Technology" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="damaged">Damaged</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deviceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Device Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., DEV-001" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purchasedUnder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchased Under</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., IT Budget 2024" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>5-Year Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="remark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remark</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional notes or comments about this device..."
                      rows={3}
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : isEditing ? "Update Notebook" : "Save Notebook"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
