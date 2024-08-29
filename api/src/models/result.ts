import * as Sequelize from "sequelize";
import { sequelize } from "../instances/sequelize";

export interface Result {
  Id: number;
  Status: Status;
  RepositoryName: string;
  Findings: {
    type: string;
    ruleId: string;
    location: {
      path: string;
      positions: {
        begin: {
          line: number;
        };
      };
    };
    metadata: {
      description: string;
      severity: string;
    };
  };
  QueuedAt: string;
  ScanningAt: string;
  FinishedAt: string;
}

export interface ResultAddModel {
  Id: number;
  Status: Status;
  RepositoryName: string;
  Findings: {
    type: string;
    ruleId: string;
    location: {
      path: string;
      positions: {
        begin: {
          line: number;
        };
      };
    };
    metadata: {
      description: string;
      severity: string;
    };
  };
  QueuedAt: string;
  ScanningAt: string;
  FinishedAt: string;
}

export interface ResultModel
  extends Sequelize.Model<ResultModel, ResultAddModel> {
    Id: number;
    Status: Status;
    RepositoryName: string;
    Findings: {
      type: string;
      ruleId: string;
      location: {
        path: string;
        positions: {
          begin: {
            line: number;
          };
        };
      };
      metadata: {
        description: string;
        severity: string;
      };
    };
    QueuedAt: string;
    ScanningAt: string;
    FinishedAt: string;
}

export interface ResultViewModel {
  Id: number;
  Status: Status;
  RepositoryName: string;
  Findings: {
    type: string;
    ruleId: string;
    location: {
      path: string;
      positions: {
        begin: {
          line: number;
        };
      };
    };
    metadata: {
      description: string;
      severity: string;
    };
  };
  QueuedAt: string;
  ScanningAt: string;
  FinishedAt: string;
}

export const Result = sequelize.define<ResultModel, ResultAddModel>("Result", {
  Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Status: Sequelize.STRING,
  RepositoryName: Sequelize.STRING,
  Findings: Sequelize.JSONB,
  QueuedAt: Sequelize.DATE,
  ScanningAt: Sequelize.DATE,
  FinishedAt: Sequelize.DATE
});

export enum Status {
  QUEUED = "Queued",
  INPROGRESS = "In Progress",
  SUCCESS = "Success",
  FAILURE = "Failure",
}
