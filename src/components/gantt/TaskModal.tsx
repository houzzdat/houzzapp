
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TASK_ICONS } from "./TaskIcon";

const todayStr = () => new Date().toISOString().slice(0, 10);

const people = ["Vikram", "Ayesha", "Raju", "Aman", "Priya"];
const categories = Object.keys(TASK_ICONS);

type Task = {
  id: string;
  title: string;
  start: string;
  end: string;
  assignedTo: string;
  progress: number;
  dependencies: string[];
  category?: string;
};

const TaskModal = ({
  open,
  setOpen,
  addTask,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  addTask: (t: Task) => void;
}) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(todayStr());
  const [end, setEnd] = useState(todayStr());
  const [assignedTo, setAssignedTo] = useState(people[0]);
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState(categories[0]);

  const handleSave = () => {
    if (!title) return;
    addTask({
      id: Math.random().toString(36).slice(2),
      title,
      start,
      end,
      assignedTo,
      progress,
      dependencies: [],
      category,
    });
    setTitle("");
    setProgress(0);
    setStart(todayStr());
    setEnd(todayStr());
    setAssignedTo(people[0]);
    setCategory(categories[0]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-xl">
        <DialogTitle className="text-brand-dark-blue">Add New Task</DialogTitle>
        <div className="flex flex-col gap-4">
          <div>
            <Label className="text-sm font-medium text-brand-dark-blue">Task Title</Label>
            <Input
              autoFocus
              placeholder="Enter task name"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-brand-dark-blue">Start Date</Label>
              <Input
                type="date"
                value={start}
                onChange={e => setStart(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-brand-dark-blue">End Date</Label>
              <Input
                type="date"
                value={end}
                onChange={e => setEnd(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-brand-dark-blue">Category</Label>
            <select
              className="w-full mt-1 border border-input rounded-md px-3 py-2 text-sm bg-background"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-sm font-medium text-brand-dark-blue">Assigned To</Label>
            <select
              className="w-full mt-1 border border-input rounded-md px-3 py-2 text-sm bg-background"
              value={assignedTo}
              onChange={e => setAssignedTo(e.target.value)}
            >
              {people.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <Label className="text-sm font-medium text-brand-dark-blue">Progress (%)</Label>
            <Input
              type="number"
              min={0}
              max={100}
              value={progress}
              onChange={e => setProgress(Number(e.target.value))}
              className="mt-1"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              disabled={!title} 
              onClick={handleSave}
              className="flex-1 bg-brand-orange text-white hover:bg-brand-orange/90"
            >
              Save Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
