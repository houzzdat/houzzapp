
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit, Trash2, CheckSquare } from "lucide-react";

interface ChecklistItem {
  id: number;
  title: string;
  description: string;
  category: string;
  items: { id: number; text: string; completed: boolean }[];
  status: "active" | "completed" | "pending";
  createdDate: string;
}

export default function QualityChecklists() {
  const [checklists, setChecklists] = useState<ChecklistItem[]>([
    {
      id: 1,
      title: "Foundation Inspection",
      description: "Complete foundation quality checklist",
      category: "Structural",
      items: [
        { id: 1, text: "Check concrete strength", completed: true },
        { id: 2, text: "Verify reinforcement placement", completed: true },
        { id: 3, text: "Inspect formwork alignment", completed: false },
        { id: 4, text: "Check surface finish", completed: false }
      ],
      status: "active",
      createdDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Safety Compliance Check",
      description: "Weekly safety standards verification",
      category: "Safety",
      items: [
        { id: 1, text: "PPE availability check", completed: true },
        { id: 2, text: "Emergency exits clear", completed: true },
        { id: 3, text: "Fire extinguisher inspection", completed: true }
      ],
      status: "completed",
      createdDate: "2024-01-10"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    items: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemsArray = formData.items.split('\n').filter(item => item.trim()).map((item, index) => ({
      id: index + 1,
      text: item.trim(),
      completed: false
    }));

    if (editingId) {
      setChecklists(prev => prev.map(checklist => 
        checklist.id === editingId 
          ? { ...checklist, ...formData, items: itemsArray }
          : checklist
      ));
    } else {
      const newChecklist: ChecklistItem = {
        id: Date.now(),
        ...formData,
        items: itemsArray,
        status: "active",
        createdDate: new Date().toISOString().split('T')[0]
      };
      setChecklists(prev => [...prev, newChecklist]);
    }

    setFormData({ title: "", description: "", category: "", items: "" });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (checklist: ChecklistItem) => {
    setFormData({
      title: checklist.title,
      description: checklist.description,
      category: checklist.category,
      items: checklist.items.map(item => item.text).join('\n')
    });
    setEditingId(checklist.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setChecklists(prev => prev.filter(checklist => checklist.id !== id));
  };

  const toggleItemCompletion = (checklistId: number, itemId: number) => {
    setChecklists(prev => prev.map(checklist => 
      checklist.id === checklistId
        ? {
            ...checklist,
            items: checklist.items.map(item =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            )
          }
        : checklist
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-brand-dark-blue">Quality Checklists</h3>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-brand-orange hover:bg-brand-orange/90"
        >
          <Plus className="mr-2" size={16} />
          New Checklist
        </Button>
      </div>

      {showForm && (
        <Card className="border-2 border-brand-orange/20">
          <CardHeader>
            <CardTitle className="text-brand-dark-blue">
              {editingId ? "Edit Checklist" : "Create New Checklist"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Checklist Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Structural">Structural</SelectItem>
                      <SelectItem value="Safety">Safety</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Plumbing">Plumbing</SelectItem>
                      <SelectItem value="Finishing">Finishing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="items">Checklist Items (one per line)</Label>
                <Textarea
                  id="items"
                  value={formData.items}
                  onChange={(e) => setFormData(prev => ({ ...prev, items: e.target.value }))}
                  placeholder="Enter checklist items, one per line"
                  rows={5}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-brand-orange hover:bg-brand-orange/90">
                  {editingId ? "Update" : "Create"} Checklist
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ title: "", description: "", category: "", items: "" });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {checklists.map(checklist => (
          <Card key={checklist.id} className="border-2 border-brand-orange/20">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-brand-dark-blue flex items-center gap-2">
                    <CheckSquare className="text-brand-orange" size={20} />
                    {checklist.title}
                  </CardTitle>
                  <p className="text-brand-gray text-sm mt-1">{checklist.description}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="text-brand-medium-blue">Category: {checklist.category}</span>
                    <span className="text-brand-medium-blue">Created: {checklist.createdDate}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      checklist.status === 'completed' ? 'bg-green-100 text-green-800' :
                      checklist.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {checklist.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEdit(checklist)}
                  >
                    <Edit size={14} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDelete(checklist.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {checklist.items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-2 rounded bg-gray-50">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleItemCompletion(checklist.id, item.id)}
                    />
                    <span className={item.completed ? 'text-gray-500 line-through' : 'text-brand-dark-blue'}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-brand-medium-blue">
                Progress: {checklist.items.filter(item => item.completed).length}/{checklist.items.length} completed
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
