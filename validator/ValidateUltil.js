import { BAD_REQUEST } from "../constant/HttpResponeCode.js";

export function dataNull(data, key) {
  if (!data) {
    return {
      statusCode: BAD_REQUEST,
      error: "data invalid",
      description: `${key} invalid`,
    };
  }
  return undefined;
}

export function duplicate(data, key) {
  if (data) {
    return {
      statusCode: BAD_REQUEST,
      error: "duplicate",
      description: `${key} duplicate`,
    };
  }
  return undefined;
}

export function checkToLong(data, key, max, min) {
  if (data > max || data < min) {
    return {
      statusCode: BAD_REQUEST,
      error: "malformed",
      description: `${key} Malformed`,
    };
  }
  return undefined;
}
