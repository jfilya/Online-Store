module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
  },
};
import type { Config } from "@jest/types";

// Sync object
export const config: Config.InitialOptions = {
  verbose: true,
};

// Or async function
// eslint-disable-next-line @typescript-eslint/require-await
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
  };
};
