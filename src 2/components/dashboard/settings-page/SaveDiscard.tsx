"use client";
import React from "react";
import { Button } from "@/components/Button";

// Add logic to interact with backend.

export default function SaveDiscard() {
    return (
      <div className="mx-auto flex w-full max-w-6xl items-center gap-6 pt-2 pb-12">
        <Button
          href="/"
          bg="olive"
          size="md"
          className="hover:scale-102"
        >
          Save Changes
        </Button>

        <Button
          href="/"
          bg="white"
          size="md"
          className="border-red-400 text-red-600 hover:bg-red-50 hover:shadow-none"
        >
          Discard Changes
        </Button>
      </div>
    );
}