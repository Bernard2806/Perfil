import type { APIRoute } from "astro";
import { perfilMarkdown } from "../lib/markdown";

export const GET: APIRoute = () =>
  new Response(perfilMarkdown(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
