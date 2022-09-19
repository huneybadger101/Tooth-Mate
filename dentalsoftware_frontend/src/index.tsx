import { Renderer } from "@nodegui/react-nodegui";
import React from "react";
import App from "./app";

process.title = "Toothmate Dental Software";
Renderer.render(<App />);
