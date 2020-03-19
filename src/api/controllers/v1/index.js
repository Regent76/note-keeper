import { Router } from "express";
import { getSwaggerFile } from "./systemController";
import { health } from "./healthCheckController";
import { registerUser, authUser } from "./authController";
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote
} from "./notesController";
import { cors } from "../../../services/middleware";

const { check } = require("express-validator");
const router = new Router();

router.options("/swagger", cors({ methods: ["GET"] }));
router.get("/swagger", cors(), getSwaggerFile);

router.options("/ping/health", cors({ methods: ["GET"] }));
router.get("/ping/health", cors(), health);

// auth
router.options("/auth/register", cors({ methods: ["POST"] }));
router.post(
  "/auth/register",
  [
    check("email", "Email is not correct.")
      .normalizeEmail()
      .isEmail(),
    check("password", "Password must be more than 8 chars length.").isLength({
      min: 8
    })
  ],
  cors(),
  registerUser
);
router.options("/auth/login", cors({ methods: ["POST"] }));
router.post(
  "/auth/login",
  [
    check("email")
      .normalizeEmail()
      .isEmail(),
    check("password").exists()
  ],
  cors(),
  authUser
);

// notes
router.options("/notes", cors({ methods: ["GET", "POST"] }));
router.get("/notes", cors(), getNotes);
router.post(
  "/notes",
  [check("message").isLength({ max: 256000 })],
  cors(),
  createNote
);

router.options("/notes/:note_id", cors({ methods: ["PUT", "DELETE"] }));
router.get("/notes/:note_id", cors(), getNote);
router.put(
  "/notes/:note_id",
  [check("message").isLength({ max: 256000 })],
  cors(),
  updateNote
);
router.delete("/notes/:note_id", cors(), deleteNote);

export default router;
