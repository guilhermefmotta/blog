---
title: Calling Tauri from React
file: useBranches.ts
lang_label: TypeScript
badges: [React, Tauri 2]
category: typescript
date: 2026-05-20
description: The frontend half of the command above — typed invoke wrapped in a tiny hook.
tags: [react, hooks]
---
```ts
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

type BranchInfo = { name: string; is_head: boolean };

export function useBranches(repoPath: string) {
  const [branches, setBranches] = useState<BranchInfo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    invoke<BranchInfo[]>("list_branches", { path: repoPath })
      .then(setBranches)
      .catch((e) => setError(String(e)));
  }, [repoPath]);

  return { branches, error };
}
```
