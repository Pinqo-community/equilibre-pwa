import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import usePouchDb from "../../src/hooks/usePouchDb";

type TestDocument = {
  _id: string;
  _rev?: string;
  name: string;
};

describe("usePouchDb", () => {
  it("should initialize loading state to false", () => {
    const { result } = renderHook(() => usePouchDb<TestDocument>());
    expect(result.current.loading).toBe(false);
  });
});
