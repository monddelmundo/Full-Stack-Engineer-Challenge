create table "Results"(
    "Id" serial primary key,
    "Status" text not null,
    "RepositoryName" text not null,
    "Findings" jsonb,
    "QueuedAt" date,
    "ScanningAt" date,
    "FinishedAt" date,
    "updatedAt" date,
    "createdAt" date
);