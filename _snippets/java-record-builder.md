---
title: Immutable DTOs with Records
file: Developer.java
lang_label: Java 21
badges: [Java, Records]
category: java
date: 2026-06-20
description: Compact constructor validation + a "wither" for immutable updates. No Lombok required.
tags: [java, spring]
---
```java
public record Developer(String name, String status, int coffeeLevel) {
    public Developer {
        if (name == null || name.isBlank()) throw new IllegalArgumentException("name");
        if (coffeeLevel < 0 || coffeeLevel > 100) throw new IllegalArgumentException("coffeeLevel");
    }

    public Developer withStatus(String newStatus) {
        return new Developer(name, newStatus, coffeeLevel);
    }
}
```
