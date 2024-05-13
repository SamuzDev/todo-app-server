import express from "express";
import Task from "./schema/index.js";

const router = express.Router();

/**
 * Método GET para obtener todas las tareas.
 * Devuelve todas las tareas almacenadas en la base de datos.
 */
router.get("/", async (_, res) => {
    try {
        const tasks = await Task.find({});
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Tasks not found" });
    }
});

/**
 * Método GET para obtener una tarea específica por ID.
 * Devuelve la tarea con el ID especificado.
 */
router.get("/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Task not found" });
    }
});

/**
 * Método POST para crear una nueva tarea.
 * Crea una nueva tarea con los datos proporcionados en el cuerpo de la solicitud.
 */
router.post("/", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Task not created" });
    }
});

/**
 * Método PUT para actualizar una tarea existente por ID.
 * Actualiza la tarea con el ID especificado con los nuevos datos proporcionados.
 */
router.put("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Task not updated" });
    }
});

/**
 * Método DELETE para eliminar una tarea existente por ID.
 * Elimina la tarea con el ID especificado.
 */
router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
});

export default router;
