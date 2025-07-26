"use client";

import Container from "@/components/ui/container";
import { InputField } from "@/components/ui/input";
import { TypographyHeading, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  useCreateTodo,
  useDeleteTodo,
  useGetTodos,
  useToggleTodo,
} from "./hooks/useTodos";
import { TodoForm, TodoItem } from "./types/todos";
import formSchema from "./schema/todo";
import { Loader2 } from "lucide-react";

export default function TodoScreen() {
  const { data: todos, isLoading } = useGetTodos();
  const createTodo = useCreateTodo();
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: "",
    },
  });

  const onSubmit = (data: TodoForm) => {
    createTodo.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <Container>
      <div className="py-12 flex flex-col items-center justify-center">
        <TypographyHeading>To DO</TypographyHeading>
        <div className="my-10 w-full max-w-2xl bg-white mx-auto p-5">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-3.5">
              <InputField
                id="todos"
                label="Add New Task"
                {...form.register("item")}
                helperText={form.formState.errors.item?.message}
                className="w-full"
              />
              <Button type="submit" disabled={createTodo.isPending}>
                {createTodo.isPending ? "Saving..." : "Submit"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            {isLoading ? (
              <p>Loading todos...</p>
            ) : (
              <ul className="space-y-2">
                {todos?.content.entries.map((todo: TodoItem) => {
                  const isToggling =
                    toggleTodo.variables?.id === todo.id &&
                    toggleTodo.isPending;
                  const isDeleting =
                    deleteTodo.variables === todo.id && deleteTodo.isPending;

                  return (
                    <li
                      key={todo.id}
                      className="flex items-center gap-2 justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={todo.isDone}
                          disabled={isToggling}
                          onCheckedChange={() =>
                            toggleTodo.mutate({
                              id: todo.id,
                              mark: todo.isDone ? "UNDONE" : "DONE",
                            })
                          }
                        />
                        <span
                          className={`text-sm ${
                            todo.isDone ? "line-through text-gray-400" : ""
                          }`}
                        >
                          {todo.item}
                        </span>
                        {isToggling && (
                          <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                        )}
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={isDeleting}
                        onClick={() => deleteTodo.mutate(todo.id)}
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Hapus"
                        )}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
            {!isLoading && todos?.content.entries.length === 0 && (
              <TypographyP className="text-center">Empty Todo</TypographyP>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
