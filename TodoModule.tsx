import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { getTodos, saveTodos, TodoItem, generateId } from "@/lib/storage";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function TodoModule({ onBack }: { onBack: () => void }) {
  const [todos, setTodos] = useState<TodoItem[]>(getTodos());
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => { saveTodos(todos); }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: generateId(), text: newTodo.trim(), done: false, category: "allgemein" }]);
    setNewTodo("");
    toast.success("Aufgabe hinzugefügt");
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title="To-do Liste" subtitle="Deine Aufgaben im Blick" />
      <div className="px-5 pb-28">
        <div className="mb-4 flex gap-2">
          <Input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Neue Aufgabe..." className="h-11 text-base" onKeyDown={(e) => e.key === "Enter" && addTodo()} />
          <Button size="icon" className="h-11 w-11 shrink-0" onClick={addTodo}><Plus className="h-5 w-5" /></Button>
        </div>
        {todos.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Noch keine Aufgaben. Leg los!</p>
        ) : (
          <div className="space-y-2">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center gap-3 rounded-xl bg-card p-3.5 card-shadow">
                <Checkbox checked={todo.done} onCheckedChange={() => setTodos(todos.map(t => t.id === todo.id ? { ...t, done: !t.done } : t))} />
                <span className={`flex-1 text-sm ${todo.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{todo.text}</span>
                <button onClick={() => setTodos(todos.filter(t => t.id !== todo.id))} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        <Button variant="outline" className="mt-6 w-full" onClick={onBack}>Zurück</Button>
      </div>
    </div>
  );
}
